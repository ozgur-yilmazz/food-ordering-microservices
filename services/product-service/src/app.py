from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

PRODUCTS = [
    {"id": 1, "name": "Margherita Pizza", "price": 12.99, "category": "Pizza", "available": True},
    {"id": 2, "name": "Cheeseburger", "price": 8.99, "category": "Burger", "available": True},
    {"id": 3, "name": "Caesar Salad", "price": 7.50, "category": "Salad", "available": True},
    {"id": 4, "name": "Chicken Wings", "price": 10.99, "category": "Appetizer", "available": True},
    {"id": 5, "name": "Pepperoni Pizza", "price": 14.99, "category": "Pizza", "available": True},
]

@app.route('/')
def home():
    return jsonify({
        "service": "Product Service",
        "version": "1.0.0",
        "status": "running",
        "port": 8002
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "product-service",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/products')
def get_products():
    return jsonify({
        "products": PRODUCTS,
        "total": len(PRODUCTS)
    })

@app.route('/products/<int:product_id>')
def get_product(product_id):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

if __name__ == '__main__':
    print("🍕 Product Service starting on port 8002...")
    app.run(host='0.0.0.0', port=8002, debug=True)
