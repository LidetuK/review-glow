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

  // Track which row is currently being hovered
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
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
    // We need at least 20 reviews per row for smoother looping (increased from 15)
    const minLength = 20;
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
    
    // Ensure we have at least 30 reviews (5 per row) - increased from 24
    const paddedReviews = [...reviews];
    while (paddedReviews.length < 30) {
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
  
  // Quintuple the reviews to create seamless infinite scroll effect (increased from quadruple)
  const duplicateReviews = (rowReviews: Review[]) => {
    return [...rowReviews, ...rowReviews, ...rowReviews, ...rowReviews, ...rowReviews];
  };
  
  const duplicatedRows = rowsOfReviews.map(row => duplicateReviews(row));
  
  // Calculate the width of each row based on card width
  const getRowWidth = (rowReviews: Review[]) => {
    const cardWidth = 100 / cardsToShow; // percentage width of each card
    return cardWidth * rowReviews.length / 5; // divide by 5 because we're quintupling the array
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if a row needs special timing (rows 2 and 4)
  const getRowSpeedMultiplier = (index: number) => {
    // Rows 2 and 4 (indices 1 and 3) get even more special treatment
    if (index === 1 || index === 3) return 0.65;
    // Other odd rows (reverse direction) get slight speed adjustment
    if (index % 2 === 1) return 0.85;
    return 1;
  };
  
  // Function to start animation for a specific row
  const startRowAnimation = (index: number) => {
    const rowReviews = rowsOfReviews[index];
    const rowWidth = getRowWidth(duplicatedRows[index]);
    const isEvenRow = index % 2 === 0;
    const baseSpeed = 18; // Base speed for animation (slowed down slightly)
    
    // Apply special timing for certain rows
    const speedMultiplier = getRowSpeedMultiplier(index);
    const duration = rowReviews.length * baseSpeed * speedMultiplier;
    
    if (isEvenRow) {
      rowControls[index].start({
        x: `-${rowWidth}%`,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      rowControls[index].start({
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
  
  // Pause animation for a specific row with smooth stopping
  const pauseRowAnimation = (index: number) => {
    // Get current position and pause there
    const currentX = rowRefs[index].current?.style.transform;
    if (currentX) {
      rowControls[index].stop();
    } else {
      rowControls[index].stop();
    }
  };
  
  // Start all animations
  useEffect(() => {
    if (reviews.length) {
      rowsOfReviews.forEach((_, index) => {
        if (hoveredRow !== index) {
          startRowAnimation(index);
        }
      });
    }
    
    // Restart animations when component unmounts and remounts
    return () => {
      rowControls.forEach(control => control.stop());
    };
  }, [reviews.length, cardsToShow, hoveredRow]);
  
  // Handle row hover events with improved transitions
  const handleRowMouseEnter = (index: number) => {
    setHoveredRow(index);
    pauseRowAnimation(index);
  };
  
  const handleRowMouseLeave = (index: number) => {
    setHoveredRow(null);
    startRowAnimation(index);
  };
  
  // Restart animations when window is focused or after visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && reviews.length) {
        rowsOfReviews.forEach((_, index) => {
          if (hoveredRow !== index) {
            startRowAnimation(index);
          }
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [reviews.length, cardsToShow, hoveredRow]);
  
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
          <div 
            key={`row-${rowIndex}`} 
            className="mb-6 overflow-hidden"
            onMouseEnter={() => handleRowMouseEnter(rowIndex)}
            onMouseLeave={() => handleRowMouseLeave(rowIndex)}
          >
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
