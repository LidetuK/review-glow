
import { Star } from 'lucide-react';

interface ReviewRatingStarsProps {
  rating: number;
  className?: string;
}

export const ReviewRatingStars = ({ rating, className = "mb-3" }: ReviewRatingStarsProps) => {
  return (
    <div className={className}>
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${
            i < rating 
              ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.7)]' 
              : 'text-gray-600'
          } transition-all hover:scale-110`} 
        />
      ))}
    </div>
  );
};
