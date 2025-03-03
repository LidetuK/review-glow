
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  onChange?: (rating: number) => void;
  interactive?: boolean;
}

const StarRating = ({ 
  rating, 
  size = 20, 
  className, 
  onChange,
  interactive = false 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    if (!interactive) {
      // Create animation effect for non-interactive star ratings
      const timer = setTimeout(() => {
        setAnimatedRating(rating);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedRating(rating);
    }
  }, [rating, interactive]);

  const handleStarClick = (selectedRating: number) => {
    if (interactive && onChange) {
      onChange(selectedRating);
    }
  };

  const handleStarHover = (hoveredRating: number) => {
    if (interactive) {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div 
      className={cn("flex", className)} 
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star} 
          className={cn(
            "relative cursor-default transition-transform duration-200", 
            interactive && "cursor-pointer hover:scale-110"
          )}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
        >
          <Star 
            size={size} 
            className="text-gray-200 transition-colors"
          />
          <Star 
            size={size} 
            className={cn(
              "absolute top-0 left-0 text-yellow-500 overflow-hidden transition-all duration-300",
              (hoverRating || animatedRating) >= star ? "w-full" : "w-0"
            )}
            style={{ 
              width: hoverRating >= star 
                ? '100%' 
                : animatedRating >= star 
                  ? '100%' 
                  : animatedRating > star - 1 && animatedRating < star 
                    ? `${(animatedRating - (star - 1)) * 100}%` 
                    : '0%'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
