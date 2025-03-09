
import { useRef } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { Review } from '@/types/review';
import TestimonialCard from '../TestimonialCard';
import { getRowWidth, getRowSpeedMultiplier } from './carouselUtils';

interface CarouselRowProps {
  rowReviews: Review[];
  rowIndex: number;
  cardsToShow: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  controls: AnimationControls;
}

const CarouselRow = ({ 
  rowReviews, 
  rowIndex, 
  cardsToShow, 
  isHovered,
  onMouseEnter,
  onMouseLeave,
  controls
}: CarouselRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEvenRow = rowIndex % 2 === 0;
  
  return (
    <div 
      className="mb-6 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        ref={rowRef}
        className="flex"
        animate={controls}
        initial={{ x: isEvenRow ? "0%" : `-${getRowWidth(rowReviews, cardsToShow)}%` }}
        style={{ 
          // Ensure enough spacing between cards
          gap: '8px',
          // Adding a smooth transition on hover
          transition: 'filter 0.3s ease-in-out, transform 0.2s ease-in-out'
        }}
        whileHover={{
          filter: 'brightness(1.05)', // Subtle brightness increase on hover
          scale: 1.005, // Very slight scale up for better hover feedback
        }}
      >
        {rowReviews.map((review, index) => (
          <motion.div 
            key={`${review.id}-${rowIndex}-${index}`} 
            className="px-2"
            style={{ 
              width: `${100 / cardsToShow}%`, 
              flexShrink: 0,
              // Ensure there's no gap
              marginRight: '0px' 
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <TestimonialCard review={review} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarouselRow;
