import json
import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
from app import app, orders

@pytest.fixture(autouse=True)
def clear_orders():
    orders.clear()
    yield
    orders.clear()

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_returns_200(client):
    assert client.get("/health").status_code == 200

def test_get_orders_initially_empty(client):
    data = json.loads(client.get("/orders").data)
    assert data["total"] == 0

def test_create_order_returns_201(client):
    r = client.post("/orders", json={"user_id": 1, "items": [], "total": 10.0})
    assert r.status_code == 201

def test_create_order_sets_pending_status(client):
    data = json.loads(client.post("/orders", json={"user_id": 1, "items": [], "total": 10.0}).data)
    assert data["order"]["status"] == "pending"
