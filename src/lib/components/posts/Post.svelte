<script lang="ts">
  import type { Post } from "$lib/types/post";
  import dayjs from "dayjs";

  export let post: Post;
</script>

<a
  href="/post/{post.id}"
  class="flex h-80 flex-col rounded border border-black p-1 font-[Caveat] text-3xl shadow-lg duration-100 hover:-translate-y-2"
  style="background-color: #{post.colour || 'fff740'};"
>
  <div class="w-full">
    <p>To: {post.to}</p>
  </div>
  <p class="mt-4">{post.text}</p>
  <div class="grow" />
  <p class="text-base">Sent on {dayjs(post.createdAt).format("YYYY-MM-DD")}</p>
</a>
