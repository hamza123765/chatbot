from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from mangum import Mangum
import datetime
import os

app = FastAPI()

# Fallback to allow all if not specified, keeping your deployment seamless
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB Cloud safely for Serverless
MONGO_URI = os.getenv('MONGO_URI')
if not MONGO_URI:
    raise RuntimeError("❌ CRITICAL ERROR: MONGO_URI environment variable is not set!")

try:
    # serverSelectionTimeoutMS=5000 stops the function from spinning endlessly if Mongo is slow to respond
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client['knaComputers']
    orders_collection = db['orders']
except Exception as e:
    raise RuntimeError(f"❌ Database initialization connection error: {e}")

# Define Request Schema data models using Pydantic
class CartItem(BaseModel):
    name: str
    price: float
    quantity: int

class OrderModel(BaseModel):
    customerName: str
    address: str
    items: list[CartItem]
    totalAmount: float

# Base health checks
@app.get("/")
async def root():
    return {"message": "Backend server is running on Netlify Functions!", "status": "active"}

# Your exact API Endpoints
@app.post("/api/orders")
async def create_order(order: OrderModel):
    try:
        new_order = order.model_dump()
        new_order["orderDate"] = datetime.datetime.now(datetime.timezone.utc)

        result = orders_collection.insert_one(new_order)
        return {
            "success": True, 
            "message": "Order placed successfully!", 
            "orderId": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving order: {str(e)}")

@app.get("/api/orders")
async def get_orders():
    try:
        orders = list(orders_collection.find({}, {"_id": 0}))
        return {"orders": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching records.")

# This tells Mangum to expect an API Gateway/Proxy configuration structure
# matching your rewrite rule inside netlify.toml
handler = Mangum(app, lifespan="off")