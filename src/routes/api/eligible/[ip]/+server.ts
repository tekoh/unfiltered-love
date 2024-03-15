import { ISR_BYPASS } from "$env/static/private";
import db from "$lib/server/database/drizzle.js";
import { postTable } from "$lib/server/database/schema.js";
import { json } from "@sveltejs/kit";
import dayjs from "dayjs";
import { and, count, eq, gt } from "drizzle-orm";

export const config = {
  isr: {
    expiration: 86400,
    bypassToken: ISR_BYPASS,
  },
};

export async function GET({ params }) {
  const recentlyMade = await db
    .select({ count: count() })
    .from(postTable)
    .where(
      and(
        eq(postTable.createdByIp, params.ip),
        gt(postTable.createdAt, dayjs().set("hours", 0).set("minutes", 0).toDate()),
      ),
    );

  if (recentlyMade[0].count >= 5) return json({ eligible: false });
  return json({ eligible: true });
}
