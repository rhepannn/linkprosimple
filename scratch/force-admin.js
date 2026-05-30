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
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Super Admin'
    }
  });
  
  console.log('Force updated admin password successfully!');
  console.log('Email:', user.email);
  console.log('New role:', user.role);
}

main()
  .catch(e => console.error(e))
  .finally(() => pool.end());
