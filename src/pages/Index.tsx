import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, CheckCircle } from 'lucide-react';

import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/types/review';
import ReviewsList from '@/components/reviews/ReviewsList';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewsHeading from '@/components/reviews/ReviewsHeading';
import BookShowcase from "@/components/BookShowcase";
import BookExperience from '@/components/BookExperience';




const Index = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<number | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

      setReviews(prevReviews => [newReview, ...prevReviews]);

      toast({
        title: 'Review submitted',
        description: 'Your review has been published successfully',
      });

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

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === (filter as number));

  const reviewCounts = {
    all: reviews.length,
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen flex flex-col">
     
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-50 overflow-hidden py-32">
  {/* Background Gradient */}
  <div 
    className="absolute inset-0"
    style={{ 
      opacity: 0.9,
      backgroundImage: `radial-gradient(circle at top, rgba(255, 72, 0, 0.15), transparent 60%)` 
    }}
  />

  {/* Content Container */}
  <div className="container max-w-5xl mx-auto px-6 relative z-10">
    <div className="flex flex-col items-center text-center space-y-12">
      {/* Headline Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold leading-tight tracking-tight text-gray-900">
          "Quite possibly the most 
          <span className="text-book-red drop-shadow-md"> provocative </span> 
          book ever written for developing a better mindset and achieving success..."
        </h1>
      </motion.div>

      {/* Book Image Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="w-full max-w-xl mx-auto"
      >
        <img 
          src="/lovable-uploads/8ebd4889-d01b-480e-942a-42139c5c9167.png" 
          alt="Book Cover" 
          className="rounded-lg shadow-xl"
        />
      </motion.div>
    </div>
  </div>
</section>

          {/* Add Book Showcase Below */}
      <BookShowcase />

        {/* Reviews Section */}
        <section className="py-16 bg-white">
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
        </section>
      </main>

      <BookExperience />
    </div>
  );
};

export default Index;
