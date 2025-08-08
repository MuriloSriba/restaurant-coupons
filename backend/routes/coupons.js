const express = require('express');
const router = express.Router();

// Get all coupons
router.get('/', (req, res) => {
  const db = req.app.locals.db;

  const query = `
    SELECT 
      c.*, 
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    ORDER BY c.id
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(rows);
  });
});

// Get coupon by ID
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  const query = `
    SELECT 
      c.*, 
      r.name as restaurant_name 
    FROM coupons c
    LEFT JOIN restaurants r ON c.restaurant_id = r.id
    WHERE c.id = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(row);
  });
});

// Create new coupon (admin only)
router.post('/', (req, res) => {
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

  db.run(
    `INSERT INTO coupons (
      title, code, description, discount_type, discount_value, category, type, 
      original_price, discounted_price, min_order_value, valid_from, valid_to, 
      usage_limit, restaurant_id, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, code, description, discount_type, discount_value, category, type, 
      original_price, discounted_price, min_order_value, valid_from, valid_to, 
      usage_limit, restaurant_id, image
    ],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      // Return the full object that was created
      res.status(201).json({
        id: this.lastID,
        title, code, description, discount_type, discount_value, category, type, 
        original_price, discounted_price, min_order_value, valid_from, valid_to, 
        usage_limit, restaurant_id, image
      });
    }
  );
});

// Delete a coupon
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  db.run('DELETE FROM coupons WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Cupom não encontrado' });
    }
    res.status(200).json({ message: 'Cupom excluído com sucesso.' });
  });
});

// Update a coupon
router.put('/:id', (req, res) => {
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

  db.run(
    `UPDATE coupons SET
      title = ?, code = ?, description = ?, discount_type = ?, discount_value = ?, 
      category = ?, type = ?, original_price = ?, discounted_price = ?, 
      min_order_value = ?, valid_from = ?, valid_to = ?, usage_limit = ?, 
      restaurant_id = ?, image = ?
    WHERE id = ?`,
    [
      title, code, description, discount_type, discount_value, category, type, 
      original_price, discounted_price, min_order_value, valid_from, valid_to, 
      usage_limit, restaurant_id, image, id
    ],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Cupom não encontrado' });
      }
      res.status(200).json({ message: 'Cupom atualizado com sucesso.' });
    }
  );
});

module.exports = router;
