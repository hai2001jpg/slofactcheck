from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter


def predict_analysis(gradio_client, model_name, input_text):
    return gradio_client.predict(
        model_name=model_name,
        text=input_text,
        api_name="/predict",
    )


def build_analysis_document(user_id, input_text, model_name, result, confidence, topic):
    return {
        "userId": user_id,
        "input": input_text,
        "model": model_name,
        "result": result,
        "confidence": confidence,
        "topic": topic,
        "createdAt": firestore.SERVER_TIMESTAMP,
    }


def save_analysis(db, document):
    db.collection("analysis").add(document)


def fetch_user_analyses(db, user_id):
    docs = (
        db.collection("analysis")
        .where(filter=FieldFilter("userId", "==", user_id))
        .order_by("createdAt", direction=firestore.Query.DESCENDING)
        .stream()
    )

    results = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        results.append(data)
    return results
