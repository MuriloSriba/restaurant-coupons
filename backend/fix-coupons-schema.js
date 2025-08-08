const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("ALTER TABLE coupons RENAME TO coupons_old", (err) => {
    if (err) {
      // Ignore error if the table doesn't exist, as the goal is to create a new one.
      if (!err.message.includes('no such table: coupons')) {
         console.error("Error renaming table:", err.message);
      }
    } else {
      console.log("Renamed 'coupons' to 'coupons_old'.");
    }
  });
});

db.close();
