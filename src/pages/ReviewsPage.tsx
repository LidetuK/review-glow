
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/types/review';
import ReviewsList from '@/components/reviews/ReviewsList';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewsHeading from '@/components/reviews/ReviewsHeading';
import { motion } from 'framer-motion';

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<number | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('book_reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our Review type
      const transformedData = data.map(review => ({
        id: review.id,
        rating: review.score || 0,
        title: review.title,
        content: review.review_text || '',
        name: review.review_username,
        email: review.email,
        created_at: review.created_at,
        verified: false,
        helpful_count: 0
      }));
      
      setReviews(transformedData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviews',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (review: Omit<Review, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('book_reviews')
        .insert([
          {
            score: review.rating,
            title: review.title,
            review_text: review.content,
            review_username: review.name,
            email: review.email
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Transform the newly created review to match our Review type
      const newReview = {
        id: data[0].id,
        rating: data[0].score || 0,
        title: data[0].title,
        content: data[0].review_text || '',
        name: data[0].review_username,
        email: data[0].email,
        created_at: data[0].created_at,
        verified: false,
        helpful_count: 0
      };
      
      // Update the reviews list with the new review
      setReviews(prevReviews => [newReview, ...prevReviews]);
      
      toast({
        title: 'Review submitted',
        description: 'Your review has been published successfully',
      });
      
      // Hide the form after successful submission
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your review',
        variant: 'destructive',
      });
    }
  };

  // Get filtered reviews based on current filter
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === (filter as number));

  // Create reviewCounts object for filters
  const reviewCounts = {
    all: reviews.length,
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReviewsHeading reviews={reviews} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ReviewsList 
                reviews={filteredReviews} 
                isLoading={isLoading} 
                filter={filter} 
                setFilter={setFilter} 
                reviewCounts={reviewCounts}
              />
            </motion.div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ReviewForm onSubmit={handleSubmitReview} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
