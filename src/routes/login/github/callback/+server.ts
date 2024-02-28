import { github, lucia } from "$lib/server/auth.js";
import db from "$lib/server/database/drizzle";
import { userTable } from "$lib/server/database/schema.js";
import { error, redirect } from "@sveltejs/kit";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

export async function GET({ cookies, url }) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies.get("github_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) return error(400);

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.githubId, githubUser.id))
      .then((i) => i[0]);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } else {
      const userId = generateId(32);

      // Replace this with your own DB client.
      await db
        .insert(userTable)
        .values({ id: userId, githubId: githubUser.id, username: githubUser.login });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    }
  } catch (e) {
    console.error(e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }

  return redirect(302, "/");
}

interface GitHubUser {
  id: number;
  login: string;
}
