"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating cannot exceed 5'),
  comment: z.string().min(5, 'Comment is too short').max(500, 'Comment cannot exceed 500 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

function NewReviewContent() {
  // Get booking ID from query parameters
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking');
  
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const ratingValue = watch('rating');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/reviews/new');
      return;
    }

    if (user?.role !== 'student') {
      toast.error('Only students can leave reviews');
      router.push('/dashboard');
      return;
    }

    if (!bookingId) {
      toast.error('No booking specified');
      router.push('/dashboard/bookings');
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await axios.get(`https://tutor-backend-delta.vercel.app/api/bookings/${bookingId}`);
        const bookingData = response.data.data;

        // Verify booking status
        if (bookingData.status !== 'completed') {
          toast.error('You can only review completed bookings');
          router.push('/dashboard/bookings');
          return;
        }

        // Verify booking belongs to current user
        if (typeof bookingData.student === 'object' && bookingData.student._id !== user?._id) {
          toast.error('You can only review your own bookings');
          router.push('/dashboard/bookings');
          return;
        }

        setBooking(bookingData);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to load booking information');
        router.push('/dashboard/bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, isAuthenticated, user, router]);

  const handleRatingClick = (rating: number) => {
    setValue('rating', rating);
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!booking) return;

    setSubmitting(true);

    try {
      await axios.post('https://tutor-backend-delta.vercel.app/api/reviews', {
        booking: booking._id,
        rating: data.rating,
        comment: data.comment,
      });

      toast.success('Review submitted successfully');
      router.push('/dashboard/bookings');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Not Found</h1>
        <p>The booking you're trying to review doesn't exist or has been removed.</p>
        <button 
          className="btn btn-primary mt-4"
          onClick={() => router.push('/dashboard/bookings')}
        >
          Go to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Leave a Review</h1>
      
      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title mb-4">
            Review your session with {typeof booking.tutor === 'object' && booking.tutor
              ? booking.tutor.name 
              : 'your tutor'}
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="flex justify-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-3xl cursor-pointer ${
                        star <= (hoveredRating || ratingValue) 
                          ? 'text-yellow-500' 
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  ))}
                </div>
              </div>
              {errors.rating && (
                <label className="label justify-center">
                  <span className="label-text-alt text-error">{errors.rating.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea 
                className={`textarea textarea-bordered h-32 ${errors.comment ? 'textarea-error' : ''}`}
                placeholder="Share your experience with this tutor..."
                {...register('comment')}
              ></textarea>
              {errors.comment && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.comment.message as string}</span>
                </label>
              )}
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                className="btn btn-ghost"
                onClick={() => router.push('/dashboard/bookings')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                disabled={submitting || ratingValue === 0}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function NewReview() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }>
      <NewReviewContent />
    </Suspense>
  );
}