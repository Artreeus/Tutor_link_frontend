export interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: 'student' | 'tutor' | 'admin';
    bio?: string;
    profilePicture?: string;
    subjects?: string[];
    availability?: {
      day: string;
      slots: {
        startTime: string;
        endTime: string;
      }[];
    }[];
    hourlyRate?: number;
    averageRating?: number;
    totalReviews?: number;
    createdAt: string;
    updatedAt: string;
  }