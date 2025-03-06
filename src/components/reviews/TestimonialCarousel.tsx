
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Review } from '@/types/review';
import TestimonialCard from './TestimonialCard';

interface TestimonialCarouselProps {
  reviews: Review[];
  isLoading: boolean;
}

const TestimonialCarousel = ({ reviews, isLoading }: TestimonialCarouselProps) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const topRowControls = useAnimation();
  const bottomRowControls = useAnimation();
  
  // Number of cards to show based on viewport
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;  // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3; // Default for SSR
  };
  
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  
  // Split reviews evenly for top and bottom rows
  const splitReviews = () => {
    if (!reviews.length) return { topRow: [], bottomRow: [] };
    
    const midpoint = Math.ceil(reviews.length / 2);
    return {
      topRow: reviews.slice(0, midpoint),
      bottomRow: reviews.slice(midpoint)
    };
  };
  
  const { topRow, bottomRow } = splitReviews();
  
  // Duplicate reviews to create seamless infinite scroll effect
  const duplicateReviews = (rowReviews: Review[]) => {
    return [...rowReviews, ...rowReviews];
  };
  
  const topRowReviews = duplicateReviews(topRow);
  const bottomRowReviews = duplicateReviews(bottomRow);
  
  // Calculate the width of each row based on card width
  const getRowWidth = (rowReviews: Review[]) => {
    const cardWidth = 100 / cardsToShow; // percentage width of each card
    return cardWidth * rowReviews.length / 2; // divide by 2 because we're showing half the duplicated array
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up the animation for continuous scrolling
  useEffect(() => {
    if (topRow.length && bottomRow.length) {
      // Animate top row from right to left
      const topRowAnimation = async () => {
        const topRowWidth = getRowWidth(topRowReviews);
        
        await topRowControls.start({
          x: `-${topRowWidth}%`,
          transition: {
            duration: topRow.length * 10, // duration based on number of cards
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      // Animate bottom row from left to right
      const bottomRowAnimation = async () => {
        const bottomRowWidth = getRowWidth(bottomRowReviews);
        
        await bottomRowControls.start({
          x: `${bottomRowWidth}%`,
          transition: {
            duration: bottomRow.length * 10, // duration based on number of cards
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      topRowAnimation();
      bottomRowAnimation();
    }
  }, [topRow.length, bottomRow.length, cardsToShow]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading testimonials...</p>
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden py-4">
      {/* Top row - moves left */}
      <div className="mb-6 overflow-hidden">
        <motion.div
          ref={topRowRef}
          className="flex"
          animate={topRowControls}
          initial={{ x: "0%" }}
        >
          {topRowReviews.map((review, index) => (
            <motion.div 
              key={`${review.id}-${index}`} 
              className="px-2"
              style={{ 
                width: `${100 / cardsToShow}%`, 
                flexShrink: 0 
              }}
            >
              <TestimonialCard review={review} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom row - moves right */}
      <div className="overflow-hidden">
        <motion.div
          ref={bottomRowRef}
          className="flex"
          animate={bottomRowControls}
          initial={{ x: `-${getRowWidth(bottomRowReviews)}%` }}
        >
          {bottomRowReviews.map((review, index) => (
            <motion.div 
              key={`${review.id}-${index}`} 
              className="px-2"
              style={{ 
                width: `${100 / cardsToShow}%`, 
                flexShrink: 0 
              }}
            >
              <TestimonialCard review={review} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
