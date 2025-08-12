const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Get all coupons - public endpoint
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  
  const query = `
    SELECT 
      c.id, c.title, c.code, c.description, c.discount_type, c.discount_value, 
      c.category, c.type, c.original_price, c.discounted_price, c.image,
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    WHERE c.valid_to >= CURRENT_DATE
    ORDER BY c.created_at DESC
  `;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching coupons:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get coupon by ID - requires authentication
router.get('/:id', authenticateToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  const query = `
    SELECT 
      c.*, 
      r.name as restaurant_name,
      r.address as restaurant_address
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    WHERE c.id = $1
  `;

  try {
    const result = await db.query(query, [id]);
    const coupon = result.rows[0];

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json(coupon);
  } catch (err) {
    console.error('Error fetching coupon:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new coupon - admin only
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  const db = req.app.locals.db;
  const { 
    title, code, description, discount_type, discount_value, category, 
    original_price, discounted_price, valid_from, valid_to, restaurant_id, image 
  } = req.body;

  if (!title || !code || !discount_type || !discount_value || !original_price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO coupons (
        title, code, description, discount_type, discount_value, category,
        original_price, discounted_price, valid_from, valid_to, restaurant_id, image
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        title, code, description, discount_type, discount_value, category,
        original_price, discounted_price, valid_from, valid_to, restaurant_id, image
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating coupon:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update coupon - admin only
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  const db = req.app.locals.db;
  const { id } = req.params;
  const { 
    title, code, description, discount_type, discount_value, category, 
    original_price, discounted_price, valid_from, valid_to, restaurant_id, image 
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE coupons SET
        title = $1, code = $2, description = $3, discount_type = $4, 
        discount_value = $5, category = $6, original_price = $7, 
        discounted_price = $8, valid_from = $9, valid_to = $10, 
        restaurant_id = $11, image = $12, updated_at = CURRENT_TIMESTAMP
      WHERE id = $13 RETURNING *`,
      [
        title, code, description, discount_type, discount_value, category,
        original_price, discounted_price, valid_from, valid_to,
        restaurant_id, image, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating coupon:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete coupon - admin only
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM coupons WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    console.error('Error deleting coupon:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get coupons by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  const db = req.app.locals.db;
  const { restaurantId } = req.params;

  const query = `
    SELECT 
      c.id, c.title, c.code, c.description, c.discount_type, c.discount_value, 
      c.category, c.type, c.original_price, c.discounted_price, c.image,
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    WHERE c.restaurant_id = $1 AND c.valid_to >= CURRENT_DATE
    ORDER BY c.created_at DESC
  `;

  try {
    const result = await db.query(query, [restaurantId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurant coupons:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
