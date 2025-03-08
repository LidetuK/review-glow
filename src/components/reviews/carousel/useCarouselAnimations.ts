
import { useState, useEffect } from 'react';
import { AnimationControls } from 'framer-motion';
import { Review } from '@/types/review';
import { getRowWidth, getRowSpeedMultiplier } from './carouselUtils';

export const useCarouselAnimations = (
  rowsOfReviews: Review[][],
  cardsToShow: number,
  duplicatedRows: Review[][]
) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  // Function to start animation for a specific row
  const startRowAnimation = (index: number, controls: AnimationControls) => {
    const rowReviews = rowsOfReviews[index];
    const rowWidth = getRowWidth(duplicatedRows[index], cardsToShow);
    const isEvenRow = index % 2 === 0;
    const baseSpeed = 15; // Adjusted base speed for animation (slowed down)
    
    // Apply special timing for certain rows
    const speedMultiplier = getRowSpeedMultiplier(index);
    const duration = rowReviews.length * baseSpeed * speedMultiplier;
    
    if (isEvenRow) {
      controls.start({
        x: `-${rowWidth}%`,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      controls.start({
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
  const pauseRowAnimation = (controls: AnimationControls) => {
    controls.stop();
  };
  
  // Handle row hover events with improved transitions
  const handleRowMouseEnter = (index: number) => {
    setHoveredRow(index);
  };
  
  const handleRowMouseLeave = (index: number) => {
    setHoveredRow(null);
  };
  
  return {
    hoveredRow,
    startRowAnimation,
    pauseRowAnimation,
    handleRowMouseEnter,
    handleRowMouseLeave
  };
};

export default useCarouselAnimations;
