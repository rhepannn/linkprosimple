const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

console.log("=== Auth Env Variables ===");
console.log("AUTH_SECRET:", process.env.AUTH_SECRET ? "SET" : "NOT SET");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "NOT SET");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
