<script>
  import { dev } from "$app/environment";
  import Loadbar from "$lib/components/Loadbar.svelte";
  import Navigation from "$lib/components/nav/Navigation.svelte";
  import { inject } from "@vercel/analytics";
  import "../app.css";

  if (!dev) inject({ mode: "production" });
</script>

<Loadbar />

<Navigation />

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
