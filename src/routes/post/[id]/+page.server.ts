import db from "$lib/server/database/drizzle.js";
import { postTable, viewsTable } from "$lib/server/database/schema.js";
import type { APIPost } from "$lib/types/post.js";
import { error, redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import { and, eq, gt } from "drizzle-orm";

export async function load({ params, fetch, request, getClientAddress, locals }) {
  const post = await fetch(`/api/post/${params.id.toLowerCase()}`).then(
    (r) => r.json() as Promise<APIPost>,
  );

  if (!post.ok) return error(404, "Not found");

  // console.log(post);

  if (request.headers.get("user-agent")?.toLowerCase().includes("bot")) return { post: post.post };
  return {
    user: locals.user,
    post: post.post,
    _view: (async () => {
      const [views, ipCheck] = await Promise.all([
        db
          .select({})
          .from(viewsTable)
          .where(
            and(
              eq(viewsTable.postId, post.post.id),
              eq(viewsTable.ipAddress, getClientAddress()),
              gt(viewsTable.createdAt, dayjs().subtract(1, "day").toDate()),
            ),
          )
          .limit(1),
        db
          .select({ ip: postTable.createdByIp })
          .from(postTable)
          .where(eq(postTable.id, post.post.id)),
      ]);

      if (ipCheck[0].ip === getClientAddress()) return;

      if (views.length === 0)
        db.insert(viewsTable).values({ ipAddress: getClientAddress(), postId: post.post.id });
    })(),
  };
}

export const actions = {
  default: async ({ locals, params }) => {
    if (!locals.user) return;
    if (!locals.user.admin) return;

    await db.delete(postTable).where(eq(postTable.id, params.id));

    return redirect(302, "/");
  },
};
