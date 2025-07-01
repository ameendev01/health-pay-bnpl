import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export const VerifyOtpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (!/^[0-9]$/.test(value) && value !== "") {
      return; // Only allow single digits or empty string
    }

    const currentOtp = inputRefs.current
      .map((ref) => ref?.value || "")
      .join("");
    const newOtpArray = currentOtp.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    setValue("otp", newOtp, { shouldValidate: true });
    setError(null);

    // Move focus to the next input if a digit was entered
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormValues) => {
    console.log("onSubmit triggered with data:", data);
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.otp,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        // This can happen if the code is incorrect or expired
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Error verifying OTP:", JSON.stringify(err, null, 2));
      setError(
        err.errors?.[0]?.longMessage ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      alert("A new OTP has been sent to your email.");
    } catch (err: any) {
      console.error("Error resending OTP:", JSON.stringify(err, null, 2));
      setError(
        err.errors?.[0]?.longMessage ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
      <div className="w-full max-w-[400px]">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-[22px] font-semibold text-[#1f2937]">
            Health Pay
          </span>
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">
            Verify your email
          </h2>
          <p className="text-[14px] text-[#6b7280]">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputRefs.current[index] = el; // side-effect only
                }}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold text-gray-900 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] transition-all duration-200
                  ${errors.otp ? "border-red-500" : "border-gray-300"}
                `}
              />
            ))}
            {/* Hidden input to register the full OTP string with react-hook-form */}
            <input type="hidden" {...register("otp")} />
          </div>
          {errors.otp && (
            <p className="mt-2 text-center text-[12px] text-red-600">
              {errors.otp.message}
            </p>
          )}
          {error && (
            <p className="mt-2 text-center text-[12px] text-red-600">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Resend Code / Back to Login */}
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-[14px] text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend Code
            </button>
            <p className="text-[14px] text-[#6b7280]">
              <Link
                href="/login"
                className="text-[14px] text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
