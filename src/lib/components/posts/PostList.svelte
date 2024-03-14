<script lang="ts">
  import type { Post as PostType } from "$lib/types/post";
  import { Loader2 } from "lucide-svelte";
  import { onMount } from "svelte";
  import { Button } from "../ui/button";
  import Post from "./Post.svelte";

  export let posts: PostType[];
  export let route: string;

  let more = false;
  let loading = false;

  onMount(() => {
    if (posts.length === 3) more = true;
  });

  async function loadMore() {
    loading = true;
    const res = await fetch(`${route}&skip=${posts.length}`).then((r) =>
      r.json().then((r) => r.data as PostType[]),
    );
    loading = false;

    posts = [...posts, ...res];

    if (res.length < 30) {
      more = false;
    }
  }
</script>

{#if posts.length > 0}
  <div
    class="grid w-full grid-cols-1 items-center justify-center gap-4 md:max-w-4xl md:grid-cols-3"
  >
    {#each posts as post}
      <Post {post} />
    {/each}
  </div>
{:else}
  <p class="text-center text-zinc-800">Nothing found ):</p>
{/if}

{#if more}
  <div class="mt-3 flex w-full justify-center">
    {#if loading}
      <Button on:click={loadMore} variant="outline">Load More</Button>
    {:else}
      <Button variant="outline" disabled class="flex gap-2">
        <div class="animate-spin">
          <Loader2 size={12} strokeWidth={2.5} />
        </div>
        <p>Loading...</p>
      </Button>
    {/if}
  </div>
{/if}
