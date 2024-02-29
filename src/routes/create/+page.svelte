<script lang="ts">
  import { Loader2 } from "lucide-svelte";
  import Form from "./Form.svelte";

  export let data;
</script>

<svelte:head>
  <title>send a love note / unfiltered.love</title>
</svelte:head>

{#await data.eligible}
  <div class="mt-24 flex w-full justify-center">
    <div class="h-fit w-fit animate-spin">
      <Loader2 size={64} />
    </div>
  </div>
{:then eligible}
  {#if eligible}
    <Form formData={data.form} />
  {:else}
    <div class="mt-24 flex w-full justify-center">
      <p class="text-lg font-medium text-red-500">
        unfortunately you are not eligible to send love notes, try again tomorrow
      </p>
    </div>
  {/if}
{/await}
