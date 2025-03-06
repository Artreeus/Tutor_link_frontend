'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TutorDashboard from '@/components/dashboard/TutorDashboard';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If not authenticated, don't render the dashboard
  // The useEffect above will handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {user?.role === 'student' ? (
        <StudentDashboard />
      ) : user?.role === 'tutor' ? (
        <TutorDashboard />
      ) : (
        <div className="text-center py-16">
          <p className="text-xl mb-4">Unknown user role.</p>
          <button 
            className="btn btn-primary"
            onClick={() => router.push('/')}
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}