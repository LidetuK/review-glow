
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewForm from '@/components/ReviewForm';
import ReviewCard from '@/components/ReviewCard';
import ReviewStats from '@/components/ReviewStats';
import ReviewFilters from '@/components/ReviewFilters';
import { Review } from '@/types/review';

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter, 10));

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Reader Reviews</h1>
            <p className="mt-3 text-muted-foreground">
              Discover what others have to say about "Sell Like Crazy"
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="mb-8">
                <ReviewStats reviews={reviews} onWriteReview={() => setShowForm(!showForm)} />
              </div>
              
              <div className="mb-8">
                <ReviewFilters
                  activeFilter={filter}
                  onFilterChange={setFilter}
                  reviewCounts={reviewCounts}
                />
              </div>
              
              <div className="mb-8">
                <Button 
                  className="w-full bg-book-orange hover:bg-book-orange/90 text-white"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel Review' : 'Write a Review'}
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {showForm && (
                <div className="mb-8">
                  <ReviewForm onSubmit={handleSubmitReview} />
                </div>
              )}
              
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading reviews...</p>
                  </div>
                ) : filteredReviews.length > 0 ? (
                  filteredReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-muted-foreground">No reviews found</p>
                    {filter !== 'all' && (
                      <Button 
                        variant="link" 
                        onClick={() => setFilter('all')}
                        className="mt-2"
                      >
                        View all reviews
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
