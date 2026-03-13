from time import perf_counter

from flask import Blueprint, current_app, jsonify, request

from app_core.observability import elapsed_ms
from app_core.services.factcheck_service import google_claim_search, openai_claim_search


factcheck_bp = Blueprint("factcheck", __name__)


@factcheck_bp.route("/factcheck", methods=["GET"])
def factcheck():
    route_started = perf_counter()
    query = request.args.get("query", "").strip()
    settings = current_app.config["SETTINGS"]
    openai_client = current_app.extensions.get("openai_client")

    if not query:
        return jsonify({"error": "Missing query"}), 400

    try:
        google_started = perf_counter()
        google_results = google_claim_search(query, settings)
        current_app.logger.info(
            "factcheck google_lookup results=%d query_chars=%d duration_ms=%.1f",
            len(google_results),
            len(query),
            elapsed_ms(google_started),
        )
        if google_results:
            current_app.logger.info(
                "factcheck completed source=google duration_ms=%.1f",
                elapsed_ms(route_started),
            )
            return jsonify({"results": google_results, "source": "google_fact_check_tools"})

        openai_started = perf_counter()
        openai_results = openai_claim_search(query, openai_client, settings)
        current_app.logger.info(
            "factcheck openai_lookup results=%d query_chars=%d duration_ms=%.1f",
            len(openai_results),
            len(query),
            elapsed_ms(openai_started),
        )
        current_app.logger.info(
            "factcheck completed source=openai duration_ms=%.1f",
            elapsed_ms(route_started),
        )
        return jsonify({"results": openai_results, "source": "openai_web_search"})
    except Exception as exc:
        current_app.logger.exception("Factcheck endpoint failed")
        return jsonify({
            "error": str(exc),
            "errorType": exc.__class__.__name__,
        }), 500
