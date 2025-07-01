"use client";

import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  // The `useSession()` hook is used to get the Clerk session object
  // The session object is used to get the Clerk session token
  const { session } = useSession();

  // Create a custom Supabase client that injects the Clerk session token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      }
    );
  }

  // Create a `client` object for accessing Supabase data using the Clerk token
  const supabase = createClerkSupabaseClient();

  return { supabase, session };
};