<script>
  import PostList from "$lib/components/posts/PostList.svelte";
  import { Loader2 } from "lucide-svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let data;

  const count = writable(0);

  onMount(async () => {
    const postCount = await data.postCount;

    $count = postCount;
  });
</script>

<svelte:head>
  <title>unfiltered.love</title>
  <meta name="description" content="Send anonymous and unfiltered love messages" />
</svelte:head>

<div class="flex w-full justify-center">
  <div class="mt-24">
    <h1 class="text-center font-[Caveat] text-7xl uppercase">
      unfiltered<br /><span class="text-9xl">love</span>
    </h1>

    <h2 class="mt-4 text-center text-zinc-700">a collection of anonymous love notes</h2>

    <h3 class="mt-24 text-center text-xl font-medium">
      {#await data.postCount}
        loading love notes..
      {:then}
        {$count.toLocaleString()} love notes found
      {/await}
    </h3>
  </div>
</div>

<div class="mt-4 flex w-full justify-center">
  {#await data.posts}
    <div class="w-fit animate-spin">
      <Loader2 color="#444" size={24} strokeWidth={2.5} />
    </div>
  {:then posts}
    <div class="w-full md:max-w-4xl">
      <PostList {posts} route={data.path} {count} />
    </div>
  {/await}
</div>
