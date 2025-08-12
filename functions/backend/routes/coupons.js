const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware

// Get all coupons
router.get('/', authenticateToken, async (req, res) => { // Apply middleware here
  const db = req.app.locals.db;

  // Check user role and status from the authenticated token
  if (req.user.role !== 'admin' && req.user.status !== 'complete') {
    return res.status(403).json({ message: 'Access denied. Only administrators and paying users can view coupons.' });
  }

  const query = `
    SELECT 
      c.*, 
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    ORDER BY c.id
  `;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get coupon by ID
router.get('/:id', authenticateToken, async (req, res) => { // Apply middleware here
  const db = req.app.locals.db;
  const { id } = req.params;

  // Check user role and status from the authenticated token
  if (req.user.role !== 'admin' && req.user.status !== 'complete') {
    return res.status(403).json({ message: 'Access denied. Only administrators and paying users can view coupons.' });
  }
  
  const query = `
    SELECT 
      c.*, 
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    WHERE c.id = $1
  `;

  try {
    const result = await db.query(query, [id]);
    const row = result.rows[0];

    if (!row) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new coupon (admin only)
router.post('/', authenticateToken, async (req, res) => { // Apply middleware here
  // Only allow admins to create coupons
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only administrators can create coupons.' });
  }

  const db = req.app.locals.db;
  const { 
    title, code, description, discount_type, discount_value, category, type, 
    original_price, min_order_value, valid_from, valid_to, usage_limit, 
    restaurant_id, image 
  } = req.body;

  // Basic server-side validation for required fields
  if (!title || !code || !restaurant_id || !discount_type || !category || !type || original_price == null || discount_value == null) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios do formulário.' });
  }

  // Server-side calculation for discounted_price
  let discounted_price;
  if (discount_type === 'percentage') {
    discounted_price = original_price * (1 - discount_value / 100);
  } else if (discount_type === 'fixed') {
    discounted_price = original_price - discount_value;
  }
  discounted_price = Math.max(0, discounted_price || 0); // Ensure price is not negative

  try {
    const result = await db.query(
      `INSERT INTO coupons (
        title, code, description, discount_type, discount_value, category, type, 
        original_price, discounted_price, min_order_value, valid_from, valid_to, 
        usage_limit, restaurant_id, image
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
      [
        title, code, description, discount_type, discount_value, category, type, 
        original_price, discounted_price, min_order_value, valid_from, valid_to, 
        usage_limit, restaurant_id, image
      ]
    );
    
    // Return the full object that was created
    res.status(201).json({
      id: result.rows[0].id,
      title, code, description, discount_type, discount_value, category, type, 
      original_price, discounted_price, min_order_value, valid_from, valid_to, 
      usage_limit, restaurant_id, image
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a coupon
router.delete('/:id', authenticateToken, async (req, res) => { // Apply middleware here
  // Only allow admins to delete coupons
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only administrators can delete coupons.' });
  }

  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM coupons WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }
    res.status(200).json({ message: 'Cupom excluído com sucesso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Update a coupon
router.put('/:id', authenticateToken, async (req, res) => { // Apply middleware here
  // Only allow admins to update coupons
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only administrators can update coupons.' });
  }

  const db = req.app.locals.db;
  const { id } = req.params;
  const { 
    title, code, description, discount_type, discount_value, category, type, 
    original_price, min_order_value, valid_from, valid_to, usage_limit, 
    restaurant_id, image 
  } = req.body;

  // Basic server-side validation for required fields
  if (!title || !code || !restaurant_id || !discount_type || !category || !type || original_price == null || discount_value == null) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios do formulário.' });
  }

  // Server-side calculation for discounted_price
  let discounted_price;
  if (discount_type === 'percentage') {
    discounted_price = original_price * (1 - discount_value / 100);
  } else if (discount_type === 'fixed') {
    discounted_price = original_price - discount_value;
  }
  discounted_price = Math.max(0, discounted_price || 0); // Ensure price is not negative

  try {
    const result = await db.query(
      `UPDATE coupons SET
        title = $1, code = $2, description = $3, discount_type = $4, discount_value = $5, 
        category = $6, type = $7, original_price = $8, discounted_price = $9, 
        min_order_value = $10, valid_from = $11, valid_to = $12, usage_limit = $13, 
        restaurant_id = $14, image = $15
      WHERE id = $16`,
      [
        title, code, description, discount_type, discount_value, category, type, 
        original_price, discounted_price, min_order_value, valid_from, valid_to, 
        usage_limit, restaurant_id, image, id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }
    res.status(200).json({ message: 'Cupom atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;