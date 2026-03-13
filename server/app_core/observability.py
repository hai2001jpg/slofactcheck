import logging
from time import perf_counter

from flask import g, request


def elapsed_ms(started_at):
    return (perf_counter() - started_at) * 1000


def configure_logging(app):
    gunicorn_logger = logging.getLogger("gunicorn.error")
    if gunicorn_logger.handlers:
        app.logger.handlers = gunicorn_logger.handlers
        app.logger.setLevel(gunicorn_logger.level)
        return

    logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)


def register_request_logging(app):
    @app.before_request
    def start_request_timer():
        g.request_started_at = perf_counter()

    @app.after_request
    def log_request(response):
        started_at = getattr(g, "request_started_at", None)
        if started_at is None:
            return response

        app.logger.info(
            "%s %s status=%s duration_ms=%.1f",
            request.method,
            request.path,
            response.status_code,
            elapsed_ms(started_at),
        )
        return response

    @app.teardown_request
    def log_request_exception(error):
        if error is None:
            return

        started_at = getattr(g, "request_started_at", None)
        duration = elapsed_ms(started_at) if started_at is not None else -1
        app.logger.exception(
            "%s %s failed after %.1fms",
            request.method,
            request.path,
            duration,
            exc_info=(type(error), error, error.__traceback__),
        )
