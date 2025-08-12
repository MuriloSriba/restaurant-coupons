const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not Loaded');

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Requires admin role.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Get all restaurants
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  
  try {
    const result = await db.query('SELECT * FROM restaurants ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  try {
    const result = await db.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    const row = result.rows[0];

    if (!row) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new restaurant (admin only)
router.post('/', isAdmin, async (req, res) => {
  const db = req.app.locals.db;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO restaurants (name, cuisine, rating, location, image, hours, description, whatsapp, map_embed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed]
    );
    
    res.status(201).json({ 
      id: result.rows[0].id,
      name, cuisine, rating, location, image, hours, description, whatsapp, map_embed
    });
  } catch (err) {
    console.error('Database error during restaurant creation:', err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update a restaurant (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;

  try {
    const result = await db.query(
      `UPDATE restaurants SET 
        name = $1, cuisine = $2, rating = $3, location = $4, image = $5, 
        hours = $6, description = $7, whatsapp = $8, map_embed = $9 
       WHERE id = $10`,
      [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully' });
  } catch (err) {
    console.error('Database error during restaurant update:', err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete a restaurant
router.delete('/:id', isAdmin, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    // First, check if the restaurant has any associated coupons
    const couponCheckResult = await db.query('SELECT COUNT(*) as count FROM coupons WHERE restaurant_id = $1', [id]);
    if (couponCheckResult.rows[0].count > 0) {
      return res.status(400).json({ message: 'Cannot delete a restaurant with associated coupons. Delete coupons first.' });
    }

    // If no coupons, proceed with deletion
    const deleteResult = await db.query('DELETE FROM restaurants WHERE id = $1', [id]);
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while deleting restaurant.' });
  }
});

module.exports = router;