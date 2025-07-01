import { signUpFormDataType } from "@/components/SignUpForm";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignUpFlow = () => {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: signUpFormDataType) => {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.workEmail,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/verify-email");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
