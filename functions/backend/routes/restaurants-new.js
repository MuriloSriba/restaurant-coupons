const express = require('express');
const router = express.Router();

// Get all approved restaurants
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.all(
    'SELECT * FROM restaurants WHERE is_approved = 1 ORDER BY id',
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(rows);
    }
  );
});

// Get all pending restaurants (admin only)
router.get('/pending', (req, res) => {
  const db = req.app.locals.db;
  
  db.all(
    'SELECT * FROM restaurants WHERE is_approved = 0 ORDER BY created_at DESC',
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(rows);
    }
  );
});

// Get restaurant by ID
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  db.get(
    'SELECT * FROM restaurants WHERE id = ? AND is_approved = 1',
    [id],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!row) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.json(row);
    }
  );
});

// Create new restaurant (admin only)
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;
  
  db.run(
    'INSERT INTO restaurants (name, cuisine, rating, location, image, hours, description, whatsapp, map_embed, status, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed, 'pending', false],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.status(201).json({ 
        id: this.lastID,
        name, cuisine, rating, location, image, hours, description, whatsapp, map_embed,
        status: 'pending',
        is_approved: false
      });
    }
  );
});

// Approve restaurant (admin only)
router.put('/:id/approve', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  db.run(
    'UPDATE restaurants SET is_approved = 1, status = ?, approved_at = CURRENT_TIMESTAMP WHERE id = ?',
    ['approved', id],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.json({ message: 'Restaurant approved successfully' });
    }
  );
});

// Reject restaurant (admin only)
router.put('/:id/reject', (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  
  db.run(
    'UPDATE restaurants SET is_approved = 0, status = ? WHERE id = ?',
    ['rejected', id],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.json({ message: 'Restaurant rejected successfully' });
    }
  );
);

module.exports = router;
