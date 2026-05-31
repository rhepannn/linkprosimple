const pg = require('pg');
const connectionString = "postgresql://postgres.bhyukcwgedixkkgkwgoz:snapp.frame-studio@54.179.210.0:5432/postgres";

async function check() {
  const client = new pg.Client({ connectionString });
  try {
    await client.connect();
    console.log('✅ Directly connected to DB using pg client!');
    const res = await client.query('SELECT NOW()');
    console.log('✅ Query success:', res.rows[0]);
  } catch (err) {
    console.error('❌ Failed to connect:', err.message);
  } finally {
    await client.end();
  }
}

check();
