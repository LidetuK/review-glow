
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
  
  // Ensure we have enough reviews for smooth continuous looping
  const ensureEnoughReviews = (rowReviews: Review[]) => {
    // We need at least 10 reviews per row for smooth looping
    const minLength = 10;
    if (rowReviews.length < minLength) {
      // Duplicate reviews until we have enough
      const duplicated = [...rowReviews];
      while (duplicated.length < minLength) {
        duplicated.push(...rowReviews);
      }
      return duplicated;
    }
    return rowReviews;
  };
  
  // Split reviews evenly across 6 rows
  const splitReviews = () => {
    if (!reviews.length) return Array(6).fill([]);
    
    // Ensure we have at least 18 reviews (3 per row)
    const paddedReviews = [...reviews];
    while (paddedReviews.length < 18) {
      paddedReviews.push(...reviews);
    }
    
    const rowSize = Math.ceil(paddedReviews.length / 6);
    const rows = Array(6).fill([]).map((_, index) => {
      const start = index * rowSize;
      const end = start + rowSize;
      // For every even-indexed row (2nd, 4th, 6th), reverse the array to create visual diversity
      const slicedReviews = paddedReviews.slice(start, end);
      const finalReviews = index % 2 === 1 ? [...slicedReviews].reverse() : slicedReviews;
      // Ensure each row has enough reviews for smooth looping
      return ensureEnoughReviews(finalReviews);
    });
    
    return rows;
  };
  
  const rowsOfReviews = splitReviews();
  
  // Duplicate reviews to create seamless infinite scroll effect
  const duplicateReviews = (rowReviews: Review[]) => {
    // Triple the reviews to ensure we have enough content for looping
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
          const speed = 15; // Base speed for animation
          
          // Even rows (0, 2, 4) move left, odd rows (1, 3, 5) move right
          // We make sure special attention is paid to rows 2 and 4 (index 1 and 3)
          const duration = rowReviews.length * (index === 1 || index === 3 ? speed * 0.8 : speed);
          
          if (isEvenRow) {
            await rowControls[index].start({
              x: `-${rowWidth}%`,
              transition: {
                duration: duration,
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
                duration: duration,
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
  
  // Restart animations when window is focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && reviews.length) {
        rowsOfReviews.forEach((rowReviews, index) => {
          const animate = async () => {
            const rowWidth = getRowWidth(duplicatedRows[index]);
            const isEvenRow = index % 2 === 0;
            const speed = 15;
            const duration = rowReviews.length * (index === 1 || index === 3 ? speed * 0.8 : speed);
            
            if (isEvenRow) {
              await rowControls[index].start({
                x: `-${rowWidth}%`,
                transition: {
                  duration: duration,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }
              });
            } else {
              await rowControls[index].start({
                x: `${rowWidth}%`,
                transition: {
                  duration: duration,
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
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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
