
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Review } from '@/types/review';
import TestimonialCard from './TestimonialCard';

interface TestimonialCarouselProps {
  reviews: Review[];
  isLoading: boolean;
}

const TestimonialCarousel = ({ reviews, isLoading }: TestimonialCarouselProps) => {
  const rowRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  
  const rowControls = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation()
  ];
  
  // Number of cards to show based on viewport
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1.5;  // Mobile
      if (window.innerWidth < 1024) return 2.5; // Tablet
      return 3.5; // Desktop
    }
    return 3.5; // Default for SSR
  };
  
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  
  // Split reviews evenly across 6 rows
  const splitReviews = () => {
    if (!reviews.length) return Array(6).fill([]);
    
    // Ensure we have at least 12 reviews (2 per row)
    const paddedReviews = [...reviews];
    while (paddedReviews.length < 12) {
      paddedReviews.push(...reviews);
    }
    
    const rowSize = Math.ceil(paddedReviews.length / 6);
    const rows = Array(6).fill([]).map((_, index) => {
      const start = index * rowSize;
      const end = start + rowSize;
      return paddedReviews.slice(start, end);
    });
    
    return rows;
  };
  
  const rowsOfReviews = splitReviews();
  
  // Duplicate reviews to create seamless infinite scroll effect
  const duplicateReviews = (rowReviews: Review[]) => {
    return [...rowReviews, ...rowReviews, ...rowReviews];
  };
  
  const duplicatedRows = rowsOfReviews.map(row => duplicateReviews(row));
  
  // Calculate the width of each row based on card width
  const getRowWidth = (rowReviews: Review[]) => {
    const cardWidth = 100 / cardsToShow; // percentage width of each card
    return cardWidth * rowReviews.length / 3; // divide by 3 because we're showing a third of the duplicated array
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
    if (reviews.length) {
      rowsOfReviews.forEach((rowReviews, index) => {
        const animate = async () => {
          const rowWidth = getRowWidth(duplicatedRows[index]);
          const isEvenRow = index % 2 === 0;
          
          // Even rows (0, 2, 4) move left, odd rows (1, 3, 5) move right
          if (isEvenRow) {
            await rowControls[index].start({
              x: `-${rowWidth}%`,
              transition: {
                duration: rowReviews.length * 15, // duration based on number of cards
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }
            });
          } else {
            // Start from the right (negative position) and move to the left
            await rowControls[index].start({
              x: `${rowWidth}%`,
              transition: {
                duration: rowReviews.length * 15, // duration based on number of cards
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }
            });
          }
        };
        
        animate();
      });
    }
  }, [reviews.length, cardsToShow]);
  
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
      {duplicatedRows.map((rowReviews, rowIndex) => {
        const isEvenRow = rowIndex % 2 === 0;
        return (
          <div key={`row-${rowIndex}`} className="mb-6 overflow-hidden">
            <motion.div
              ref={rowRefs[rowIndex]}
              className="flex"
              animate={rowControls[rowIndex]}
              initial={{ x: isEvenRow ? "0%" : `-${getRowWidth(rowReviews)}%` }}
            >
              {rowReviews.map((review, index) => (
                <motion.div 
                  key={`${review.id}-${rowIndex}-${index}`} 
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
        );
      })}
    </div>
  );
};

export default TestimonialCarousel;
