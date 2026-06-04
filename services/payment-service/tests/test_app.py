import json
import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
from app import app, payments

@pytest.fixture(autouse=True)
def clear_payments():
    payments.clear()
    yield
    payments.clear()

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_returns_200(client):
    assert client.get("/health").status_code == 200

def test_get_payments_initially_empty(client):
    data = json.loads(client.get("/payments").data)
    assert data["total"] == 0

def test_process_payment_returns_201(client):
    r = client.post("/payments", json={"order_id": 1, "amount": 25.98, "method": "credit_card"})
    assert r.status_code == 201

def test_payment_status_completed(client):
    data = json.loads(client.post("/payments", json={"order_id": 1, "amount": 10.0}).data)
    assert data["payment"]["status"] == "completed"
