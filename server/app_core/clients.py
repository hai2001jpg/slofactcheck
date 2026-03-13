from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore
from gradio_client import Client
from openai import OpenAI


@lru_cache(maxsize=1)
def build_openai_client(api_key, timeout):
    if not api_key:
        return None
    return OpenAI(api_key=api_key, timeout=timeout)


@lru_cache(maxsize=1)
def get_gradio_client(gradio_api_url):
    if not gradio_api_url:
        raise ValueError("Missing GRADIO_API_URL")
    return Client(gradio_api_url)


def init_firestore(settings, logger):
    try:
        try:
            firebase_admin.get_app()
        except ValueError:
            cred = credentials.Certificate(str(settings.firebase_credentials_path))
            firebase_admin.initialize_app(cred)
        return firestore.client()
    except Exception as exc:
        logger.error("Failed to initialize Firebase: %s", exc)
        return None
