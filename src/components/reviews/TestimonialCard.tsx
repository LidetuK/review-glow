
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Review } from '@/types/review';
import { ReviewAvatar } from './components/ReviewAvatar';
import { shouldShowEmoji } from './utils/titleGenerator';
import { containsNegativeContent } from './utils/contentFilters';
import { BadgeCheck } from 'lucide-react';

interface TestimonialCardProps {
  review: Review;
}

const ReviewRatingStars = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  return (
    <div className="flex text-yellow-400 mb-4">
      {[...Array(maxStars)].map((_, index) => (
        <span key={index} className="text-xl">
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const TestimonialCard = ({ review }: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isNegative = containsNegativeContent(review.content);
  const showEmoji = shouldShowEmoji();

  // Don't render negative reviews
  if (isNegative) {
    return null;
  }

  // Handle the read more functionality
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayContent = isExpanded 
    ? review.content 
    : review.content.length > 150 
      ? `${review.content.substring(0, 150)}...` 
      : review.content;

  return (
    <motion.div
      className="bg-gray-900/90 p-5 rounded-xl h-full flex flex-col min-h-[280px] border border-gray-800 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <ReviewRatingStars rating={review.rating} />

      <p className="text-gray-300 text-sm flex-grow mb-2">
        {displayContent}
        {review.content.length > 150 && (
          <span 
            className="text-blue-400 cursor-pointer hover:underline ml-1"
            onClick={toggleReadMore}
          >
            {isExpanded ? 'show less' : 'read more'}
          </span>
        )}
      </p>

      {/* Avatar + Name with Verification Icon */}
      <div className="mt-2 pt-2 border-t border-gray-800 flex items-center gap-3">
        <ReviewAvatar name={review.name} createdAt={review.created_at} verified={review.verified} />
        {review.verified && (
          <div className="flex items-center">
            <BadgeCheck className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <span className="text-blue-400 text-xs font-medium ml-1">Verified Reviewer</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
