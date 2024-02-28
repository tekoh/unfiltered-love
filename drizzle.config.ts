import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "src/lib/server/database/schema.ts",
  out: "./migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
} satisfies Config;
