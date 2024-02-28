<script>
  export let data;
</script>

<svelte:head>
  <title>unfiltered.love</title>
</svelte:head>

<div class="flex w-full justify-center">
  <div class="mt-24">
    <h1 class="text-center font-[Caveat] text-7xl uppercase">
      unfiltered<br /><span class="text-9xl">love</span>
    </h1>

    <h2 class="mt-4 text-center text-zinc-700">a collection of anonymous love notes</h2>

    <h3 class="mt-24 text-center text-2xl">
      {#await data.postCount}
        loading...
      {:then count}
        {count.toLocaleString()} love notes found
      {/await}
    </h3>
  </div>
</div>
