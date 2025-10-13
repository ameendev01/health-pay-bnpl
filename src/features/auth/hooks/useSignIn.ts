"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

type Credentials = { email: string; password: string };

export const useSignInFlow = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async ({ email, password }: Credentials) => {
      if (!isLoaded || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await signIn.create({ identifier: email, password });

        if (res.status === "complete") {
          await setActive({ session: res.createdSessionId });
          const requested = params.get("redirect_url");
          const allowlist = ["/dashboard", "/patients", "/claims", "/clinics", "/settings", "/payments", "/onboarding"];
          let to = "/dashboard";
          if (requested && requested.startsWith("/")) {
            try {
              const parsed = new URL(requested, "http://localhost");
              if (allowlist.some((p) => parsed.pathname.startsWith(p))) {
                to = requested;
              }
            } catch {
              // ignore invalid URL and fallback
            }
          }
          router.replace(to);
          return;
        }

        if (res.status === "needs_second_factor") {
          setError("Two-factor authentication required.");
          return;
        }

        // Fallback for any other intermediate status
        setError("Additional authentication step required.");
      } catch (e: any) {
        const msg =
          e?.errors?.[0]?.longMessage ??
          e?.errors?.[0]?.message ??
          "Login failed.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, isLoading, signIn, setActive, router, params]
  );

  return { onSubmit, isLoading, error };
};
