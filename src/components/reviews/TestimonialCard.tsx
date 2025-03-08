
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

  return (
    <motion.div
      className="bg-gray-900/90 p-5 rounded-xl h-full flex flex-col min-h-[280px] border border-gray-800 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ReviewAvatar 
        name={review.name} 
        createdAt={review.created_at} 
        verified={review.verified} 
      />
      
      <ReviewRatingStars rating={review.rating} />
      
      <h3 className="text-white font-medium text-lg mb-2">
        {reviewTitle}
        {showEmoji && <span className="ml-2">🤩</span>}
      </h3>
      
      {isNegative ? (
        <p className="text-amber-400 text-sm flex-grow italic">
          This review has been flagged for moderation.
        </p>
      ) : (
        <p className="text-gray-300 text-sm flex-grow">
          {review.content.length > 150 ? `${review.content.substring(0, 150)}... ` : review.content}
          {review.content.length > 150 && (
            <span className="text-blue-400 cursor-pointer hover:underline">read more</span>
          )}
        </p>
      )}
    </motion.div>
  );
};

export default TestimonialCard;
