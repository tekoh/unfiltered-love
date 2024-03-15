<script>
  import Post from "$lib/components/posts/Post.svelte";

  export let data;
</script>

<svelte:head>
  <title>love note to {data.post.to} / unfiltered.love</title>
  <meta name="description" content={data.post.text} />
</svelte:head>

<div class="mt-16 flex w-full justify-center">
  <Post post={data.post} />
</div>
