
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
  
  // Process reviews to ensure we have enough for display
  const processedReviews = reviews.length > 0 ? reviews : Array(6).fill({
    id: 'placeholder',
    rating: 5,
    content: 'Loading review...',
    name: 'User',
    email: '',
    created_at: new Date().toISOString(),
    verified: true,
    helpful_count: 0
  });
  
  // Split reviews evenly across rows (ensuring we have enough content)
  const rowsOfReviews = splitReviews(processedReviews);
  
  // Create a continuous loop effect by duplicating rows multiple times
  const duplicatedRows = rowsOfReviews.map(row => duplicateReviews(row, 8)); // Increase duplications for smoother loops
  
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
    if (processedReviews.length) {
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
  }, [processedReviews.length, cardsToShow, hoveredRow]);
  
  // Restart animations when window is focused or after visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && processedReviews.length) {
        rowsOfReviews.forEach((_, index) => {
          if (hoveredRow !== index) {
            startRowAnimation(index, rowControls[index]);
          }
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [processedReviews.length, cardsToShow, hoveredRow]);
  
  // Additional reset function to prevent stuck animations
  useEffect(() => {
    const resetIntervalMs = 20000; // Reset animations every 20 seconds
    
    const resetInterval = setInterval(() => {
      if (hoveredRow === null && processedReviews.length) {
        rowsOfReviews.forEach((_, index) => {
          rowControls[index].stop();
          startRowAnimation(index, rowControls[index]);
        });
      }
    }, resetIntervalMs);
    
    return () => clearInterval(resetInterval);
  }, [processedReviews.length, hoveredRow]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading testimonials...</p>
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
