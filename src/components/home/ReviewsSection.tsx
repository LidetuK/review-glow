
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import ReviewsHeading from '@/components/reviews/ReviewsHeading';
import TestimonialCarousel from '@/components/reviews/TestimonialCarousel';
import ReviewForm from '@/components/reviews/ReviewForm';

interface ReviewsSectionProps {
  reviews: Review[];
  isLoading: boolean;
  onSubmitReview: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
}

const ReviewsSection = ({ reviews, isLoading, onSubmitReview }: ReviewsSectionProps) => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReviewsHeading reviews={reviews} />
        </motion.div>

        <div className="mt-10 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            {/* Review form */}
            <ReviewForm onSubmit={onSubmitReview} />
          </motion.div>
        </div>
      </div>
      
      {/* Full-width testimonial carousel */}
      <div className="w-full overflow-hidden px-4 mt-16">
        <TestimonialCarousel reviews={reviews} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ReviewsSection;
