from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# --- Inicializácia Firebase ---
cred = credentials.Certificate("slofactcheck-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app) 

if __name__ == "__main__":
    app.run(debug=True)
