from time import perf_counter

from flask import Blueprint, current_app, jsonify, request

from app_core.observability import elapsed_ms
from app_core.services.factcheck_service import find_fact_checks


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
        lookup_started = perf_counter()
        factcheck_data = find_fact_checks(query, openai_client, settings)
        current_app.logger.info(
            "factcheck lookup results=%d source=%s query_chars=%d duration_ms=%.1f",
            len(factcheck_data["results"]),
            factcheck_data["source"],
            len(query),
            elapsed_ms(lookup_started),
        )
        current_app.logger.info(
            "factcheck completed source=%s duration_ms=%.1f",
            factcheck_data["source"],
            elapsed_ms(route_started),
        )
        return jsonify(factcheck_data)
    except Exception as exc:
        current_app.logger.exception("Factcheck endpoint failed")
        return jsonify({
            "error": str(exc),
            "errorType": exc.__class__.__name__,
        }), 500
