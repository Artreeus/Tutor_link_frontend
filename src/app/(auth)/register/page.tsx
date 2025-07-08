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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-xl">
        <div className="card-body p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700">Full Name</span>
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                  ${errors.name 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30'}`}
                {...register('name')}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.name.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                  ${errors.email 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30'}`}
                {...register('email')}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.email.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                  ${errors.password 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30'}`}
                {...register('password')}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.password.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700">Confirm Password</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                  ${errors.confirmPassword 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30'}`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-700">I want to register as</span>
              </label>
              <div className="flex gap-4">
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="radio" 
                    className="accent-[#4f46e5]" 
                    value="student"
                    checked={role === 'student'}
                    {...register('role')}
                  />
                  <span className="label-text text-gray-700">Student</span>
                </label>
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="radio" 
                    className="accent-[#FF6636]" 
                    value="tutor"
                    checked={role === 'tutor'}
                    {...register('role')}
                  />
                  <span className="label-text text-gray-700">Tutor</span>
                </label>
              </div>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`w-full py-3 rounded-lg text-white font-semibold 
                  ${role === 'student' ? 'bg-[#4f46e5] hover:bg-[#4f46e5]/90' : 'bg-[#FF6636] hover:bg-[#FF6636]/90'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Register'}
              </button>
            </div>
          </form>
          
          <div className="divider text-gray-500 before:bg-gray-300 after:bg-gray-300 my-6">OR</div>
          
          <p className="text-center text-gray-700">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4f46e5] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}