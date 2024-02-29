import { createPost } from "$lib/schema/post";
import { isEligible } from "$lib/server/functions/eligible.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load({ getClientAddress }) {
  const form = await superValidate({ colour: "fff740" }, zod(createPost));

  return { form, eligible: isEligible(getClientAddress()) };
}
