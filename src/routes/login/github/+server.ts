import { dev } from "$app/environment";
import { github } from "$lib/server/auth.js";
import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";

export async function GET({ cookies }) {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  cookies.set("github_oauth_state", state, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return redirect(302, url.toString());
}
