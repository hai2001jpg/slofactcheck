import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


@dataclass(frozen=True)
class Settings:
    gradio_api_url: str | None
    openai_api_key: str | None
    openai_factcheck_model: str
    openai_topic_model: str
    openai_request_timeout: float
    google_factcheck_api_key: str | None
    google_factcheck_timeout: float
    firebase_credentials_path: Path
    topic_choices: tuple[str, ...]
    trusted_factcheck_domains: tuple[str, ...]
    allowed_models: tuple[str, ...]


def load_settings():
    openai_factcheck_model = os.getenv("OPENAI_FACTCHECK_MODEL", "gpt-5.2")

    return Settings(
        gradio_api_url=os.getenv("GRADIO_API_URL"),
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        openai_factcheck_model=openai_factcheck_model,
        openai_topic_model=os.getenv("OPENAI_TOPIC_MODEL", openai_factcheck_model),
        openai_request_timeout=float(os.getenv("OPENAI_REQUEST_TIMEOUT", "45")),
        google_factcheck_api_key=os.getenv("FACTCHECK_API_KEY"),
        google_factcheck_timeout=float(os.getenv("GOOGLE_FACTCHECK_TIMEOUT", "15")),
        firebase_credentials_path=Path(
            os.getenv(
                "FIREBASE_CREDENTIALS_PATH",
                BASE_DIR / "slofactcheck-firebase-adminsdk.json",
            )
        ),
        topic_choices=("politics", "health", "sport", "culture", "others"),
        trusted_factcheck_domains=(
            "snopes.com",
            "politifact.com",
            "factcheck.org",
            "reuters.com",
            "apnews.com",
            "afp.com",
            "fullfact.org",
            "demagog.sk",
        ),
        allowed_models=("mbert", "xlm_roberta", "mt5", "mdeberta_v3"),
    )
