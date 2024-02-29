import db from "$lib/server/database/index.js";
import { postTable } from "$lib/server/database/schema.js";
import { getDefaultDate } from "$lib/utils.js";
import { json } from "@sveltejs/kit";
import { and, desc, lt, sql } from "drizzle-orm";

export async function GET({ url, setHeaders }) {
  const before = parseInt(url.searchParams.get("before") || "0");
  const skip = parseInt(url.searchParams.get("skip") || "0");
  const to = url.searchParams.get("to");

  const result = await db
    .select({
      id: postTable.id,
      to: postTable.to,
      text: postTable.text,
      colour: postTable.colour,
      createdAt: postTable.createdAt,
    })
    .from(postTable)
    .where(
      to
        ? and(
            lt(postTable.createdAt, before ? new Date(before) : getDefaultDate().toDate()),
            sql`lower(${postTable.to}) = '${to}'`,
          )
        : lt(postTable.createdAt, before ? new Date(before) : getDefaultDate().toDate()),
    )
    .orderBy(desc(postTable.createdAt))
    .limit(30)
    .offset(skip || 0);

  setHeaders({
    "cache-control": "s-maxage=60",
  });

  return json({ data: result });
}
