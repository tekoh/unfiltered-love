<script lang="ts">
  import logo from "$lib/assets/images/logo_black.png?as=run:0";
  import { Button } from "$lib/components/ui/button";
  import Img from "@zerodevx/svelte-img";
</script>

<nav class="flex w-full justify-center px-4">
  <div class="flex h-24 w-full max-w-3xl items-center uppercase">
    <a href="/">
      <Img src={logo} class="h-16 w-auto" alt="logo" />
    </a>

    <div class="grow" />

    <Button href="/create">create</Button>
  </div>
</nav>
