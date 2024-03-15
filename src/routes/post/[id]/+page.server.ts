import db from "$lib/server/database/drizzle.js";
import { viewsTable } from "$lib/server/database/schema.js";
import type { APIPost } from "$lib/types/post.js";
import { error } from "@sveltejs/kit";
import dayjs from "dayjs";
import { and, eq, gt } from "drizzle-orm";

export async function load({ params, fetch, request, getClientAddress }) {
  const post = await fetch(`/api/post/${params.id.toLowerCase()}`).then(
    (r) => r.json() as Promise<APIPost>,
  );

  if (!post.ok) return error(404, "Not found");

  // console.log(post);

  if (request.headers.get("user-agent")?.toLowerCase().includes("bot")) return { post: post.post };
  return {
    post: post.post,
    _view: (async () => {
      const query = await db
        .select({})
        .from(viewsTable)
        .where(
          and(
            eq(viewsTable.ipAddress, getClientAddress()),
            gt(viewsTable.createdAt, dayjs().subtract(1, "day").toDate()),
          ),
        )
        .limit(1);

      if (query.length === 0)
        db.insert(viewsTable).values({ ipAddress: getClientAddress(), postId: post.post.id });
    })(),
  };
}
