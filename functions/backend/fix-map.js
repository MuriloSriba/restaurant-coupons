require('dotenv').config({ path: './.env' });
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const fixMapEmbed = async () => {
  try {
    db.run(
      "UPDATE restaurants SET map_embed = '' WHERE map_embed IS NULL OR map_embed = 'undefined'",
      function(err) {
        if (err) {
          console.error('Error fixing map embed:', err);
        } else {
          console.log(`${this.changes} records updated.`);
        }
      }
    );
  } catch (err) {
    console.error('Error fixing map embed:', err);
  } finally {
    db.close();
  }
};

fixMapEmbed();