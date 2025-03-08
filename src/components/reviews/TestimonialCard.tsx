
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import { ReviewAvatar } from './components/ReviewAvatar';
import { ReviewRatingStars } from './components/ReviewRatingStars';
import { generateReviewTitle, shouldShowEmoji } from './utils/titleGenerator';
import { containsNegativeContent } from './utils/contentFilters';

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard = ({ review }: TestimonialCardProps) => {
  const isNegative = containsNegativeContent(review.content);
  const reviewTitle = generateReviewTitle(review.name);
  const showEmoji = shouldShowEmoji();
  
  // Don't render negative reviews
  if (isNegative) {
    return null;
  }

  return (
    <motion.div
      className="bg-gray-900/90 p-5 rounded-xl h-full flex flex-col min-h-[280px] border border-gray-800 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ReviewRatingStars rating={review.rating} className="mb-4" />
      
      <h3 className="text-white font-medium text-lg mb-3">
        {reviewTitle}
        {showEmoji && <span className="ml-2">🤩</span>}
      </h3>
      
      <p className="text-gray-300 text-sm flex-grow mb-4">
        {review.content.length > 150 ? `${review.content.substring(0, 150)}... ` : review.content}
        {review.content.length > 150 && (
          <span className="text-blue-400 cursor-pointer hover:underline">read more</span>
        )}
      </p>
      
      {/* Avatar and user info moved to the bottom */}
      <div className="mt-auto pt-3 border-t border-gray-800">
        <ReviewAvatar 
          name={review.name} 
          createdAt={review.created_at} 
          verified={review.verified} 
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
