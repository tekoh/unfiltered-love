<script lang="ts">
  import { colours } from "$lib";
  import { superForm, type SuperValidated } from "sveltekit-superforms";

  export let formData: SuperValidated<
    {
      to: string;
      text: string;
      colour: string;
    },
    any,
    {
      to: string;
      text: string;
      colour: string;
    }
  >;

  const { form, errors, enhance, delayed, constraints } = superForm(formData, { delayMs: 250 });
</script>

<div class="flex w-full justify-center">
  <div class="mt-24 w-full md:max-w-lg">
    <h1 class="text-center text-3xl font-medium">send a love note</h1>

    <form class="flex w-full flex-col gap-4 md:flex-row" method="post" use:enhance>
      <div
        class="flex h-80 w-80 flex-col rounded border border-black p-1 font-[Caveat] text-3xl shadow-lg"
        style="background-color: #{$form.colour};"
      >
        <div class="w-full">
          <p>
            To: <input
              type="text"
              name="to"
              style="background-color: #{$form.colour};"
              placeholder="recipient"
              bind:value={$form.to}
              {...$constraints.to}
            />
          </p>
        </div>
        <textarea
          class="mt-4 h-full resize-none"
          style="background-color: #{$form.colour};"
          name="text"
          placeholder="i love you"
          bind:value={$form.text}
          {...$constraints.text}
        />
      </div>

      <div class="mt-4 grid h-fit grid-cols-3 gap-2">
        {#each colours as colour}
          <input
            class="radio-button"
            value={colour}
            type="radio"
            name="colour"
            bind:group={$form.colour}
          />
        {/each}
      </div>
    </form>
  </div>
</div>

<style>
  input,
  textarea {
    @apply focus:outline-none;
  }
</style>
