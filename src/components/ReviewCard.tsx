
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Flag, Calendar, CheckCircle } from 'lucide-react';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border bg-purple-100">
            <AvatarFallback className="bg-purple-100 text-purple-700">
              {getInitials(review.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <div>
                <div className="font-medium text-base">{review.name}</div>
                <div className="flex items-center flex-wrap gap-2">
                  <StarRating rating={review.rating} size={14} />
                  <Badge variant="outline" className="text-xs font-normal">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(review.created_at), 'MMM dd, yyyy')}
                  </Badge>
                  {review.verified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold text-base mt-3">{review.title}</h4>
            <p className="text-muted-foreground mt-2 text-sm">{review.content}</p>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Was this helpful?</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "h-7 px-2 text-xs",
                    helpful === true && "bg-green-50 text-green-600 hover:bg-green-100"
                  )}
                  onClick={() => setHelpful(true)}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  <span>{review.helpful_count || 0}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "h-7 px-2 text-xs",
                    helpful === false && "bg-red-50 text-red-600 hover:bg-red-100"
                  )}
                  onClick={() => setHelpful(false)}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-muted-foreground text-xs"
              >
                <Flag className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
