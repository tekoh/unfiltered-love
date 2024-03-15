import nanoid from "$lib/nanoid.js";
import { createPost } from "$lib/schema/post";
import { invalidateISR } from "$lib/server/cache.js";
import db from "$lib/server/database/drizzle.js";
import { postTable } from "$lib/server/database/schema.js";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load({ getClientAddress, request, fetch }) {
  const form = await superValidate({ colour: "fff740" }, zod(createPost));

  const eligible = fetch(`/api/eligible/${encodeURIComponent(getClientAddress())}`)
    .then((r) => r.json() as Promise<{ eligible: boolean }>)
    .then((i) => i.eligible);

  if (request.headers.get("user-agent")?.toLowerCase().includes("bot")) {
    return { form, eligible: await eligible };
  }

  return { form, eligible };
}

export const actions = {
  default: async ({ request, getClientAddress, fetch }) => {
    const form = await superValidate(request, zod(createPost));

    console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    const [post] = await db
      .insert(postTable)
      .values({
        text: form.data.text,
        colour: form.data.colour,
        to: form.data.to.toLowerCase(),
        toDisplay: form.data.to,
        createdByIp: getClientAddress(),
        id: nanoid(),
      })
      .returning({ id: postTable.id });

    await invalidateISR(fetch, `/api/eligible/${getClientAddress()}`, `/api/post/${post.id}`);

    return redirect(302, `/post/${post.id}`);
  },
};
