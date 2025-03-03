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
      className="text-center"
    >
      {/* Main Heading with gradient text */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Reader Reviews
      </h1>
      
      {/* Conditional Rendering of Rating and Reviews */}
      {reviews.length > 0 && (
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex items-center gap-3">
            {/* Display Average Rating */}
            <span className="text-4xl font-semibold text-indigo-600">{average.toFixed(1)}</span>
            <StarRating rating={average} size={24} />
            {/* Reviews Count */}
            <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
          </div>
          {/* Dynamic Title for Reviews */}
          <p className="mt-4 text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            {average >= 4 
              ? "See why readers love 'Elevate Higher' and join the conversation!" 
              : "Discover honest opinions and share your thoughts on 'Elevate Higher'"}
          </p>
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
