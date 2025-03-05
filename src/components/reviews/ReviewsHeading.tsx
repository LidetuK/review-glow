
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import StarRating from '../StarRating';

interface ReviewsHeadingProps {
  reviews: Review[];
}

const ReviewsHeading = ({ reviews }: ReviewsHeadingProps) => {
  // Calculate average rating
  const average = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-10"
    >
      {/* Main Heading with count and title */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
        {reviews.length}
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2">
        CUSTOMER REVIEWS
      </h2>
      
      {/* Stars */}
      {reviews.length > 0 && (
        <div className="mt-4 flex justify-center">
          <StarRating rating={average} size={20} />
          <span className="ml-2 text-yellow-500 font-medium">{average.toFixed(1)} out of 5.0</span>
          <span className="ml-4 bg-red-500 text-white text-xs px-2 py-1 rounded">WRITE A REVIEW</span>
        </div>
      )}

      {/* Fallback Message if No Reviews */}
      {reviews.length === 0 && (
        <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto">
          There are no reviews yet. Be the first to share your experience!
        </p>
      )}
    </motion.div>
  );
};

export default ReviewsHeading;
