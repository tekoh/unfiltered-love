import db from "$lib/server/database/drizzle";
import { postTable } from "$lib/server/database/schema.js";
import { json } from "@sveltejs/kit";
import { count, eq } from "drizzle-orm";

export async function GET({ setHeaders, url }) {
  setHeaders({
    "cache-control": "s-maxage=300, stale-while-revalidate",
  });

  let query = db.select({ value: count() }).from(postTable).$dynamic();

  if (url.searchParams.has("search")) {
    query = query.where(eq(postTable.to, url.searchParams.get("search")!));
  }

  return json({ count: (await query)[0].value });
}
