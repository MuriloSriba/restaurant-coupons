require('dotenv').config({ path: './backend/.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const fixMapEmbed = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE restaurants SET map_embed = '' WHERE map_embed IS NULL OR map_embed = 'undefined'"
    );
    console.log(`${result.rowCount} records updated.`);
    client.release();
  } catch (err) {
    console.error('Error fixing map embed:', err);
  } finally {
    pool.end();
  }
};

fixMapEmbed();