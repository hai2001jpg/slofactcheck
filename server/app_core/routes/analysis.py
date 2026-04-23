from time import perf_counter
from flask import Blueprint, current_app, jsonify, request

from app_core.clients import get_gradio_client
from app_core.observability import elapsed_ms
from app_core.services.analysis_service import (
    build_analysis_document,
    fetch_user_analyses,
    predict_analysis,
    save_analysis,
)
from app_core.services.factcheck_service import find_fact_checks
from app_core.services.rate_limit_service import (
    DailyLimitExceeded,
    get_daily_usage_status,
    release_daily_analysis_slot,
    reserve_daily_analysis_slot,
)
from app_core.services.topic_service import classify_topic

analysis_bp = Blueprint("analysis", __name__)

@analysis_bp.route("/analysis", methods=["POST"])
def analysis_route():
    route_started = perf_counter()
    data = request.get_json(silent=True) or {}
    settings = current_app.config["SETTINGS"]
    openai_client = current_app.extensions.get("openai_client")
    db = current_app.extensions.get("db")

    user_id = data.get("userId")
    input_text = data.get("input")
    model_name = data.get("model", "mbert")

    current_app.logger.info(
        "analysis started model=%s input_chars=%d user_id_present=%s",
        model_name,
        len(str(input_text or "")),
        bool(user_id),
    )

    if not user_id or not str(user_id).strip():
        return jsonify({"success": False, "error": "User ID is required."}), 400
    if not input_text or not str(input_text).strip():
        return jsonify({"success": False, "error": "Input text is required."}), 400
    if model_name not in settings.allowed_models:
        return jsonify({"success": False, "error": f"Unsupported model: {model_name}"}), 400
    if db is None:
        return jsonify({"success": False, "error": "Firebase not initialized"}), 500

    rate_limit_started = perf_counter()
    usage_status = None
    try:
        usage_status = reserve_daily_analysis_slot(
            db,
            user_id=str(user_id),
            daily_limit=settings.daily_analysis_limit,
            timezone_name=settings.app_timezone,
            collection_name=settings.analysis_rate_limit_collection,
        )
    except DailyLimitExceeded as exc:
        current_app.logger.info(
            "analysis denied user_id=%s reason=daily_limit limit=%d day=%s",
            user_id,
            exc.limit,
            exc.day_key,
        )
        return jsonify(
            {
                "success": False,
                "error": f"Daily analysis limit reached ({exc.limit} per day).",
                "limit": exc.limit,
                "remaining": exc.remaining,
                "dayKey": exc.day_key,
            }
        ), 429
    except Exception as exc:
        current_app.logger.exception("Failed to reserve daily analysis slot")
        return jsonify({"success": False, "error": f"Firebase error: {exc}"}), 500
    current_app.logger.info(
        "analysis rate_limit duration_ms=%.1f user_id=%s count=%d remaining=%d day=%s",
        elapsed_ms(rate_limit_started),
        user_id,
        usage_status.count,
        usage_status.remaining,
        usage_status.day_key,
    )

    topic = "others"
    topic_started = perf_counter()
    try:
        topic = classify_topic(str(input_text), openai_client, settings)
    except Exception:
        current_app.logger.exception("Topic classification failed in /analysis")
    current_app.logger.info(
        "analysis topic_classification duration_ms=%.1f topic=%s",
        elapsed_ms(topic_started),
        topic,
    )

    prediction_started = perf_counter()
    try:
        gradio_client = get_gradio_client(settings.gradio_api_url)
        result, confidence = predict_analysis(gradio_client, model_name, input_text)
    except Exception as exc:
        current_app.logger.exception("Prediction failed for model '%s'", model_name)
        if usage_status is not None:
            try:
                release_daily_analysis_slot(
                    db,
                    user_id=str(user_id),
                    daily_limit=settings.daily_analysis_limit,
                    timezone_name=settings.app_timezone,
                    collection_name=settings.analysis_rate_limit_collection,
                )
            except Exception:
                current_app.logger.exception(
                    "Failed to release daily analysis slot after prediction error.")
        return jsonify({"success": False, "error": f"Gradio API error: {exc}"}), 500
    current_app.logger.info(
        "analysis prediction duration_ms=%.1f model=%s result=%s confidence=%s",
        elapsed_ms(prediction_started),
        model_name,
        result,
        confidence,
    )

    fact_check_results = []
    fact_check_error = ""
    fact_check_started = perf_counter()
    try:
        factcheck_data = find_fact_checks(str(input_text), openai_client, settings)
        fact_check_results = factcheck_data["results"]
        current_app.logger.info(
            "analysis factcheck_lookup duration_ms=%.1f results=%d source=%s",
            elapsed_ms(fact_check_started),
            len(fact_check_results),
            factcheck_data["source"],
        )
    except Exception as exc:
        fact_check_error = str(exc)
        current_app.logger.exception("Fact-check lookup failed during analysis save")

    firestore_started = perf_counter()
    try:
        document = build_analysis_document(
            user_id,
            input_text,
            model_name,
            result,
            confidence,
            topic,
            fact_check_results=fact_check_results,
            fact_check_error=fact_check_error,
        )
        save_analysis(db, document)
    except Exception as exc:
        current_app.logger.exception("Firebase save failed for model '%s'", model_name)
        if usage_status is not None:
            try:
                release_daily_analysis_slot(
                    db,
                    user_id=str(user_id),
                    daily_limit=settings.daily_analysis_limit,
                    timezone_name=settings.app_timezone,
                    collection_name=settings.analysis_rate_limit_collection,
                )
            except Exception:
                current_app.logger.exception(
                    "Failed to release daily analysis slot after save error")
        return jsonify({"success": False, "error": f"Firebase error: {exc}"}), 500
    current_app.logger.info(
        "analysis firestore_save duration_ms=%.1f",
        elapsed_ms(firestore_started),
    )
    current_app.logger.info("analysis completed duration_ms=%.1f", elapsed_ms(route_started))

    return jsonify(
        {
            "success": True,
            "result": result,
            "confidence": confidence,
            "topic": topic,
            "factCheckResults": fact_check_results,
            "factCheckError": fact_check_error,
            "remainingAnalysesToday": usage_status.remaining,
            "dailyLimit": usage_status.limit,
            "dayKey": usage_status.day_key,
        }
    )

@analysis_bp.route("/analysis", methods=["GET"])
def get_user_analysis():
    route_started = perf_counter()
    settings = current_app.config["SETTINGS"]
    db = current_app.extensions.get("db")
    user_id = request.args.get("userId")

    if not user_id:
        return jsonify({"error": "Missing userId"}), 400
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500

    try:
        results = fetch_user_analyses(db, user_id)
        usage_status = get_daily_usage_status(
            db,
            user_id=str(user_id),
            daily_limit=settings.daily_analysis_limit,
            timezone_name=settings.app_timezone,
            collection_name=settings.analysis_rate_limit_collection,
        )
        current_app.logger.info(
            "analysis_history loaded user_id=%s documents=%d remaining=%d duration_ms=%.1f",
            user_id,
            len(results),
            usage_status.remaining,
            elapsed_ms(route_started),
        )
        return jsonify(
            {
                "analyses": results,
                "remainingAnalysesToday": usage_status.remaining,
                "dailyLimit": usage_status.limit,
                "dayKey": usage_status.day_key,
            }
        )
    except Exception as exc:
        return jsonify({"error": f"Firebase error: {exc}"}), 500
