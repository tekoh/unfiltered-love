import { ISR_BYPASS } from "$env/static/private";
import type { Post } from "$lib/types/post.js";
import { getDefaultDate } from "$lib/utils.js";

export const config = {
  isr: {
    expiration: 86400,
    bypassToken: ISR_BYPASS,
  },
};

export async function load({ fetch, request, url }) {
  let path = `/api/posts?before=${getDefaultDate().toDate().getTime()}`;

  if (url.searchParams?.has("search"))
    path += `&to=${url.searchParams.get("search")?.toLowerCase()}`;

  if (request.headers.get("user-agent")?.toLowerCase().includes("bot")) {
    return {
      postCount: await fetch("/api/posts/count").then((r) =>
        r.json().then((r) => r.count as number),
      ),
      posts: await fetch(path).then((r) => r.json().then((r) => r.data as Post[])),
      path,
    };
  }
  return {
    postCount: fetch("/api/posts/count").then((r) => r.json().then((r) => r.count as number)),
    posts: fetch(path).then((r) => r.json().then((r) => r.data as Post[])),
    path,
  };
}
