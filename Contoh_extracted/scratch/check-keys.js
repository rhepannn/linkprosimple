const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment files
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

let envConfig = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envConfig = { ...envConfig, ...dotenv.parse(envContent) };
}
if (fs.existsSync(envLocalPath)) {
  const envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
  envConfig = { ...envConfig, ...dotenv.parse(envLocalContent) };
}

const anonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!anonKey);
if (anonKey) {
  console.log('Anon Key length:', anonKey.length);
  console.log('Anon Key starts with:', anonKey.substring(0, 10));
}

console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!serviceKey);
if (serviceKey) {
  console.log('Service Key length:', serviceKey.length);
  console.log('Service Key starts with:', serviceKey.substring(0, 10));
}

if (anonKey && serviceKey) {
  console.log('Are Anon Key and Service Key identical?', anonKey === serviceKey);
}
