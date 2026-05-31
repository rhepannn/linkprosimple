const pg = require('pg');
const connectionString = "postgresql://postgres.bhyukcwgedixkkgkwgoz:snapp.frame-studio@54.179.210.0:5432/postgres";

async function check() {
  const client = new pg.Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', res.rows.map(r => r.table_name));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
