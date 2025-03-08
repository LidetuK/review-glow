
import { useState, useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { Review } from '@/types/review';
import CarouselRow from './carousel/CarouselRow';
import { 
  getCardsToShow, 
  splitReviews, 
  duplicateReviews 
} from './carousel/carouselUtils';
import useCarouselAnimations from './carousel/useCarouselAnimations';

interface TestimonialCarouselProps {
  reviews: Review[];
  isLoading: boolean;
}

const TestimonialCarousel = ({ reviews, isLoading }: TestimonialCarouselProps) => {
  // Number of cards to show based on viewport
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  
  // Create animation controls for each row
  const rowControls = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation()
  ];
  
  // Split reviews evenly across 6 rows
  const rowsOfReviews = splitReviews(reviews);
  
  // Sextuple the reviews to create seamless infinite scroll effect
  const duplicatedRows = rowsOfReviews.map(row => duplicateReviews(row));
  
  // Get animation management functions
  const { 
    hoveredRow, 
    startRowAnimation, 
    pauseRowAnimation,
    handleRowMouseEnter, 
    handleRowMouseLeave 
  } = useCarouselAnimations(rowsOfReviews, cardsToShow, duplicatedRows);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Start all animations
  useEffect(() => {
    if (reviews.length) {
      rowsOfReviews.forEach((_, index) => {
        if (hoveredRow !== index) {
          startRowAnimation(index, rowControls[index]);
        }
      });
    }
    
    // Restart animations when component unmounts and remounts
    return () => {
      rowControls.forEach(control => control.stop());
    };
  }, [reviews.length, cardsToShow, hoveredRow]);
  
  // Restart animations when window is focused or after visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && reviews.length) {
        rowsOfReviews.forEach((_, index) => {
          if (hoveredRow !== index) {
            startRowAnimation(index, rowControls[index]);
          }
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [reviews.length, cardsToShow, hoveredRow]);
  
  // Additional reset function to prevent stuck animations
  useEffect(() => {
    const resetIntervalMs = 30000; // Reset animations every 30 seconds
    
    const resetInterval = setInterval(() => {
      if (hoveredRow === null && reviews.length) {
        rowsOfReviews.forEach((_, index) => {
          rowControls[index].stop();
          startRowAnimation(index, rowControls[index]);
        });
      }
    }, resetIntervalMs);
    
    return () => clearInterval(resetInterval);
  }, [reviews.length, hoveredRow]);
  
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
  
  // Custom row enter/leave handlers to manage animations
  const onRowEnter = (index: number) => {
    handleRowMouseEnter(index);
    pauseRowAnimation(rowControls[index]);
  };
  
  const onRowLeave = (index: number) => {
    handleRowMouseLeave(index);
    startRowAnimation(index, rowControls[index]);
  };
  
  return (
    <div className="relative overflow-hidden py-4">
      {duplicatedRows.map((rowReviews, rowIndex) => (
        <CarouselRow
          key={`row-${rowIndex}`}
          rowReviews={rowReviews}
          rowIndex={rowIndex}
          cardsToShow={cardsToShow}
          isHovered={hoveredRow === rowIndex}
          onMouseEnter={() => onRowEnter(rowIndex)}
          onMouseLeave={() => onRowLeave(rowIndex)}
          controls={rowControls[rowIndex]}
        />
      ))}
    </div>
  );
};

export default TestimonialCarousel;
