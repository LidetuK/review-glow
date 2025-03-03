
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Check, X, Trash2, Edit, Mail } from 'lucide-react';
import StarRating from './StarRating';
import { format } from 'date-fns';
import { Review } from '@/types/review';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AdminReviewCardProps {
  review: Review;
  onUpdate: (id: string, data: Partial<Review>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  className?: string;
}

const AdminReviewCard = ({ review, onUpdate, onDelete, className }: AdminReviewCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState(review.verified);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const handleVerifiedToggle = async () => {
    const newStatus = !verifiedStatus;
    setVerifiedStatus(newStatus);
    await onUpdate(review.id, { verified: newStatus });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(review.id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const sendEmail = () => {
    window.location.href = `mailto:${review.email}?subject=Regarding Your Review&body=Hello ${review.name},%0D%0A%0D%0AThank you for your review on "Sell Like Crazy".`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md" style={{ borderLeftColor: review.verified ? '#10b981' : '#d1d5db' }}>
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
                  <div className="font-medium text-lg flex items-center gap-2">
                    {review.name}
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={sendEmail}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size={16} />
                    <Badge variant="outline" className="text-xs font-normal ml-2">
                      {format(new Date(review.created_at), 'dd/MM/yy HH:mm')}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 sm:mt-0 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`verified-${review.id}`}
                      checked={verifiedStatus}
                      onCheckedChange={handleVerifiedToggle}
                    />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                    <a href={`/admin/reviews/edit/${review.id}`}>
                      <Edit className="h-4 w-4" />
                    </a>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this review? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={handleDelete}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <h4 className="font-semibold text-lg mt-3">{review.title}</h4>
              <p className="text-muted-foreground mt-2">{review.content}</p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Badge className="bg-book-orange/10 text-book-orange">
                    {review.helpful_count} helpful votes
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onUpdate(review.id, { verified: true })}>
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onUpdate(review.id, { verified: false })}>
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminReviewCard;
