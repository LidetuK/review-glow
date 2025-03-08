
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
};

export default CarouselRow;
