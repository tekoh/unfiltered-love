import { ISR_BYPASS } from "$env/static/private";
import db from "$lib/server/database/drizzle.js";
import { postTable } from "$lib/server/database/schema.js";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const config = {
  isr: {
    expiration: 86400,
    bypassToken: ISR_BYPASS,
  },
};

export async function GET({ params }) {
  const [post] = await db
    .select({
      to: postTable.toDisplay,
      text: postTable.text,
      colour: postTable.colour,
      createdAt: postTable.createdAt,
      views: postTable.views,
      id: postTable.id,
    })
    .from(postTable)
    .where(eq(postTable.id, params.id));

  if (!post) return json({ ok: false });
  return json({ ok: true, post });
}
