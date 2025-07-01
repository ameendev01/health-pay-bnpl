import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormInput } from './FormInput';
import Link from 'next/link';

const signUpSchema = z.object({
  firstName:  z.string().min(1, 'First name is required'),
  lastName:   z.string().min(1, 'Last name is required'),
  workEmail:  z.string().email('Please enter a valid email address'),
  // phoneNumber:z.string().min(1, 'Phone number is required'),
  // organization: z.string().min(1, 'Organization is required'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=\S+$).{8,}$/,
      'Password must include 1 uppercase, 1 lowercase, 1 special character, and contain no spaces'
    )
});

export type signUpFormDataType = z.infer<typeof signUpSchema>;

export const SignUpForm = (
  { onSubmit, isLoading }: {
    onSubmit: (data: signUpFormDataType) => Promise<void>;
    isLoading: boolean;
  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return (
    // Outer container
    <div className="flex-1 flex items-center justify-center p-28 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
      <div className="w-full max-w-[400px]">
        {/* Logo and App Name (Mobile) */}
        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-[22px] font-semibold text-[#1f2937]">Health Pay</span>
        </div>
        {/* Heading and Description */}
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">Get started with Health Pay</h2>
          <p className="text-[14px] text-[#6b7280]">See how Health Pay can revolutionize your pharmacy operations</p>
        </div>
        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput id="firstName" name="First Name" type="text" placeholder="John" register={register} error={errors.firstName} />
            <FormInput id="lastName" name="Last Name" type="text" placeholder="Doe" register={register} error={errors.lastName} />
          </div>
          {/* Email Field */}
          <FormInput id="workEmail" name="Work Email" type="email" placeholder="email@example.com" register={register} error={errors.workEmail} />
          {/* Phone Number Field */}
          {/* <FormInput id="phoneNumber" name="Phone Number" type="tel" placeholder="(   )   -" register={register} error={errors.phoneNumber} /> */}
          {/* Organization Field */}
          {/* <FormInput id="organization" name="Organization" type="text" placeholder="Acme Inc" register={register} error={errors.organization} /> */}
          {/* Password Field */}
          <FormInput id="password" name="Password" type="password" placeholder="••••••••" register={register} error={errors.password} isPassword />

          <div id="clerk-captcha"></div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              // Loading Spinner
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create My Account'
            )}
          </button>
          {/* Login Link */}
          <div className="text-center">
            <span className="text-[14px] text-[#6b7280]">Already have an account? </span>
            <Link
              href="/login"
              className="text-[14px] text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
