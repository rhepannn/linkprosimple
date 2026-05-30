import pg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000,
  });

  try {
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log("Tables in database:", res.rows.map(r => r.table_name));
  } catch (err) {
    console.error("Error querying db:", err);
  } finally {
    await pool.end();
  }
}

main();
