<script>
  import Navigation from "$lib/components/nav/Navigation.svelte";
  import "../app.css";

  export let data;
</script>

<Navigation user={data.user} />

<slot />
