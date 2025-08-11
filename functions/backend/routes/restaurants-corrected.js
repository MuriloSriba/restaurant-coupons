const express = require('express');
const router = express.Router();

// Get all restaurants (approved)
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

// Create new restaurant
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { name, cuisine, rating, location, image, hours, description, whatsapp, map_embed } = req.body;
  
  db.run(
    'INSERT INTO restaurants (name, cuisine, rating, location, image, hours, description, whatsapp, map_embed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, cuisine, rating, location, image, hours, description, whatsapp, map_embed],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      res.status(201).json({ 
        id: this.lastID,
        name, cuisine, rating, location, image, hours, description, whatsapp, map_embed
      });
    }
  );
});

module.exports = router;
