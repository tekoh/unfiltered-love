import db from "$lib/server/database/drizzle.js";
import { postTable, viewsTable } from "$lib/server/database/schema.js";
import { getDefaultDate } from "$lib/utils.js";
import { json } from "@sveltejs/kit";
import { and, desc, eq, lt, sql } from "drizzle-orm";

export async function GET({ url, setHeaders }) {
  const before = parseInt(url.searchParams.get("before") || "0");
  const skip = parseInt(url.searchParams.get("skip") || "0");
  const to = url.searchParams.get("to");

  const result = await db
    .select({
      id: postTable.id,
      to: postTable.toDisplay,
      text: postTable.text,
      colour: postTable.colour,
      createdAt: postTable.createdAt,
      views: sql<string>`count(${viewsTable.id})`,
    })
    .from(postTable)
    .where(
      to
        ? and(
            lt(postTable.createdAt, before ? new Date(before) : getDefaultDate().toDate()),
            eq(postTable.to, to),
          )
        : lt(postTable.createdAt, before ? new Date(before) : getDefaultDate().toDate()),
    )
    .leftJoin(viewsTable, eq(viewsTable.postId, postTable.id))
    .groupBy(postTable.id)
    .orderBy(desc(postTable.createdAt))
    .limit(30)
    .offset(skip || 0);

  setHeaders({
    "cache-control": "s-maxage=60, stale-while-revalidate",
  });

  return json({ data: result });
}
