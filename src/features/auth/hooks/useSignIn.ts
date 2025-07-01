import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignInFlow = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.create({ 
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        // Handle other statuses, e.g., MFA required
        console.log(result);
      }
    } catch (err: any) {
      console.error("Error signing in:", JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.longMessage || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, error };
};
