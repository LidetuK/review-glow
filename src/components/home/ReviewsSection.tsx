
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import ReviewsList from '@/components/reviews/ReviewsList';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewsHeading from '@/components/reviews/ReviewsHeading';

interface ReviewsSectionProps {
  reviews: Review[];
  isLoading: boolean;
  onSubmitReview: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
}

const ReviewsSection = ({ reviews, isLoading, onSubmitReview }: ReviewsSectionProps) => {
  const [filter, setFilter] = useState<number | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === (filter as number));

  const reviewCounts = {
    all: reviews.length,
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <section className="py-16 bg-black">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReviewsHeading reviews={reviews} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ReviewsList 
                reviews={filteredReviews} 
                isLoading={isLoading} 
                filter={filter} 
                setFilter={setFilter} 
                reviewCounts={reviewCounts}
              />
            </motion.div>
          </div>
          
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ReviewForm onSubmit={onSubmitReview} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
