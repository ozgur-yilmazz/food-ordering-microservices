from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "service": "Auth Service",
        "version": "1.0.0",
        "status": "running",
        "port": 8001
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "auth-service",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return jsonify({
        "message": "User registered successfully",
        "user": {"id": 1, "email": data.get('email')}
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify({
        "message": "Login successful",
        "token": "mock_jwt_token_123",
        "user": {"id": 1, "email": data.get('email')}
    })

if __name__ == '__main__':
    print("🔐 Auth Service starting on port 8001...")
    app.run(host='0.0.0.0', port=8001, debug=True)
