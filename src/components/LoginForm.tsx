import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormInput } from './FormInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginForm = ({ 
  onSubmit, 
  isLoading 
}: {
  onSubmit: (data: z.infer<typeof loginSchema>) => Promise<void>, 
  isLoading: boolean
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  return (
    <div className="flex-1 flex items-center justify-center p-28 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
      <div className="w-full max-w-[400px]">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-[22px] font-semibold text-[#1f2937]">Health Pay</span>
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">Welcome back to Health Pay</h2>
          <p className="text-[14px] text-[#6b7280]">Log in to your account</p>
        </div>

        {/* Log In Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput id="email" name="Email" type="email" placeholder="email@example.com" register={register} error={errors.email} />
          <FormInput id="password" name="Password" type="password" placeholder="••••••••" register={register} error={errors.password} isPassword />

          <div className="text-right">
            <div
              onClick={() => router.push('./forgot-password')}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              'Log in'
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-[14px] text-[#6b7280]">Don't have an account yet? </span>
            <Link
              href="/signup"
              className="text-[14px] text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </form>

        {/* Back to Landing */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-[14px] text-[#6b7280] hover:text-[#374151] font-medium transition-colors duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
