import db from "$lib/server/database/drizzle.js";
import { postTable } from "$lib/server/database/schema.js";
import type { APIPost } from "$lib/types/post.js";
import { error } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export async function load({ params, fetch, request }) {
  const post = await fetch(`/api/post/${params.id.toLowerCase()}`).then(
    (r) => r.json() as Promise<APIPost>,
  );

  if (!post.ok) return error(404, "Not found");

  if (request.headers.get("user-agent")?.toLowerCase().includes("bot")) return { post: post.post };
  return {
    post: post.post,
    _view: db
      .update(postTable)
      .set({ views: sql`${postTable.views} + 1` })
      .where(eq(postTable.id, post.post.id)),
  };
}
