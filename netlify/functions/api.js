import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables if running locally
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Equivalent to Pydantic parsing request bodies

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to MongoDB Cloud safely for Serverless
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ CRITICAL ERROR: MONGO_URI environment variable is not set!");
  process.exit(1); 
}

let dbClient;
let ordersCollection;

// Reusable database connection helper for Serverless environments
async function connectToDatabase() {
  if (ordersCollection) return ordersCollection;
  
  try {
    // serverSelectionTimeoutMS: 5000 stops the function from spinning endlessly
    dbClient = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 });
    await dbClient.connect();
    
    const db = dbClient.db('knaComputers');
    ordersCollection = db.collection('orders');
    return ordersCollection;
  } catch (error) {
    console.error(`❌ Database initialization connection error: ${error.message}`);
    throw error;
  }
}

// Base health checks
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running on Netlify Functions!", status: "active" });
});

// Create Order API Endpoint
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, address, items, totalAmount } = req.body;

    // Basic Validation (Replacing Pydantic's automatic validation)
    if (!customerName || !address || !Array.isArray(items) || typeof totalAmount !== 'number') {
      return res.status(422).json({ detail: "Unprocessable Entity: Missing or invalid required fields." });
    }

    const collection = await connectToDatabase();
    
    const newOrder = {
      customerName,
      address,
      items: items.map(item => ({
        name: String(item.name),
        price: Number(item.price),
        quantity: parseInt(item.quantity, 10)
      })),
      totalAmount: Number(totalAmount),
      orderDate: new Date() // Generates UTC ISO string in MongoDB automatically
    };

    const result = await collection.insertOne(newOrder);
    
    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      orderId: result.insertedId.toString()
    });
  } catch (error) {
    res.status(500).json({ detail: `Error saving order: ${error.message}` });
  }
});

// Get Orders API Endpoint
app.get("/api/orders", async (req, res) => {
  try {
    const collection = await connectToDatabase();
    
    // projection: { _id: 0 } excludes the MongoDB ID from the response matching your Python code
    const orders = await collection.find({}).project({ _id: 0 }).toArray();
    
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ detail: "Error fetching records." });
  }
});

// Replaces Mangum(app, lifespan="off") for Netlify/AWS serverless wrappers
export const handler = serverless(app);