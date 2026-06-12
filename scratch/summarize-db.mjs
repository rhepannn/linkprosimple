import { PrismaClient } from '../prisma/generated/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  try {
    const posts = await prisma.affiliatePost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log(`TOTAL POSTS IN DB: ${posts.length}`);
    posts.forEach((p, i) => {
      const firstLine = p.caption.split('\n')[0] || '(No Caption)';
      console.log(`[${i + 1}] ID: ${p.id} | Published: ${p.isPublished} | Created: ${p.createdAt}`);
      console.log(`    First Line: ${firstLine}`);
      console.log(`    Hashtags: ${p.hashtags.join(', ')}`);
    });
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
