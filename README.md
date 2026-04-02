# Food Ordering Microservices Platform

A microservices-based food ordering platform built with Python Flask.

**Team Members:** Zeynep Altundal, Mustafa Doğan Özgün, Özgür Yılmaz

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client / Browser                    │
└──────────┬──────────┬──────────┬────────────────────────┘
           │          │          │          │
    ┌──────▼──┐ ┌─────▼───┐ ┌───▼─────┐ ┌─▼────────┐
    │  Auth   │ │ Product │ │  Order  │ │ Payment  │
    │ Service │ │ Service │ │ Service │ │ Service  │
    │ :8001   │ │ :8002   │ │ :8003   │ │ :8004    │
    └──────┬──┘ └─────┬───┘ └───┬─────┘ └─┬────────┘
           └──────────┴─────────┴──────────┘
                             │
                    ┌────────▼────────┐
                    │   MySQL 8.0     │
                    │   :3306         │
                    └─────────────────┘
```

---

## Quick Start

### Option 1 — Docker (all services at once)

```bash
cd infrastructure/docker
docker-compose up --build
```

### Option 2 — Run each service manually

```bash
# Install Flask (once)
pip install flask

# Each service in a separate terminal
python services/auth-service/src/app.py
python services/product-service/src/app.py
python services/order-service/src/app.py
python services/payment-service/src/app.py
```

---

## Endpoints

### Auth Service — http://localhost:8001

| Method | Endpoint  | Description        |
|--------|-----------|--------------------|
| GET    | /health   | Health check       |
| POST   | /register | Register new user  |
| POST   | /login    | Login & get token  |

```bash
curl -X POST http://localhost:8001/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "123456"}'

curl -X POST http://localhost:8001/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "123456"}'
```

### Product Service — http://localhost:8002

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| GET    | /health        | Health check       |
| GET    | /products      | List all products  |
| GET    | /products/{id} | Get single product |

```bash
curl http://localhost:8002/products
```

### Order Service — http://localhost:8003

| Method | Endpoint | Description      |
|--------|----------|------------------|
| GET    | /health  | Health check     |
| GET    | /orders  | List all orders  |
| POST   | /orders  | Create new order |

```bash
curl -X POST http://localhost:8003/orders \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "items": [{"product_id": 1, "qty": 2}], "total": 25.98}'
```

### Payment Service — http://localhost:8004

| Method | Endpoint  | Description        |
|--------|-----------|--------------------|
| GET    | /health   | Health check       |
| GET    | /payments | List all payments  |
| POST   | /payments | Process a payment  |

```bash
curl -X POST http://localhost:8004/payments \
  -H "Content-Type: application/json" \
  -d '{"order_id": 1, "amount": 25.98, "method": "credit_card"}'
```

---

## Project Structure

```
food-ordering-microservices/
├── services/
│   ├── auth-service/
│   │   ├── src/app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── product-service/
│   │   ├── src/app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── order-service/
│   │   ├── src/app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── payment-service/
│       ├── src/app.py
│       ├── requirements.txt
│       └── Dockerfile
├── infrastructure/
│   └── docker/
│       └── docker-compose.yml
├── README.md
└── .gitignore
```
