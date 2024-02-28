import db from "$lib/server/database/drizzle";
import { postTable } from "$lib/server/database/schema.js";
import { json } from "@sveltejs/kit";
import { count } from "drizzle-orm";

export async function GET({ setHeaders }) {
  setHeaders({
    "cache-control": "s-maxage=300, stale-while-revalidate",
  });

  const value = await db.select({ value: count() }).from(postTable);

  return json({ count: value[0].value });
}
