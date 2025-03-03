
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from '../ReviewForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PenLine, Star, Award, ThumbsUp } from 'lucide-react';
import { Review } from '@/types/review';
import { Progress } from '@/components/ui/progress';

interface ReviewFormSectionProps {
  onSubmit: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  reviewCounts: {
    all: number;
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ReviewFormSection = ({ 
  onSubmit, 
  showForm, 
  setShowForm,
  reviewCounts 
}: ReviewFormSectionProps) => {
  
  // Calculate total reviews
  const total = reviewCounts.all;
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rating Summary</h3>
              <div className="text-sm text-muted-foreground">{total} reviews</div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center w-12">
                    <span className="text-sm font-medium">{star}</span>
                    <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <Progress 
                    value={total > 0 ? (reviewCounts[star as keyof typeof reviewCounts] / total * 100) : 0} 
                    className="h-2 flex-1 bg-gray-100" 
                  />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {reviewCounts[star as keyof typeof reviewCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-purple-200">
        <div className="flex flex-col items-center text-center space-y-3">
          <Award className="h-10 w-10 text-purple-500" />
          <h3 className="text-xl font-bold">Share Your Experience</h3>
          <p className="text-muted-foreground">Your review helps others make better decisions</p>
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            {showForm ? (
              'Cancel Review'
            ) : (
              <>
                <PenLine className="mr-2 h-4 w-4" />
                Write a Review
              </>
            )}
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewForm onSubmit={onSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewFormSection;
