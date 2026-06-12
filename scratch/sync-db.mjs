import fs from 'fs';
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
    const prodPosts = JSON.parse(fs.readFileSync('scratch/prod-posts.json', 'utf8'));
    console.log(`Loaded ${prodPosts.length} posts from production JSON.`);

    const localPosts = await prisma.affiliatePost.findMany();
    const localMap = new Map(localPosts.map(p => [p.id, p]));
    console.log(`Loaded ${localPosts.length} posts from local DB.`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const prod of prodPosts) {
      const local = localMap.get(prod.id);
      
      if (!local) {
        // Create new post in local DB
        await prisma.affiliatePost.create({
          data: {
            id: prod.id,
            imageUrl: prod.imageUrl,
            caption: prod.caption,
            hashtags: prod.hashtags,
            likeCount: prod.likeCount || 0,
            isPublished: prod.isPublished !== false,
            postedBy: prod.postedBy || 'Admin',
            createdAt: new Date(prod.createdAt),
            updatedAt: new Date(prod.updatedAt),
          }
        });
        insertedCount++;
        console.log(`[INSERT] Added post: ${prod.id} - ${prod.caption.substring(0, 30).replace(/\n/g, ' ')}...`);
      } else {
        // Check if there are differences
        const hasDiff = local.imageUrl !== prod.imageUrl ||
                        local.caption !== prod.caption ||
                        JSON.stringify(local.hashtags) !== JSON.stringify(prod.hashtags) ||
                        local.isPublished !== prod.isPublished;
        
        if (hasDiff) {
          await prisma.affiliatePost.update({
            where: { id: prod.id },
            data: {
              imageUrl: prod.imageUrl,
              caption: prod.caption,
              hashtags: prod.hashtags,
              isPublished: prod.isPublished,
              postedBy: prod.postedBy || 'Admin',
              updatedAt: new Date(),
            }
          });
          updatedCount++;
          console.log(`[UPDATE] Updated post: ${prod.id} - ${prod.caption.substring(0, 30).replace(/\n/g, ' ')}...`);
        }
      }
    }

    console.log("=== SYNC COMPLETED ===");
    console.log(`Inserted: ${insertedCount}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Total local posts now: ${(await prisma.affiliatePost.count())}`);

  } catch (err) {
    console.error("ERROR during sync:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
