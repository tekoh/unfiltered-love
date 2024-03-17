<script lang="ts">
  import type { Post } from "$lib/types/post";
  import dayjs from "dayjs";

  export let post: Post;
</script>

<a
  href="/post/{post.id}"
  class="flex h-80 w-72 flex-col rounded border border-black p-2 font-[Caveat] text-3xl shadow-lg duration-100 hover:-translate-y-2"
  style="background-color: #{post.colour || 'fff740'};"
>
  <div class="w-full">
    <p>To: {post.to}</p>
  </div>
  <p class="overflow-ellipsiss mt-4 break-words">{post.text}</p>
  <div class="grow" />
  <p class="-mb-2 text-base">
    Sent on {dayjs(post.createdAt).format("YYYY-MM-DD")}
    <span class="text-zinc-600">({post.views} view{post.views === 1 ? "" : "s"})</span>
  </p>
</a>
