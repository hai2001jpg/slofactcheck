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

    if not input_text or not str(input_text).strip():
        return jsonify({"success": False, "error": "Input text is required."}), 400
    if model_name not in settings.allowed_models:
        return jsonify({"success": False, "error": f"Unsupported model: {model_name}"}), 400

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
        return jsonify({"success": False, "error": f"Gradio API error: {exc}"}), 500
    current_app.logger.info(
        "analysis prediction duration_ms=%.1f model=%s result=%s confidence=%s",
        elapsed_ms(prediction_started),
        model_name,
        result,
        confidence,
    )

    if db is None:
        return jsonify({"success": False, "error": "Firebase not initialized"}), 500

    firestore_started = perf_counter()
    try:
        document = build_analysis_document(user_id, input_text, model_name, result, confidence, topic)
        save_analysis(db, document)
    except Exception as exc:
        current_app.logger.exception("Firebase save failed for model '%s'", model_name)
        return jsonify({"success": False, "error": f"Firebase error: {exc}"}), 500
    current_app.logger.info(
        "analysis firestore_save duration_ms=%.1f",
        elapsed_ms(firestore_started),
    )
    current_app.logger.info("analysis completed duration_ms=%.1f", elapsed_ms(route_started))

    return jsonify({"success": True, "result": result, "confidence": confidence, "topic": topic})


@analysis_bp.route("/analysis", methods=["GET"])
def get_user_analysis():
    route_started = perf_counter()
    db = current_app.extensions.get("db")
    user_id = request.args.get("userId")

    if not user_id:
        return jsonify({"error": "Missing userId"}), 400
    if db is None:
        return jsonify({"error": "Firebase not initialized"}), 500

    try:
        results = fetch_user_analyses(db, user_id)
        current_app.logger.info(
            "analysis_history loaded user_id=%s documents=%d duration_ms=%.1f",
            user_id,
            len(results),
            elapsed_ms(route_started),
        )
        return jsonify({"analyses": results})
    except Exception as exc:
        return jsonify({"error": f"Firebase error: {exc}"}), 500
