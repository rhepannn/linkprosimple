import { PrismaClient } from '../prisma/generated/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const connectionString = process.env.DATABASE_URL;
console.log('Connecting to:', connectionString ? connectionString.replace(/:[^:@]+@/, ':***@') : 'undefined');

const pool = new pg.Pool({ 
  connectionString,
  connectionTimeoutMillis: 5000 
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

try {
  const result = await prisma.product.findMany({ take: 3 });
  console.log('Success! Found products:', result.length);
  console.log(result);
} catch (e) {
  console.error('Error querying:', e);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
