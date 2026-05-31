import { config } from "dotenv";
config({ path: ".env.local" });
config(); // Fallback to .env
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});

//testes
