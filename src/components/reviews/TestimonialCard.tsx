
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

  const generatePlaceholderColor = (name: string) => {
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#03A9F4', '#E91E63', '#673AB7'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString?: string) => {
    try {
      const date = dateString ? new Date(dateString) : new Date();
      return format(date, 'dd/MM/yy');
    } catch (error) {
      return format(new Date(), 'dd/MM/yy');
    }
  };

  const getReviewTitle = () => {
    const titles = [
      "Can't believe this book is free...", 
      "Absolutely amazing!", 
      "Life changing advice", 
      "Best purchase ever", 
      "Highly recommended",
      "A must-read!",
      "Exceeded expectations",
      "Worth every penny",
      "Good Book"
    ];
    const index = review.name.length % titles.length;
    return titles[index];
  };

  // Check if review contains potentially negative content
  const containsNegativeContent = (content: string) => {
    const negativePatterns = [
      'terrible', 'awful', 'horrible', 'worst', 'bad', 'hate', 'dislike', 
      'disappointing', 'waste', 'useless', 'scam', 'fraud', 'refund',
      'poor quality', 'not worth', 'regret'
    ];
    
    return negativePatterns.some(pattern => 
      content.toLowerCase().includes(pattern.toLowerCase())
    );
  };

  const isNegative = containsNegativeContent(review.content);

  return (
    <motion.div
      className="bg-gray-900/90 p-5 rounded-xl h-full flex flex-col min-h-[280px] border border-gray-800 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-blue-500">
          <AvatarFallback 
            style={{ backgroundColor: generatePlaceholderColor(review.name) }}
            className="text-white font-medium"
          >
            {getInitials(review.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <div className="flex items-center">
            <h4 className="font-medium text-white text-base mr-1.5">{review.name}</h4>
            <BadgeCheck className="h-6 w-6 text-blue-500" /> {/* Increased size here */}
          </div>
          <span className="text-gray-400 text-xs">{formatDate(review.created_at)}</span>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
          />
        ))}
      </div>
      
      <h3 className="text-white font-medium text-lg mb-2">
        {getReviewTitle()}
        {Math.random() > 0.7 && <span className="ml-2">🤩</span>}
      </h3>
      
      {isNegative ? (
        <p className="text-amber-400 text-sm flex-grow italic">
          This review has been flagged for moderation.
        </p>
      ) : (
        <p className="text-gray-300 text-sm flex-grow">
          {review.content.length > 150 ? `${review.content.substring(0, 150)}... ` : review.content}
          {review.content.length > 150 && (
            <span className="text-blue-400 cursor-pointer hover:underline">read more</span>
          )}
        </p>
      )}
    </motion.div>
  );
};

export default TestimonialCard;
