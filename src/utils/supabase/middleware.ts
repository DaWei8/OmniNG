import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const createClient = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  // This refreshes the session if needed.
  const { error } = await supabase.auth.getUser();

  // If we encounter a refresh token error, we typically want to clear the session so the user
  // isn't stuck in a loop with a bad token.
  if (error && (error.code === 'refresh_token_already_used' || error.message.includes('Already Used'))) {
    console.warn("Detected invalid refresh token. Clearing session.");
    await supabase.auth.signOut();
  }

  return supabaseResponse;
};
