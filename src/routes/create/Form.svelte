<script lang="ts">
  import { colours } from "$lib";
  import { FormButton } from "$lib/components/ui/form";
  import { Loader2 } from "lucide-svelte";
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
  <div class="mt-24 w-full md:max-w-xl">
    <h1 class="text-center text-3xl font-medium">Send a Love Note</h1>

    <form class="mt-8 w-full" method="post" use:enhance>
      <div class="w-full md:flex md:flex-row md:gap-4">
        <div
          class="mx-auto flex h-80 w-72 flex-col rounded border border-black p-1 font-[Caveat] text-3xl shadow-lg md:mx-0"
          style="background-color: #{$form.colour};"
        >
          <div class="w-full overflow-hidden">
            <p class="flex gap-2">
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

        <div>
          <div class="mx-auto h-fit w-fit md:w-full">
            <div class="mt-4 grid h-fit w-fit grid-cols-3 gap-2 md:gap-4">
              {#each colours as colour}
                <button
                  style="background-color: #{colour};"
                  class="h-12 w-12 rounded border border-black duration-200 {$form.colour === colour
                    ? 'border-4 shadow'
                    : 'border'}"
                  on:click|preventDefault={() => {
                    $form.colour = colour;
                  }}
                />
                <input
                  class="hidden"
                  value={colour}
                  type="radio"
                  name="colour"
                  bind:group={$form.colour}
                />
              {/each}
            </div>
          </div>

          <div class="mx-auto mt-8 flex w-fit items-center gap-2 text-sm">
            <input type="checkbox" name="terms" id="terms" required />
            <label class="break-words" for="terms">I agree to the terms of submission</label>
          </div>

          {#if Object.entries($errors).length > 0}
            {@const [title, error] = Object.entries($errors)[0]}
            <h3 class="font-semibold text-red-500">{title}</h3>
            <p class="text-sm text-red-500">{error}</p>
          {/if}

          <div class="flex w-full justify-center md:block">
            {#if $delayed}
              <FormButton disabled class=" mt-4 flex items-center gap-2">
                <p>Submit</p>

                <div class="w-fit animate-spin">
                  <Loader2 size={16} strokeWidth={2.7} />
                </div>
              </FormButton>
            {:else}
              <FormButton class="mt-4">Submit</FormButton>
            {/if}
          </div>
        </div>
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
