"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

type Stage = 'enter-email' | 'enter-token' | 'reset-password';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  resetToken: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
}).refine(data => {
  if (data.newPassword || data.confirmNewPassword) {
    return data.newPassword === data.confirmNewPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmNewPassword'],
});

const ForgotPasswordPage = () => {
  const [stage, setStage] = useState<Stage>('enter-email');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    if (stage === 'enter-email') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Sending reset link to:', data.email);
      setStage('enter-token');
    } else if (stage === 'enter-token') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Verifying token:', data.resetToken);
      setStage('reset-password');
    } else if (stage === 'reset-password') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Resetting password');
    }
    setIsLoading(false);
  };

  const getButtonText = () => {
    if (isLoading) return 'Processing...';
    if (stage === 'enter-email') return 'Send me reset link';
    if (stage === 'enter-token') return 'Verify Token';
    return 'Reset Password';
  };

  return (
    <div className="flex-1 flex items-center justify-center p-28 lg:p-12 bg-[#fefcf5] mt-5 mr-5 mb-5 rounded-2xl">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold text-[#1f2937] mb-2">Forgot Your Password?</h2>
          <p className="text-[14px] text-[#6b7280]">
            {stage === 'enter-email' && 'Enter your email to receive a password reset link.'}
            {stage === 'enter-token' && 'A reset token has been sent to your email.'}
            {stage === 'reset-password' && 'Enter your new password.'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${stage === 'enter-email' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" placeholder="email@example.com" {...register('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${stage === 'enter-token' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <label htmlFor="resetToken" className="block text-sm font-medium text-gray-700">Reset Token</label>
            <input id="resetToken" type="text" placeholder="Enter your reset token" {...register('resetToken')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            {errors.resetToken && <p className="mt-2 text-sm text-red-600">{errors.resetToken.message}</p>}
          </div>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${stage === 'reset-password' ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700">New Password</label>
                <input id="newPassword" type="password" placeholder="••••••••" {...register('newPassword')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input id="confirmNewPassword" type="password" placeholder="••••••••" {...register('confirmNewPassword')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                {errors.confirmNewPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmNewPassword.message}</p>}
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full h-[44px] bg-[#84cc16] text-white text-[14px] font-medium rounded-lg hover:bg-[#65a30d] disabled:opacity-50 transition-all duration-200 shadow-sm">
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div> : getButtonText()}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center text-[14px] text-[#6b7280] hover:text-[#374151] font-medium transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
