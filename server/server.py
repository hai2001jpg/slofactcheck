from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from gradio_client import Client
import os
from dotenv import load_dotenv
import requests

load_dotenv()
GRADIO_API_URL = os.getenv("GRADIO_API_URL")
gr_client = Client(GRADIO_API_URL)


# Init Firebase
try:
    cred = credentials.Certificate("slofactcheck-firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    db = None
    print(f"Failed to initialize Firebase: {e}")

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
        return jsonify({'success': False, 'error': f'Gradio API error: {str(e)}'}), 500

    doc = {
        'userId': user_id,
        'input': input_text,
        'model': model_name,
        'result': result,
        'confidence': confidence,
        'topic': topic,
        'createdAt': firestore.SERVER_TIMESTAMP
    }
    if db is None:
        return jsonify({'success': False, 'error': 'Firebase not initialized'}), 500
    try:
        db.collection('analysis').add(doc)
    except Exception as e:
        return jsonify({'success': False, 'error': f'Firebase error: {str(e)}'}), 500
    return jsonify({'success': True, 'result': result, 'confidence': confidence})

# GET endpoint to fetch all analysis documents for user
@app.route('/analysis', methods=['GET'])
def get_user_analysis():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'Missing userId'}), 400
    if db is None:
        return jsonify({'error': 'Firebase not initialized'}), 500
    try:
        docs = db.collection('analysis').where('userId', '==', user_id).order_by('createdAt', direction=firestore.Query.DESCENDING).stream()
        results = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            results.append(data)
        return jsonify({'analyses': results})
    except Exception as e:
        return jsonify({'error': f'Firebase error: {str(e)}'}), 500


GOOGLE_FACTCHECK_API_KEY = os.getenv("FACTCHECK_API_KEY")
# endpoint for Google Fact Check Tools API
@app.route('/factcheck', methods=['GET'])
def factcheck():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Missing query'}), 400

    url = (
        f"https://factchecktools.googleapis.com/v1alpha1/claims:search"
        f"?query={query}&key={GOOGLE_FACTCHECK_API_KEY}&pageSize=3"
    )
    try:
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        results = []
        for claim in data.get('claims', []):
            claim_review = claim.get('claimReview', [{}])[0]
            results.append({
                'text': claim.get('text'),
                'claimant': claim.get('claimant'),
                'platform': claim_review.get('publisher', {}).get('name'),
                'url': claim_review.get('url'),
                'rating': claim_review.get('textualRating'),
            })
        return jsonify({'results': results})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
