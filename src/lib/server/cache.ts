import { ISR_BYPASS } from "$env/static/private";

export async function invalidateISR(fetch: typeof globalThis.fetch, ...routes: string[]) {
  for (const route of routes) {
    await fetch(route, {
      method: "head",
      headers: {
        "x-prerender-revalidate": ISR_BYPASS,
      },
    });
  }
}
