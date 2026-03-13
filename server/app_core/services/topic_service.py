from app_core.services.openai_utils import extract_response_payload


def classify_topic(text, openai_client, settings):
    if openai_client is None:
        return "others"

    response = openai_client.responses.create(
        model=settings.openai_topic_model,
        reasoning={"effort": "low"},
        instructions=(
            "Classify the user's text into exactly one topic category based on its main subject. "
            "Use only one of: politics, health, sport, culture, others. "
            "If the topic is mixed or unclear, choose others."
        ),
        input=f"Text: {text}",
        text={
            "format": {
                "type": "json_schema",
                "name": "topic_classification",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "topic": {
                            "type": "string",
                            "enum": list(settings.topic_choices),
                        },
                    },
                    "required": ["topic"],
                    "additionalProperties": False,
                },
            }
        },
    )

    payload = extract_response_payload(response)
    topic = payload.get("topic")
    if topic not in settings.topic_choices:
        return "others"
    return topic
