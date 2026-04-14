from .analysis import analysis_bp
from .factcheck import factcheck_bp
from .health import health_bp
from .topic import topic_bp


def register_blueprints(app):
    app.register_blueprint(analysis_bp)
    app.register_blueprint(topic_bp)
    app.register_blueprint(factcheck_bp)
    app.register_blueprint(health_bp)
