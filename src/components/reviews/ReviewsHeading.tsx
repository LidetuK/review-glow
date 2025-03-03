
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
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-transparent">
        Reader Reviews
      </h1>
      
      {reviews.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{average.toFixed(1)}</span>
            <StarRating rating={average} size={20} />
            <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>
      )}
      
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Discover what others have to say about "Sell Like Crazy" and share your own experience
      </p>
    </motion.div>
  );
};

export default ReviewsHeading;
