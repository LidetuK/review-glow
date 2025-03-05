
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import TestimonialCard from './TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialCarouselProps {
  reviews: Review[];
  isLoading: boolean;
}

const TestimonialCarousel = ({ reviews, isLoading }: TestimonialCarouselProps) => {
  const [currentIndexTop, setCurrentIndexTop] = useState(0);
  const [currentIndexBottom, setCurrentIndexBottom] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalTopRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayIntervalBottomRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Split reviews for top and bottom rows
  const splitReviews = () => {
    const midpoint = Math.ceil(reviews.length / 2);
    return {
      topRow: reviews.slice(0, midpoint),
      bottomRow: reviews.slice(midpoint)
    };
  };
  
  const { topRow, bottomRow } = splitReviews();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up auto-play for top row
  useEffect(() => {
    if (isAutoPlaying && topRow.length > cardsToShow) {
      autoPlayIntervalTopRef.current = setInterval(() => {
        setCurrentIndexTop((prevIndex) => (prevIndex + 1) % (topRow.length - cardsToShow + 1));
      }, 5000);
    }
    
    return () => {
      if (autoPlayIntervalTopRef.current) {
        clearInterval(autoPlayIntervalTopRef.current);
      }
    };
  }, [currentIndexTop, isAutoPlaying, topRow.length, cardsToShow]);
  
  // Set up auto-play for bottom row, slightly offset in timing
  useEffect(() => {
    if (isAutoPlaying && bottomRow.length > cardsToShow) {
      autoPlayIntervalBottomRef.current = setInterval(() => {
        setCurrentIndexBottom((prevIndex) => (prevIndex + 1) % (bottomRow.length - cardsToShow + 1));
      }, 6000); // Different timing for visual interest
    }
    
    return () => {
      if (autoPlayIntervalBottomRef.current) {
        clearInterval(autoPlayIntervalBottomRef.current);
      }
    };
  }, [currentIndexBottom, isAutoPlaying, bottomRow.length, cardsToShow]);
  
  // Pause auto-play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
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
    <div 
      className="relative overflow-hidden py-2"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Top row */}
      <div className="mb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full overflow-hidden"
        >
          <motion.div 
            className="flex transition-all duration-500 ease-out"
            animate={{
              x: `-${currentIndexTop * (100 / cardsToShow)}%`
            }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
          >
            {topRow.map((review, index) => (
              <motion.div 
                key={review.id} 
                className={`w-full px-2`}
                style={{ width: `${100 / cardsToShow}%` }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
              >
                <TestimonialCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom row */}
      <div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full overflow-hidden"
        >
          <motion.div 
            className="flex transition-all duration-500 ease-out"
            animate={{
              x: `-${currentIndexBottom * (100 / cardsToShow)}%`
            }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
          >
            {bottomRow.map((review, index) => (
              <motion.div 
                key={review.id} 
                className={`w-full px-2`}
                style={{ width: `${100 / cardsToShow}%` }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.2, // slightly delayed compared to top row
                  type: "spring",
                  stiffness: 100 
                }}
              >
                <TestimonialCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
