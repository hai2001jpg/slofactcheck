import json


def extract_response_payload(response):
    if getattr(response, "output_text", None):
        return json.loads(response.output_text)

    for item in getattr(response, "output", []) or []:
        if getattr(item, "type", None) != "message":
            continue

        for content in getattr(item, "content", []) or []:
            if getattr(content, "type", None) != "output_text":
                continue

            text = getattr(content, "text", None)
            if text:
                return json.loads(text)

    raise ValueError("OpenAI response did not contain JSON output text")
