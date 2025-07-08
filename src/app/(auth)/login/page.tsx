'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <LoginContent />;
}

function LoginContent() {
  const { login } = useAuth();
  const router = useRouter();
  const [redirect, setRedirect] = useState('/dashboard');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setRedirect(searchParams.get('redirect') || '/dashboard');
  }, []);

  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      router.push(redirect);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-xl">
        <div className="card-body p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to TutorLink</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
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
            
            <div className="form-control mb-6">
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
              <label className="label">
                <Link href="/forgot-password" className="label-text-alt text-[#4f46e5] hover:underline">
                  Forgot password?
                </Link>
              </label>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`w-full py-3 rounded-lg text-white font-semibold 
                  bg-[#4f46e5] hover:bg-[#4f46e5]/90 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="divider text-gray-500 before:bg-gray-300 after:bg-gray-300 my-6">OR</div>
          
          <p className="text-center text-gray-700">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#FF6636] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}