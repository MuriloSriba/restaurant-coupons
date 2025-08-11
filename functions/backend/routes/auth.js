const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '6J5HFkNGZVTliik6IWFiXz+0W/CNLrq28arALni84JC7/MhKxg6o9/+GPvdv0TeCL9ZebaMA1aGQX9VZtEuFsg==';
const ADMIN_CODE = 'ADMIN2025'; // Código fixo para cadastro administrativo

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Register new user
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, adminCode } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Determinar role e status baseado no código admin
  let role = 'user';
  let status = 'pending';
  if (adminCode && adminCode === ADMIN_CODE) {
    role = 'admin';
    status = 'complete';
  }
  
  try {
    const db = req.app.locals.db;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const result = await db.query(
        'INSERT INTO users (first_name, last_name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [firstName, lastName, email, hashedPassword, role, status]
      );
      const userId = result.rows[0].id;
      const token = jwt.sign(
        { userId: userId, email: email, role: role, status: status }, // Include status in token
        JWT_SECRET, 
        { expiresIn: '1d' }
      );

      res.status(201).json({ 
        token,
        user: {
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          role: role,
          status: status
        }
      });
    } catch (err) {
      if (err.code === '23505') { // Unique violation error code for PostgreSQL
        return res.status(409).json({ message: 'Email already registered' });
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = req.app.locals.db;
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.status === 'pending') {
      return res.status(402).json({ message: 'Payment pending', user });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, status: user.status }, // Include status in token
      JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        firstName: user.first_name, 
        lastName: user.last_name, 
        role: user.role, 
        status: user.status // Include status in user object
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/update-payment-status', authenticateToken, async (req, res) => { // Apply middleware here
  const userId = req.user.userId; // Get userId from authenticated token
  const db = req.app.locals.db;

  try {
    await db.query('UPDATE users SET status = $1 WHERE id = $2', ['complete', userId]);
    // Update the token with the new status so frontend can reflect it immediately
    const newToken = jwt.sign(
      { userId: req.user.userId, email: req.user.email, role: req.user.role, status: 'complete' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({ message: 'Payment status updated successfully', token: newToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router, authenticateToken }; // Export both router and middleware