"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  code: z
    .string()
    .min(6, { message: "Verification code must be 6 characters long." }),
});

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  async function createForgotPassword(data: z.infer<typeof emailSchema>) {
    if (!isLoaded) return;

    const { email } = data;

    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function resetPassword(data: z.infer<typeof passwordSchema>) {
    // 1) Don’t even start if the form/auth isn’t ready
    if (!isLoaded) return;

    // 2) Pull out what we need
    const { password, code } = data;

    // 3) Try the reset; any thrown error lands below
    const result = await signIn.attemptFirstFactor({
      strategy: "reset_password_email_code",
      code,
      password,
    });

    // 4) Branch on what the server tells us
    if (result.status === "needs_second_factor") {
      // show the 2FA step in our UI
      setSecondFactor(true);
      setError("");
    } else if (result.status === "complete") {
      // they reset successfully – bind session + redirect
      await setActive({ session: result.createdSessionId });
      router.push("/dashboard");
      setError("");
    } else {
      // any weird “not recognized” status
      console.log("Unexpected status:", result);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-28 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-[14px] text-[#6b7280]">
            {!successfulCreation
              ? "Enter your email to receive a password reset link."
              : "A reset token has been sent to your email. Enter it below to reset your password."}
          </p>
        </div>

        {!successfulCreation && (
          <form
            onSubmit={emailForm.handleSubmit(createForgotPassword)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...emailForm.register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {emailForm.formState.errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={emailForm.formState.isSubmitting}
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 transition-all duration-200 shadow-sm"
            >
              {emailForm.formState.isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Send me reset link"
              )}
            </button>
          </form>
        )}

        {successfulCreation && !secondFactor && (
          <form
            onSubmit={passwordForm.handleSubmit(resetPassword)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="Enter your code"
                  {...passwordForm.register("code")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {passwordForm.formState.errors.code && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordForm.formState.errors.code.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {passwordForm.formState.errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 transition-all duration-200 shadow-sm"
            >
              {passwordForm.formState.isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        {secondFactor && (
          <div className="text-center p-4 bg-yellow-100 border border-yellow-300 rounded-md">
            <p className="text-sm text-yellow-800">
              Two-factor authentication is required. This UI does not yet handle
              that flow.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-[14px] text-[#6b7280] hover:text-[#374151] font-medium transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
