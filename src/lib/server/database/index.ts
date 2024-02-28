import { DB_URL } from "$env/static/private";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const engine = postgres(DB_URL);

const db = drizzle(engine);

export default db;
