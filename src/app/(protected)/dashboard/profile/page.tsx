'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaDollarSign, FaBook } from 'react-icons/fa';

// Define the base schema first
const baseProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

// Define schema for students (same as base)
const studentProfileSchema = baseProfileSchema;

// Define schema for tutors
const tutorProfileSchema = baseProfileSchema.extend({
  hourlyRate: z.preprocess(
    // Convert string to number for validation
    (val) => (val === '' ? 0 : Number(val)),
    z.number().min(0, 'Hourly rate cannot be negative')
  ),
});

// Create types from schemas
type StudentProfileFormData = z.infer<typeof studentProfileSchema>;
type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const isTutor = user?.role === 'tutor';
  
  // Use the appropriate schema based on user role
  const formSchema = isTutor ? tutorProfileSchema : studentProfileSchema;
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      ...(isTutor && { hourlyRate: 0 }),
    },
  });

  useEffect(() => {
    if (user) {
      // Reset form with user data when it's available
      reset({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        ...(isTutor && { hourlyRate: user.hourlyRate || 0 }),
      });
      
      if (isTutor && user.subjects) {
        setSelectedSubjects(Array.isArray(user.subjects) ? user.subjects : []);
      }
    }
    
    // Fetch subjects if user is a tutor
    if (isTutor) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/subjects');
          setSubjects(response.data.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
          toast.error('Failed to load subjects');
        }
      };
      
      fetchSubjects();
    }
  }, [user, reset, isTutor]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Debug logging
    console.log("Current user object:", user);
    console.log("Is user defined?", !!user);
    console.log("User ID value:", user?._id);
    console.log("User ID type:", typeof user?._id);
    
    try {
      // Ensure we're using the correct user ID
      const userId = user?.id || user?._id;
      
      if (!userId) {
        toast.error('User ID is missing');
        console.error("User ID is missing. Full user object:", user);
        setIsSubmitting(false);
        return;
      }
  
      // Create the appropriate payload based on user role
      const profileData = {
        name: data.name,
        bio: data.bio || '',
        ...(isTutor && {
          hourlyRate: parseFloat(data.hourlyRate),
          subjects: selectedSubjects,
        }),
      };
  
      console.log('Sending profile update:', profileData);
  
      // Update user profile
      await axios.put(`http://localhost:5000/api/users/${userId}`, profileData);
      
      // If user is a tutor, also update tutor-specific profile
      if (isTutor) {
        await axios.put(`http://localhost:5000/api/users/${userId}`, {
          bio: data.bio || '',
          hourlyRate: parseFloat(data.hourlyRate),
          subjects: selectedSubjects,
        });
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center">
                    <FaUser className="mr-2" /> Name
                  </span>
                </label>
                <input 
                  type="text" 
                  className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                  {...register('name')}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name.message as string}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center">
                    <FaEnvelope className="mr-2" /> Email
                  </span>
                </label>
                <input 
                  type="email" 
                  className="input input-bordered"
                  disabled // Email cannot be changed
                  {...register('email')}
                />
              </div>
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea 
                className={`textarea textarea-bordered h-24 ${errors.bio ? 'textarea-error' : ''}`}
                placeholder="Tell us about yourself..."
                {...register('bio')}
              ></textarea>
              {errors.bio && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.bio.message as string}</span>
                </label>
              )}
            </div>
            
            {isTutor && (
              <>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text flex items-center">
                      <FaDollarSign className="mr-2" /> Hourly Rate (USD)
                    </span>
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    className={`input input-bordered ${errors.hourlyRate ? 'input-error' : ''}`}
                    {...register('hourlyRate')}
                  />
                  {errors.hourlyRate && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.hourlyRate.message as string}
                      </span>
                    </label>
                  )}
                </div>
                
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text flex items-center">
                      <FaBook className="mr-2" /> Subjects You Teach
                    </span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subjects.map((subject) => (
                      <label key={subject._id} className="label cursor-pointer justify-start">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-primary mr-2"
                          checked={selectedSubjects.includes(subject._id)}
                          onChange={() => handleSubjectChange(subject._id)}
                        />
                        <span className="label-text">{subject.name} ({subject.gradeLevel})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}