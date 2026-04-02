from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

payments = []
payment_counter = 1

@app.route('/')
def home():
    return jsonify({
        "service": "Payment Service",
        "version": "1.0.0",
        "status": "running",
        "port": 8004
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "payment-service",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/payments', methods=['GET'])
def get_payments():
    return jsonify({
        "payments": payments,
        "total": len(payments)
    })

@app.route('/payments', methods=['POST'])
def process_payment():
    global payment_counter
    data = request.get_json()
    payment = {
        "id": payment_counter,
        "order_id": data.get('order_id'),
        "amount": data.get('amount', 0.0),
        "method": data.get('method', 'credit_card'),
        "status": "completed",
        "transaction_id": f"TXN-{payment_counter:06d}",
        "processed_at": datetime.now().isoformat()
    }
    payments.append(payment)
    payment_counter += 1
    return jsonify({
        "message": "Payment processed successfully",
        "payment": payment
    }), 201

if __name__ == '__main__':
    print("💳 Payment Service starting on port 8004...")
    app.run(host='0.0.0.0', port=8004, debug=True)
