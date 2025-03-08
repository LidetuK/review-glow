
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
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
        />
      ))}
    </div>
  );
};
