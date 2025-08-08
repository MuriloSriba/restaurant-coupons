require('dotenv').config({ path: './.env' });
console.log('Dotenv loaded. PORT:', process.env.PORT, 'DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Error connecting to PostgreSQL database', err.message);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Database instance for routes
app.locals.db = pool;

// Function to initialize database and then start the application
const initializeDatabaseAndStartApp = async () => {
  try {
    const client = await pool.connect();
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

    client.release();
    console.log("Database tables checked/created successfully.");

    // Mount API routes only after DB is ready
    const authRouter = require('./routes/auth');
    const restaurantsRouter = require('./routes/restaurants');
    const couponsRouter = require('./routes/coupons');
    const paymentRouter = require('./routes/payment');

    console.log('Mounting API routes...');
    app.use('/api/auth', authRouter);
    app.use('/api/restaurants', restaurantsRouter);
    app.use('/api/coupons', couponsRouter);
    app.use('/api', paymentRouter);
    console.log('Payment router mounted at /api.');

    // Basic route - serve index.html as the main page
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'index.html'));
    });

    // Generic error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something broke!', message: err.message });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Database: PostgreSQL`);
    });
  } catch (err) {
    console.error("Error initializing database:", err.message);
    process.exit(1);
  }
};

// Start the initialization process
initializeDatabaseAndStartApp();

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception caught!', err);
    process.exit(1); // Exit with a failure code
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1); // Exit with a failure code
});


