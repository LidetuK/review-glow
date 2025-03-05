
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.3
      }
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 border-0 h-full", className)}>
      <CardContent className="p-4 h-full flex flex-col">
        {/* Customer name and verification */}
        <motion.div 
          className="flex items-center justify-between mb-1"
          variants={contentVariants}
        >
          <div className="text-yellow-500 font-medium text-sm">{review.name}</div>
          {review.verified && (
            <Badge variant="outline" className="bg-green-900 text-green-400 text-xs border-green-700">
              Verified
            </Badge>
          )}
        </motion.div>
        
        {/* Star rating */}
        <motion.div 
          className="mb-2"
          variants={contentVariants}
        >
          <StarRating rating={review.rating} size={14} />
        </motion.div>
        
        {/* Review title */}
        <motion.h4 
          className="font-bold text-white text-sm mb-1"
          variants={contentVariants}
        >
          {review.title}
        </motion.h4>
        
        {/* Review content */}
        <motion.p 
          className="text-gray-400 text-xs flex-grow mb-2 line-clamp-4"
          variants={contentVariants}
        >
          {review.content}
        </motion.p>
        
        {/* Date */}
        <motion.div 
          className="text-gray-500 text-xs mt-auto"
          variants={contentVariants}
        >
          {format(new Date(review.created_at), 'MM/dd/yyyy')}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
