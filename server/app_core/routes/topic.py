from time import perf_counter

from flask import Blueprint, current_app, jsonify, request

from app_core.observability import elapsed_ms
from app_core.services.topic_service import classify_topic


topic_bp = Blueprint("topic", __name__)


@topic_bp.route("/topic", methods=["POST"])
def topic_route():
    route_started = perf_counter()
    data = request.get_json(silent=True) or {}
    input_text = data.get("input")
    settings = current_app.config["SETTINGS"]
    openai_client = current_app.extensions.get("openai_client")

    if not input_text or not str(input_text).strip():
        return jsonify({"success": False, "error": "Input text is required."}), 400

    try:
        topic = classify_topic(str(input_text), openai_client, settings)
        current_app.logger.info(
            "topic completed topic=%s input_chars=%d duration_ms=%.1f",
            topic,
            len(str(input_text)),
            elapsed_ms(route_started),
        )
        return jsonify({
            "success": True,
            "topic": topic,
            "choices": list(settings.topic_choices),
        })
    except Exception as exc:
        current_app.logger.exception("Topic endpoint failed")
        return jsonify({
            "success": False,
            "error": str(exc),
            "errorType": exc.__class__.__name__,
        }), 500
