'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  role: z.enum(['student', 'tutor']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [roleParam, setRoleParam] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
    }
  });

  const role = watch('role');

  useEffect(() => {
    // Client-side parsing of search params
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    
    if (role === 'student' || role === 'tutor') {
      setRoleParam(role);
      setValue('role', role);
    }
  }, [setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, data.role);
      router.push('/dashboard');
    } catch (error) {
      // Error is already handled in the auth context with toast
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50 to-orange-100 py-8 px-4">
      <div className="w-full max-w-md">
        {/* Header with animated gradient */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-[#FF6636] to-orange-500 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Join Us</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Main card with glass effect */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#FF6636]">
                Full Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-gray-400
                    ${errors.name 
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#FF6636] focus:ring-4 focus:ring-[#FF6636]/20 hover:border-gray-300'}`}
                  {...register('name')}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#FF6636]">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-gray-400
                    ${errors.email 
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#FF6636] focus:ring-4 focus:ring-[#FF6636]/20 hover:border-gray-300'}`}
                  {...register('email')}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#FF6636]">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Create a strong password" 
                  className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-gray-400
                    ${errors.password 
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#FF6636] focus:ring-4 focus:ring-[#FF6636]/20 hover:border-gray-300'}`}
                  {...register('password')}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#FF6636]">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Confirm your password" 
                  className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-gray-400
                    ${errors.confirmPassword 
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#FF6636] focus:ring-4 focus:ring-[#FF6636]/20 hover:border-gray-300'}`}
                  {...register('confirmPassword')}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            
            {/* Role Selection */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                  role === 'student' 
                    ? 'border-[#FF6636] bg-[#FF6636]/5 shadow-lg' 
                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
                }`}>
                  <input 
                    type="radio" 
                    className="sr-only" 
                    value="student"
                    {...register('role')}
                  />
                  <div className="text-center">
                    <svg className={`w-6 h-6 mx-auto mb-2 ${role === 'student' ? 'text-[#FF6636]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className={`text-sm font-medium ${role === 'student' ? 'text-[#FF6636]' : 'text-gray-600'}`}>Student</span>
                  </div>
                  {role === 'student' && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-4 h-4 text-[#FF6636]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
                
                <label className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                  role === 'tutor' 
                    ? 'border-[#FF6636] bg-[#FF6636]/5 shadow-lg' 
                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
                }`}>
                  <input 
                    type="radio" 
                    className="sr-only" 
                    value="tutor"
                    {...register('role')}
                  />
                  <div className="text-center">
                    <svg className={`w-6 h-6 mx-auto mb-2 ${role === 'tutor' ? 'text-[#FF6636]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className={`text-sm font-medium ${role === 'tutor' ? 'text-[#FF6636]' : 'text-gray-600'}`}>Tutor</span>
                  </div>
                  {role === 'tutor' && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-4 h-4 text-[#FF6636]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FF6636] to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Create Account</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-gray-500 font-medium">Already have an account?</span>
            </div>
          </div>
          
          {/* Login Link */}
          <div className="text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center text-[#FF6636] hover:text-orange-500 font-semibold transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}