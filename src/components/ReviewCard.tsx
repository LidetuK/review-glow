
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Flag, Calendar } from 'lucide-react';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarFallback className="bg-book-orange/10 text-book-orange">
                {getInitials(review.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div>
                  <div className="font-medium text-lg">{review.name}</div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size={16} />
                    <Badge variant="outline" className="text-xs font-normal ml-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(review.created_at), 'dd/MM/yy')}
                    </Badge>
                    {review.verified && (
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 text-xs">
                        Verified Reviewer
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <h4 className="font-semibold text-lg mt-3">{review.title}</h4>
              <p className="text-muted-foreground mt-2">{review.content}</p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Was this review helpful?</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      "h-8 px-2",
                      helpful === true && "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    )}
                    onClick={() => setHelpful(true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.helpful_count || 0}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      "h-8 px-2",
                      helpful === false && "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    )}
                    onClick={() => setHelpful(false)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground"
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewCard;
