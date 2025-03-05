
import { useState } from 'react';
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

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 border-0", className)}>
      <CardContent className="p-4 h-full flex flex-col">
        {/* Customer name and verification */}
        <div className="flex items-center justify-between mb-1">
          <div className="text-yellow-500 font-medium text-sm">{review.name}</div>
          {review.verified && (
            <Badge variant="outline" className="bg-green-900 text-green-400 text-xs border-green-700">
              Verified
            </Badge>
          )}
        </div>
        
        {/* Star rating */}
        <div className="mb-2">
          <StarRating rating={review.rating} size={14} />
        </div>
        
        {/* Review title */}
        <h4 className="font-bold text-white text-sm mb-1">{review.title}</h4>
        
        {/* Review content */}
        <p className="text-gray-400 text-xs flex-grow mb-2 line-clamp-4">
          {review.content}
        </p>
        
        {/* Date */}
        <div className="text-gray-500 text-xs mt-auto">
          {format(new Date(review.created_at), 'MM/dd/yyyy')}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
