require('dotenv').config({ path: './.env' });
console.log('Dotenv loaded. PORT:', process.env.PORT, 'DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

// Import routes
const restaurantsRouter = require('./routes/restaurants');
const couponsRouter = require('./routes/coupons');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not configured. Please set it in your environment variables.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? {
    rejectUnauthorized: false,
  } : false,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Error connecting to PostgreSQL database', err.message);
});

// CORS Configuration - More permissive for debugging
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins for debugging
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '5mb' }));

// API Routes
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/auth', authRouter);
app.use('/api/pix-payment', paymentRouter);

// Make db pool available to all routes
app.locals.db = pool;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Function to initialize database and then start the application
const initializeDatabaseAndStartApp = async () => {
  try {
    const client = await pool.connect();
    
    // Create tables with error handling
    try {
      await client.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

      await client.query(`CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cuisine TEXT,
        rating REAL,
        location TEXT,
        image TEXT,
        hours TEXT,
        description TEXT,
        whatsapp TEXT,
        map_embed TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

      await client.query(`CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        code TEXT,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        description TEXT,
        discount_type TEXT,
        discount_value REAL,
        original_price REAL,
        discounted_price REAL,
        min_order_value REAL,
        valid_from TEXT,
        valid_to TEXT,
        usage_limit INTEGER,
        category TEXT,
        type TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    } catch (dbError) {
      console.error('Database initialization error:', dbError);
      throw dbError;
    }

    client.release();
    console.log("Database tables checked/created successfully.");
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
};

// Start the initialization process
initializeDatabaseAndStartApp().catch(err => {
  console.error('Failed to initialize database and start app:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception caught!', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports.handler = serverless(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Function to initialize database and then start the application
const initializeDatabaseAndStartApp = async () => {
  try {
    const client = await pool.connect();
    
    // Create tables with error handling
    try {
      await client.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

      await client.query(`CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cuisine TEXT,
        rating REAL,
        location TEXT,
        image TEXT,
        hours TEXT,
        description TEXT,
        whatsapp TEXT,
        map_embed TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

      await client.query(`CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        code TEXT,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        description TEXT,
        discount_type TEXT,
        discount_value REAL,
        original_price REAL,
        discounted_price REAL,
        min_order_value REAL,
        valid_from TEXT,
        valid_to TEXT,
        usage_limit INTEGER,
        category TEXT,
        type TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    } catch (dbError) {
      console.error('Database initialization error:', dbError);
      throw dbError;
    }

    client.release();
    console.log("Database tables checked/created successfully.");
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
};

// Start the initialization process
initializeDatabaseAndStartApp().catch(err => {
  console.error('Failed to initialize database and start app:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception caught!', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports.handler = serverless(app);