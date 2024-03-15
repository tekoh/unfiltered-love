import { ISR_BYPASS } from "$env/static/private";
import db from "$lib/server/database/drizzle.js";
import { postTable, viewsTable } from "$lib/server/database/schema.js";
import { json } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export const config = {
  isr: {
    expiration: 86400,
    bypassToken: ISR_BYPASS,
  },
};

export async function GET({ params }) {
  const [post] = await db
    .select({
      id: postTable.id,
      to: postTable.toDisplay,
      text: postTable.text,
      createdAt: postTable.createdAt,
      colour: postTable.colour,
      views: sql<string>`count(${viewsTable.id})`,
    })
    .from(postTable)
    .where(eq(postTable.id, params.id))
    .leftJoin(viewsTable, eq(viewsTable.postId, postTable.id))
    .groupBy(postTable.id);

  // console.log(post);

  if (!post) return json({ ok: false });
  return json({ ok: true, post });
}
