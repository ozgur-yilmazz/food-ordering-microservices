from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

orders = []
order_counter = 1

@app.route('/')
def home():
    return jsonify({
        "service": "Order Service",
        "version": "1.0.0",
        "status": "running",
        "port": 8003
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "order-service",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify({
        "orders": orders,
        "total": len(orders)
    })

@app.route('/orders', methods=['POST'])
def create_order():
    global order_counter
    data = request.get_json()
    order = {
        "id": order_counter,
        "user_id": data.get('user_id', 1),
        "items": data.get('items', []),
        "total": data.get('total', 0.0),
        "status": "pending",
        "created_at": datetime.now().isoformat()
    }
    orders.append(order)
    order_counter += 1
    return jsonify({
        "message": "Order created successfully",
        "order": order
    }), 201

if __name__ == '__main__':
    print("📦 Order Service starting on port 8003...")
    app.run(host='0.0.0.0', port=8003, debug=True)
