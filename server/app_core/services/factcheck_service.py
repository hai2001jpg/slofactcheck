import requests

from app_core.services.openai_utils import extract_response_payload


def normalize_rating(raw_rating):
    if not raw_rating:
        return "unknown"

    normalized = raw_rating.strip().lower()

    false_labels = (
        "false",
        "mostly false",
        "incorrect",
        "fake",
        "misleading",
        "pants on fire",
        "scam",
        "hoax",
    )
    true_labels = (
        "true",
        "mostly true",
        "correct",
        "accurate",
    )

    if any(label in normalized for label in false_labels):
        return "false"
    if any(label in normalized for label in true_labels):
        return "true"
    return "unknown"


def google_claim_search(query, settings):
    if not settings.google_factcheck_api_key:
        return []

    url = (
        "https://factchecktools.googleapis.com/v1alpha1/claims:search"
        f"?query={query}&key={settings.google_factcheck_api_key}&pageSize=3"
    )
    response = requests.get(url, timeout=settings.google_factcheck_timeout)
    response.raise_for_status()
    data = response.json()

    results = []
    for claim in data.get("claims", []):
        claim_review = claim.get("claimReview", [{}])[0]
        rating_raw = claim_review.get("textualRating")
        results.append(
            {
                "platform": claim_review.get("publisher", {}).get("name"),
                "title": claim.get("text"),
                "rating": normalize_rating(rating_raw),
                "ratingRaw": rating_raw,
                "url": claim_review.get("url"),
            }
        )
    return results


def openai_claim_search(query, openai_client, settings):
    if openai_client is None:
        return []

    response = openai_client.responses.create(
        model=settings.openai_factcheck_model,
        reasoning={"effort": "low"},
        tools=[
            {
                "type": "web_search",
                "filters": {
                    "allowed_domains": list(settings.trusted_factcheck_domains),
                },
            }
        ],
        tool_choice="auto",
        include=["web_search_call.action.sources"],
        instructions=(
            "You retrieve existing fact-check results. "
            "Find up to 3 of the most relevant fact-check or claim-review pages for the user's query. "
            "Use only trustworthy fact-check articles from the allowed domains. "
            "Return only real results. If none are relevant, return an empty array. "
            "The rating_raw field must contain the article's original verdict wording when available."
        ),
        input=f"""
User query: {query}

Return JSON with this exact structure:
{{
  "results": [
    {{
      "platform": "string",
      "title": "string",
      "rating_raw": "string",
      "url": "string"
    }}
  ]
}}
""",
        text={
            "format": {
                "type": "json_schema",
                "name": "factcheck_results",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "results": {
                            "type": "array",
                            "maxItems": 3,
                            "items": {
                                "type": "object",
                                "properties": {
                                    "platform": {"type": "string"},
                                    "title": {"type": "string"},
                                    "rating_raw": {"type": "string"},
                                    "url": {"type": "string"},
                                },
                                "required": ["platform", "title", "rating_raw", "url"],
                                "additionalProperties": False,
                            },
                        },
                    },
                    "required": ["results"],
                    "additionalProperties": False,
                },
            }
        },
    )

    data = extract_response_payload(response)
    results = []
    for item in data.get("results", []):
        results.append(
            {
                "platform": item.get("platform"),
                "title": item.get("title"),
                "rating": normalize_rating(item.get("rating_raw")),
                "ratingRaw": item.get("rating_raw"),
                "url": item.get("url"),
            }
        )
    return results
