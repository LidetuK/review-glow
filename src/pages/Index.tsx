
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/types/review';
import HeroSection from '@/components/home/HeroSection';
import BookShowcase from '@/components/BookShowcase';
import Footer from '@/components/Footer';
import ReviewsSection from '@/components/home/ReviewsSection';
import BookExperience from '@/components/BookExperience';

const Index = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your review',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <BookShowcase />
        <ReviewsSection 
          reviews={reviews} 
          isLoading={isLoading} 
          onSubmitReview={handleSubmitReview} 
        />
      </main>
      <BookExperience />
      <Footer/>
    </div>
  );
};

export default Index;
