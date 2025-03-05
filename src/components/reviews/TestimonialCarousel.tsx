
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, reviews.length]);
  
  // Pause auto-play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  const nextSlide = () => {
    if (reviews.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (reviews.length - cardsToShow + 1));
  };
  
  const prevSlide = () => {
    if (reviews.length <= cardsToShow) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - cardsToShow : prevIndex - 1
    );
  };
  
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
      className="relative overflow-hidden py-8 px-4 -mx-4"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Navigation buttons */}
      {reviews.length > cardsToShow && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Carousel container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full overflow-hidden"
      >
        <motion.div 
          className="flex transition-all duration-500 ease-out"
          animate={{
            x: `-${currentIndex * (100 / cardsToShow)}%`
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id} 
              className={`w-full px-4 flex-shrink-0`}
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
      
      {/* Pagination dots */}
      {reviews.length > cardsToShow && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: reviews.length - cardsToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-yellow-400 w-4' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
