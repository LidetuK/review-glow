
import { Progress } from '@/components/ui/progress';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Review } from '@/types/review';

interface ReviewStatsProps {
  reviews: Review[];
  onWriteReview?: () => void;
  className?: string;
}

const ReviewStats = ({ reviews, onWriteReview, className }: ReviewStatsProps) => {
  // Calculate stats from reviews array
  const total = reviews.length;
  const average = total > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / total 
    : 0;
  
  // Calculate distribution
  const distribution = [0, 0, 0, 0, 0]; // [5-star, 4-star, 3-star, 2-star, 1-star]
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[5 - review.rating]++;
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-center md:border-r md:pr-6 pb-4 md:pb-0">
            <h3 className="text-3xl font-bold">{average.toFixed(1)}</h3>
            <StarRating rating={average} size={24} className="justify-center my-2" />
            <p className="text-sm text-muted-foreground">{total} reviews</p>
          </div>
          
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center w-12">
                  <span className="text-sm font-medium">{star}</span>
                  <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                </div>
                <Progress 
                  value={distribution[5 - star] / total * 100 || 0} 
                  className="h-2 flex-1 bg-gray-100" 
                />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {distribution[5 - star]}
                </span>
              </div>
            ))}
          </div>
          
          {onWriteReview && (
            <div className="md:border-l md:pl-6">
              <Button 
                onClick={onWriteReview}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Write a Review
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStats;
