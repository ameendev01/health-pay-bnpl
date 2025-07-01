import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';


type FormInputProps = {
  id: "firstName" | "lastName" | "workEmail" | 
  // "phoneNumber" | 
  // "organization" | 
  "password";
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  register: UseFormRegister<{
    password: string;
    firstName: string;
    lastName: string;
    workEmail: string;
    // phoneNumber: string;
    // organization: string;
}>;
  error?: FieldError;          
  isPassword?: boolean;        
};


export const FormInput = ({ 
  id, 
  name, 
  type, 
  placeholder, 
  register,
  error, 
  isPassword 
}: FormInputProps
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-[#374151] mb-2">
        {name}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full h-[44px] px-3 border rounded-lg text-[14px] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-300' : 'border-[#d1d5db] text-black'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-[#6b7280] hover:text-[#374151]" />
            ) : (
              <Eye className="w-5 h-5 text-[#6b7280] hover:text-[#374151]" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-[12px] text-red-600">{error.message}</p>}
    </div>
  );
};
