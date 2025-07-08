import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    
    return stars;
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-6">
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="border-b pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">
                {typeof review.student === 'object' ? review.student.name : 'Student'}
              </h3>
              <div className="flex mt-1">
                {renderStars(review.rating)}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </div>
          </div>
          <p className="mt-3">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;