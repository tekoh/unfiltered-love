<script>
  import Navigation from "$lib/components/nav/Navigation.svelte";
  import "../app.css";

  export let data;
</script>

<Navigation user={data.user} />

<div class="min-h-[90vh]">
  <slot />
</div>
<footer class="mt-14 w-full bg-black p-4 text-white">
  <h6 class="text-center font-medium">
    heavily inspired by <a href="https://theunsentproject.com" target="_blank" class="underline"
      >the unsent project</a
    >
  </h6>
</footer>
