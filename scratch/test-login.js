require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../prisma/generated/client');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@linkpro.id';
  const password = 'password123';
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log('User not found!');
    return;
  }
  
  console.log('User found in DB:', user.email, 'role:', user.role);
  const match = await bcrypt.compare(password, user.password);
  console.log('Password match status:', match);
}

main()
  .catch(e => console.error(e))
  .finally(() => pool.end());
