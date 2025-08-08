const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ADMIN_CODE = 'ADMIN2024'; // Código fixo para cadastro administrativo

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
        { userId: userId, email: email, role: role }, 
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
      { userId: user.id, email: user.email, role: user.role }, 
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
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/update-payment-status', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    const db = req.app.locals.db;

    await db.query('UPDATE users SET status = $1 WHERE id = $2', ['complete', userId]);
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
