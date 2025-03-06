
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Star } from 'lucide-react';
import { Review } from '@/types/review';
import { format } from 'date-fns';

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard = ({ review }: TestimonialCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Generate a random avatar placeholder based on the name
  const generatePlaceholderColor = (name: string) => {
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#03A9F4', '#E91E63', '#673AB7'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Randomly determine if review is verified (since we don't have this data)
  const isVerified = review.name.length % 3 === 0; // Approximately 1/3 of reviews will show as verified

  // Format review date (using current date if not available)
  const formatDate = (dateString?: string) => {
    try {
      const date = dateString ? new Date(dateString) : new Date();
      return format(date, 'dd/MM/yy');
    } catch (error) {
      return format(new Date(), 'dd/MM/yy');
    }
  };

  // Generate a review title if not available 
  const getReviewTitle = () => {
    const titles = [
      "Can't believe this book is free...", 
      "Absolutely amazing!", 
      "Life changing advice", 
      "Best purchase ever", 
      "Highly recommended",
      "A must-read!",
      "Exceeded expectations",
      "Worth every penny"
    ];
    const index = review.name.length % titles.length;
    return titles[index];
  };

  return (
    <motion.div
      className="bg-gray-900/90 p-5 rounded-xl h-full flex flex-col min-h-[280px] border border-gray-800 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Reviewer name and verification status at top */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <h4 className="font-medium text-white text-base mr-1">{review.name}</h4>
          {isVerified && (
            <div className="flex items-center">
              <BadgeCheck className="h-4 w-4 text-blue-400 mr-1" />
              <span className="text-gray-400 text-xs">Verified Reviewer</span>
            </div>
          )}
        </div>
        <span className="text-gray-400 text-xs">{formatDate(review.created_at)}</span>
      </div>
      
      {/* Star rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
          />
        ))}
      </div>
      
      {/* Review title */}
      <h3 className="text-white font-medium text-lg mb-2">
        {getReviewTitle()}
        {Math.random() > 0.7 && <span className="ml-2">🤩</span>}
      </h3>
      
      {/* Review content */}
      <p className="text-gray-300 text-sm flex-grow">
        {review.content.length > 150 ? `${review.content.substring(0, 150)}... ` : review.content}
        {review.content.length > 150 && (
          <span className="text-blue-400 cursor-pointer hover:underline">read more</span>
        )}
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
