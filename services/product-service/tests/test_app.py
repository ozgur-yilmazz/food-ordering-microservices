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

def test_get_products_returns_200(client):
    assert client.get("/products").status_code == 200

def test_get_products_not_empty(client):
    data = json.loads(client.get("/products").data)
    assert len(data["products"]) > 0

def test_get_nonexistent_product_returns_404(client):
    assert client.get("/products/9999").status_code == 404
