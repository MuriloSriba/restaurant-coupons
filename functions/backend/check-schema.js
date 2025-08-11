const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.all("PRAGMA table_info(restaurants);", [], (err, rows) => {
  if (err) {
    return console.error("Error getting table info:", err.message);
  }
  console.log("Schema for restaurants table:");
  console.log(rows);
});

db.close();
