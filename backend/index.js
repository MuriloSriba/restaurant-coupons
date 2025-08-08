require('dotenv').config();
console.log('Dotenv loaded. PORT:', process.env.PORT);
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// SQLite database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const fs = require('fs-extra');

// Vercel specific: Copy the database to a writable directory
const dbSource = path.join(__dirname, 'database.sqlite');
const dbDest = '/tmp/database.sqlite';

// Copy the database file if it doesn't exist in the destination
if (!fs.existsSync(dbDest)) {
  fs.copySync(dbSource, dbDest);
}

const db = new sqlite3.Database(dbDest, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Database instance for routes
app.locals.db = db;

// Function to initialize database and then start the application
const initializeDatabaseAndStartApp = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cuisine TEXT,
      rating REAL,
      location TEXT,
      image TEXT,
      hours TEXT,
      description TEXT,
      whatsapp TEXT,
      map_embed TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      code TEXT,
      restaurant_id INTEGER,
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
    )`, (err) => {
      if (err) {
          console.error("Error creating tables:", err.message);
          process.exit(1);
      }
      
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
        console.log(`Database: ${dbPath}`);
      });
    });
  });
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

module.exports = app;
