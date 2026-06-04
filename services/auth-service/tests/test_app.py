import json
import pytest
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_returns_200(client):
    assert client.get("/health").status_code == 200

def test_health_returns_healthy(client):
    data = json.loads(client.get("/health").data)
    assert data["status"] == "healthy"

def test_register_returns_201(client):
    r = client.post("/register", json={"email": "test@test.com", "password": "123"})
    assert r.status_code == 201

def test_login_returns_token(client):
    data = json.loads(client.post("/login", json={"email": "test@test.com", "password": "123"}).data)
    assert "token" in data
