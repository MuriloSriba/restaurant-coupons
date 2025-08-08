const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Requer função de administrador.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

// Get all restaurants
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.all('SELECT * FROM restaurants ORDER BY id', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(rows);
  });
});

// Get restaurant by ID
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(row);
  });
});

// Create new restaurant (admin only)
router.post('/', isAdmin, (req, res) => {
  const db = req.app.locals.db;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;
  
  db.run(
    'INSERT INTO restaurants (name, cuisine, rating, location, image, hours, description, whatsapp, map_embed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed],
    function(err) {
      if (err) {
        console.error('Database error during restaurant creation:', err.message);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }
      
      res.status(201).json({ 
        id: this.lastID,
        name, cuisine, rating, location, image, hours, description, whatsapp, map_embed
      });
    }
  );
});

// Update a restaurant (admin only)
router.put('/:id', isAdmin, (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;

  db.run(
    `UPDATE restaurants SET 
      name = ?, cuisine = ?, rating = ?, location = ?, image = ?, 
      hours = ?, description = ?, whatsapp = ?, map_embed = ? 
     WHERE id = ?`,
    [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed, id],
    function(err) {
      if (err) {
        console.error('Database error during restaurant update:', err.message);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.status(200).json({ message: 'Restaurant updated successfully' });
    }
  );
});

// Delete a restaurant
router.delete('/:id', isAdmin, (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  // First, check if the restaurant has any associated coupons
  db.get('SELECT COUNT(*) as count FROM coupons WHERE restaurant_id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro no servidor ao verificar cupons.' });
    }
    if (row.count > 0) {
      return res.status(400).json({ message: 'Não é possível excluir um restaurante que possui cupons associados. Exclua os cupons primeiro.' });
    }

    // If no coupons, proceed with deletion
    db.run('DELETE FROM restaurants WHERE id = ?', [id], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro no servidor ao excluir o restaurante.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Restaurante não encontrado.' });
      }
      res.status(200).json({ message: 'Restaurante excluído com sucesso.' });
    });
  });
});

module.exports = router;
