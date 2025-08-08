
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const alterStatement = `
  ALTER TABLE restaurants ADD COLUMN cuisine TEXT;
`;

db.serialize(() => {
  db.run(alterStatement, (err) => {
    if (err) {
      // It's possible the column already exists, so we can check for that error.
      if (err.message.includes('duplicate column name')) {
        console.log('Column "cuisine" already exists in "restaurants" table.');
      } else {
        console.error('Error altering table:', err.message);
      }
    } else {
      console.log('Table "restaurants" altered successfully, added "cuisine" column.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Closed the database connection.');
  }
});
