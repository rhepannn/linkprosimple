const pg = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = "postgresql://postgres.bhyukcwgedixkkgkwgoz:snapp.frame-studio@54.179.210.0:5432/postgres";

async function applySchema() {
  const schemaPath = path.join(__dirname, '../supabase/schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ schema.sql not found at', schemaPath);
    return;
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');
  const client = new pg.Client({ connectionString });

  try {
    console.log('⏳ Connecting to database...');
    await client.connect();
    console.log('✅ Connected! Applying schema...');
    
    // Split SQL by semicolon and execute parts, or just execute all if simple
    // For schema.sql, executing all at once is usually fine unless it's huge
    await client.query(sql);
    
    console.log('✅ Schema applied successfully! All tables created.');
  } catch (err) {
    console.error('❌ Failed to apply schema:', err.message);
  } finally {
    await client.end();
  }
}

applySchema();
