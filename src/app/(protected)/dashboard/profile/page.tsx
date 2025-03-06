'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaDollarSign, FaBook } from 'react-icons/fa';

// Define different schema based on user role
const baseProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

const tutorProfileSchema = baseProfileSchema.extend({
  hourlyRate: z.number().min(0, 'Hourly rate cannot be negative'),
  subjects: z.array(z.string()).optional(),
  availability: z.array(z.object({
    day: z.string(),
    slots: z.array(z.object({
      startTime: z.string(),
      endTime: z.string(),
    })),
  })).optional(),
});

type BaseProfileFormData = z.infer<typeof baseProfileSchema>;
type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const isTutor = user?.role === 'tutor';
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BaseProfileFormData | TutorProfileFormData>({
    resolver: zodResolver(isTutor ? tutorProfileSchema : baseProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      ...(isTutor && {
        hourlyRate: user?.hourlyRate || 0,
      }),
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('bio', user.bio || '');
      console.log(user)
      
      if (isTutor) {
        setValue('hourlyRate', user.hourlyRate || 0);
        setSelectedSubjects(user.subjects || []);
      }
    }
    
    // Fetch subjects if user is a tutor
    if (isTutor) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get('/subjects');
          setSubjects(response.data.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
          toast.error('Failed to load subjects');
        }
      };
      
      fetchSubjects();
    }
  }, [user, setValue, isTutor]);

  const onSubmit = async (data: BaseProfileFormData | TutorProfileFormData) => {
    console.log('User ID:', user?._id); // Confirm the ID
    setIsSubmitting(true);
    
    try {
      // Ensure we're using the correct user ID
      const userId = user?._id;
      
      if (!userId) {
        toast.error('User ID is missing');
        return;
      }
  
      const profileData = {
        ...(isTutor ? {
          name: data.name,
          email: data.email,
          bio: data.bio,
          hourlyRate: (data as TutorProfileFormData).hourlyRate,
          subjects: selectedSubjects,
          availability: (data as TutorProfileFormData).availability
        } : {
          name: data.name,
          email: data.email,
          bio: data.bio
        })
      };
  
      console.log('Sending profile update:', {
        userId,
        profileData
      });
  
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, profileData);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Full error details:', {
          response: error.response,
          message: error.message,
          config: error.config
        });
        
        toast.error(
          error.response?.data?.message || 
          'Failed to update profile'
        );
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
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
                    <span className="label-text-alt text-error">{errors.name.message}</span>
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
                  className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                  disabled // Email cannot be changed
                  {...register('email')}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email.message}</span>
                  </label>
                )}
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
                  <span className="label-text-alt text-error">{errors.bio.message}</span>
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
                    {...register('hourlyRate', { valueAsNumber: true })}
                  />
                  {errors.hourlyRate && (
                    <label className="label">
                      <span className="label-text-alt text-error">{(errors as any).hourlyRate.message}</span>
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
                
                {/* Availability section would go here - more complex UI */}
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