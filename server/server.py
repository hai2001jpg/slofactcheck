from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

from predict import load_model, predict_text


# model caching
model_cache = {}
def get_model(model_name="mbert"):
    if model_name not in model_cache:
        model_cache[model_name] = load_model(model_name)
    return model_cache[model_name]

# Innit Firebase
cred = credentials.Certificate("slofactcheck-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app) 


# endpoint for posting analysis
@app.route('/analysis', methods=['POST'])
def analysis_route():
    data = request.json
    user_id = data.get('userId')
    input_text = data.get('input')
    model_name = data.get('model', 'mbert')
    topic = data.get('topic')
    # Get or load model
    tokenizer, model, model_type = get_model(model_name)
    # Call your predict function
    result, confidence = predict_text(input_text, tokenizer, model, model_type)
    doc = {
        'userId': user_id,
        'input': input_text,
        'model': model_name,
        'result': result,
        'confidence': confidence,
        'topic': topic,
        'createdAt': firestore.SERVER_TIMESTAMP
    }
    db.collection('analysis').add(doc)
    return jsonify({'success': True, 'result': result, 'confidence': confidence})

# GET endpoint to fetch all analysis documents for a user
@app.route('/analysis', methods=['GET'])
def get_user_analysis():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'Missing userId'}), 400
    docs = db.collection('analysis').where('userId', '==', user_id).order_by('createdAt', direction=firestore.Query.DESCENDING).stream()
    results = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        results.append(data)
    return jsonify({'analyses': results})

if __name__ == '__main__':
    app.run(port=5000)
