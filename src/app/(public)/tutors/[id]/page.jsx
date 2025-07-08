'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { User } from '@/types/user';
import { Review } from '@/types/review';
import { Subject } from '@/types/subject';
import ReviewList from '@/components/reviews/ReviewList';
import { FaStar, FaCalendarAlt, FaDollarSign, FaBook } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function TutorProfile({ params  }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        setLoading(true);
        // Fetch tutor details
        const tutorResponse = await axios.get(`/users/${params.id}`);
        setTutor(tutorResponse.data.data);
        
        // Fetch tutor reviews
        const reviewsResponse = await axios.get(`/reviews/tutor/${params.id}`);
        setReviews(reviewsResponse.data.data);
        
        // Fetch subjects if available
        if (tutorResponse.data.data.subjects && tutorResponse.data.data.subjects.length > 0) {
          const subjectsData = await Promise.all(
            tutorResponse.data.data.subjects.map((subjectId) => 
              axios.get(`/subjects/${subjectId}`)
            )
          );
          setSubjects(subjectsData.map((res) => res.data.data));
        }
      } catch (error) {
        console.error('Error fetching tutor data:', error);
        toast.error('Failed to load tutor information');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [params.id]);

  const handleBookSession = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/tutors/${params.id}`);
      return;
    }
    
    if (user?.role !== 'student') {
      toast.error('Only students can book tutoring sessions');
      return;
    }
    
    router.push(`/booking/new?tutor=${params.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tutor Not Found</h1>
        <p>The tutor you're looking for doesn't exist or has been removed.</p>
        <Link href="/tutors" className="btn btn-primary mt-4">
          Browse Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{tutor.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              <FaStar className="text-yellow-500" />
              <span className="ml-1">{tutor.averageRating || 'New'}</span>
            </div>
            <span>•</span>
            <span>{tutor.totalReviews || 0} reviews</span>
          </div>
          
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title">About Me</h2>
              <p>{tutor.bio || 'No bio provided.'}</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title flex items-center">
                <FaBook className="mr-2" />
                Subjects
              </h2>
              
              {subjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject) => (
                    <div key={subject._id} className="bg-base-200 p-4 rounded-lg">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm">Grade: {subject.gradeLevel}</p>
                      <p className="text-sm">Category: {subject.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No subjects listed yet.</p>
              )}
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Reviews</h2>
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>
        
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-8">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaDollarSign />
                <span className="text-2xl font-bold">${tutor.hourlyRate || 'Not set'}/hr</span>
              </div>
              
              <button className="btn btn-primary w-full mb-4" onClick={handleBookSession}>
                Book a Session
              </button>
              
              <div className="mt-6">
                <h3 className="font-bold flex items-center mb-2">
                  <FaCalendarAlt className="mr-2" />
                  Availability
                </h3>
                
                {tutor.availability && tutor.availability.length > 0 ? (
                  <div className="space-y-2">
                    {tutor.availability.map((day, index) => (
                      <div key={index} className="bg-base-200 p-2 rounded">
                        <p className="font-medium">{day.day}</p>
                        <div className="space-y-1 mt-1">
                          {day.slots.map((slot, slotIndex) => (
                            <p key={slotIndex} className="text-sm">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No availability set</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}