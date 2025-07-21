"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Stage = "enter-email" | "enter-otp" | "reset-password";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [stage, setStage] = useState<Stage>("enter-email");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  async function handleEmailSubmit(data: z.infer<typeof emailSchema>) {
    if (!isLoaded) return;

    const { email } = data;

    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setStage("enter-otp");
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function handleOtpSubmit() {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setStage("reset-password");
    setError("");
  }

  async function handlePasswordReset(data: z.infer<typeof passwordSchema>) {
    if (!isLoaded) return;

    const { password } = data;

    const result = await signIn.attemptFirstFactor({
      strategy: "reset_password_email_code",
      code: otp,
      password,
    });

    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId });
      router.push("/dashboard");
      setError("");
    } else {
      console.log("Unexpected status:", result);
      setError("An unexpected error occurred. Please try again.");
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
            {stage === "enter-email" &&
              "Enter your email to receive a password reset link."}
            {stage === "enter-otp" &&
              "A reset token has been sent to your email."}
            {stage === "reset-password" && "Enter your new password."}
          </p>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            stage === "enter-email"
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
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
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-none cursor-pointer transition-all duration-200 shadow-sm"
            >
              {emailForm.formState.isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Send me reset link"
              )}
            </button>
          </form>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            stage === "enter-otp"
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-6">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <button
              onClick={handleOtpSubmit}
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-none cursor-pointer transition-all duration-200 shadow-sm"
            >
              Confirm OTP
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            stage === "reset-password"
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordReset)}
            className="space-y-6"
          >
            <div className="space-y-4">
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("confirmPassword")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-none cursor-pointer transition-all duration-200 shadow-sm"
            >
              {passwordForm.formState.isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>

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
