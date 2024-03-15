<script>
  import Post from "$lib/components/posts/Post.svelte";

  export let data;
</script>

<div class="mt-16 flex w-full justify-center">
  <Post post={data.post} />
</div>
