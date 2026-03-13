from flask import Flask
from flask_cors import CORS

from .clients import build_openai_client, init_firestore
from .config import load_settings
from .observability import configure_logging, register_request_logging
from .routes import register_blueprints


def create_app():
    app = Flask(__name__)
    CORS(app)

    configure_logging(app)
    register_request_logging(app)

    settings = load_settings()
    app.config["SETTINGS"] = settings
    app.extensions["db"] = init_firestore(settings, app.logger)
    app.extensions["openai_client"] = build_openai_client(
        settings.openai_api_key,
        settings.openai_request_timeout,
    )

    register_blueprints(app)
    return app
