import dayjs from "dayjs";
import { and, count, eq, gt } from "drizzle-orm";
import db from "../database";
import { postTable } from "../database/schema";

export async function isEligible(ip: string) {
  const recentlyMade = await db
    .select({ count: count() })
    .from(postTable)
    .where(
      and(
        eq(postTable.createdByIp, ip),
        gt(postTable.createdAt, dayjs().set("hours", 0).set("minutes", 0).toDate()),
      ),
    );

  if (recentlyMade[0].count >= 5) return false;
  return true;
}
