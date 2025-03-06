import Link from 'next/link';
import { FaStar, FaDollarSign, FaBook } from 'react-icons/fa';
import { User } from '@/types/user';

interface TutorCardProps {
  tutor: User;
}

const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title">{tutor.name}</h2>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500 mr-1" />
              <span>{tutor.averageRating ? tutor.averageRating.toFixed(1) : 'New'}</span>
              <span className="text-sm ml-2">
                ({tutor.totalReviews || 0} {tutor.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <div className="badge badge-lg">
            <FaDollarSign className="mr-1" />
            {tutor.hourlyRate ? `${tutor.hourlyRate}/hr` : 'Rate not set'}
          </div>
        </div>
        
        <p className="mt-4 line-clamp-3">
          {tutor.bio || 'No bio provided.'}
        </p>
        
        {tutor.subjects && tutor.subjects.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold flex items-center">
              <FaBook className="mr-2" /> Subjects
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tutor.subjects.map((subject, index) => (
                <span key={index} className="badge badge-primary">{subject}</span>
              ))}
            </div>
          </div>
        )}
        
        <div className="card-actions justify-end mt-4">
          <Link href={`/tutors/${tutor._id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;