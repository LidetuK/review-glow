
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '../StarRating';
import { Label } from '@/components/ui/label';

interface StarRatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
  error: boolean;
}

const StarRatingInput = ({ rating, onChange, error }: StarRatingInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="rating" className="flex items-center text-gray-300">
        Rating <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <StarRating 
          rating={rating} 
          onChange={onChange} 
          size={30} 
          interactive={true} 
          className={error ? "animate-shake" : ""}
        />
        <span className="text-sm text-gray-400 ml-2">
          {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
        </span>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-sm"
          >
            Please select a rating
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarRatingInput;
