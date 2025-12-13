from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from gradio_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
GRADIO_API_URL = os.getenv("GRADIO_API_URL")
gr_client = Client(GRADIO_API_URL)

# Innit Firebase
cred = credentials.Certificate("slofactcheck-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app) 

@app.route('/analysis', methods=['POST'])
def analysis_route():
    data = request.json
    user_id = data.get('userId')
    input_text = data.get('input')
    model_name = data.get('model', 'mbert')
    topic = data.get('topic')
    # Call Gradio API for prediction
    try:
        result, confidence = gr_client.predict(
            model_name=model_name,
            text=input_text,
            api_name="/predict"
        )
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
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
