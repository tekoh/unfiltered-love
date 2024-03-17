<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Post as PostType } from "$lib/types/post";
  import { Loader2 } from "lucide-svelte";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { Button } from "../ui/button";
  import Post from "./Post.svelte";

  export let posts: PostType[];
  export let route: string;
  export let count: Writable<number>;

  let more = false;
  let loading = false;
  let search = $page.url.searchParams?.get("search") || "";

  onMount(() => {
    if (posts.length === 30) more = true;
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

  async function findSpecific() {
    const params = new URLSearchParams(route.split("?")[1]);
    if (search === "") params.delete("to");
    else params.set("to", search.toLowerCase());
    if (route.split("?")[1] === params.toString()) return null;
    route = [route.split("?")[0], "?", params.toString()].join("");
    posts = [];

    loadMore();
    $count = await fetch(`/api/posts/count${search ? `?search=${search.toLowerCase()}` : ""}`).then(
      (r) => r.json().then((r) => r.count),
    );

    return null;
  }
</script>

<form class="w-full px-8 md:px-16" on:submit|preventDefault={findSpecific}>
  <div
    class="flex w-full rounded border border-black border-opacity-0 bg-gray-200 duration-200 focus-within:border-opacity-75"
  >
    <input
      class="grow bg-transparent p-2 text-gray-700 focus:outline-none"
      type="text"
      placeholder="Search"
      bind:value={search}
    />
    <button class="p-2 pr-4 font-medium text-gray-900">Find</button>
  </div>
</form>
<div class="min-h-[700px]">
  {#if posts.length > 0}
    <div
      class="mx-auto mt-4 grid w-fit grid-cols-1 items-center justify-center gap-4 md:w-full md:max-w-4xl md:grid-cols-3"
    >
      {#each posts as post}
        <Post {post} />
      {/each}
    </div>
  {:else}
    <!-- DONT DO IT PRETITER I DONT WANT ELSE IF -->
    {#if loading}
      <div class="mt-2 flex w-full justify-center">
        <div class="w-fit animate-spin">
          <Loader2 color="#444" size={24} strokeWidth={2.5} />
        </div>
      </div>
    {:else}
      <p class="mt-2 text-center text-zinc-800">Nothing found ):</p>
      {#if search}
        <div class="flex w-full justify-center">
          <a
            href="/"
            on:click={() => {
              invalidateAll();
            }}
            class=" text-sky-500 underline">View all</a
          >
        </div>
      {/if}
    {/if}
  {/if}

  {#if more}
    <div class="mt-3 flex w-full justify-center">
      {#if loading}
        <Button variant="outline" disabled class="flex gap-2">
          <div class="animate-spin">
            <Loader2 size={12} strokeWidth={2.5} />
          </div>
          <p>Loading...</p>
        </Button>
      {:else}
        <Button on:click={loadMore} variant="outline">Load More</Button>
      {/if}
    </div>
  {/if}
</div>
