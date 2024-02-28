import type { Post } from "$lib/types/post.js";
import { getDefaultDate } from "$lib/utils.js";

export async function load({ fetch }) {
  const path = `/api/posts?before=${getDefaultDate().toDate().getTime()}`;

  return {
    postCount: fetch("/api/posts/count").then((r) => r.json().then((r) => r.count as number)),
    posts: fetch(path).then((r) => r.json().then((r) => r.data as Post[])),
    path,
  };
}
