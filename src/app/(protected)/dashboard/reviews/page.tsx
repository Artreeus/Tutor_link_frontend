"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  student: any;
  tutor: any;
  booking: any;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/reviews');
      return;
    }

    const fetchReviews = async () => {
      try {
        let url = 'https://tutor-backend-delta.vercel.app/api/reviews';
        
        // If user is a tutor, get only their reviews
        if (user?.role === 'tutor' && user?._id) {
          url = `https://tutor-backend-delta.vercel.app/api/reviews/tutor/${user._id}`;
        }
        
        const response = await axios.get(url);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [isAuthenticated, user, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper to render star rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user?.role === 'tutor' ? 'My Reviews' : 'Reviews I\'ve Left'}
      </h1>
      
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h2 className="card-title">
                      {user?.role === 'tutor' 
                        ? `Review from ${typeof review.student === 'object' && review.student ? review.student.name : 'Student'}`
                        : `Review for ${typeof review.tutor === 'object' && review.tutor ? review.tutor.name : 'Tutor'}`}
                    </h2>
                    <div className="flex mt-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-sm opacity-70">
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                
                <p className="mt-4">{review.comment}</p>
                
                {typeof review.booking === 'object' && review.booking && (
                  <div className="mt-4 text-sm">
                    <div className="badge badge-outline">
                      {typeof review.booking.subject === 'object' && review.booking.subject
                        ? review.booking.subject.name
                        : 'Subject'}
                    </div>
                    <span className="ml-2">
                      Session on {formatDate(review.booking.date)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-16">
            <h2 className="card-title justify-center mb-4">No Reviews Yet</h2>
            <p>
              {user?.role === 'tutor' 
                ? "You haven't received any reviews yet. Keep providing great service!"
                : "You haven't left any reviews yet. After completing a session, you can leave a review for your tutor."}
            </p>
            {user?.role === 'student' && (
              <div className="mt-6">
                <button 
                  className="btn btn-primary"
                  onClick={() => router.push('/dashboard/bookings')}
                >
                  View My Bookings
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}