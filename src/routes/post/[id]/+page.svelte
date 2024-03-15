<script>
  import { enhance } from "$app/forms";
  import Post from "$lib/components/posts/Post.svelte";
  import { FormButton } from "$lib/components/ui/form";

  export let data;
</script>

<svelte:head>
  <title>love note to {data.post.to} / unfiltered.love</title>
  <meta name="description" content={data.post.text} />
</svelte:head>

<div class="mt-16 flex w-full justify-center">
  <Post post={data.post} />
</div>

<div class="mt-14 flex w-full justify-center">
  {#if data.user?.admin}
    <div class="border border-red-400 p-4 text-red-400">
      <form use:enhance method="post" class="flex w-full justify-center">
        <FormButton variant="destructive">Delete</FormButton>
      </form>
    </div>
  {/if}
</div>
