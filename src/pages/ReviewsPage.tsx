
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookInfo from '@/components/BookInfo';
import ReviewStats from '@/components/ReviewStats';
import ReviewFilters from '@/components/ReviewFilters';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { reviewService } from '@/services/reviewService';
import { Review } from '@/types/review';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, ChevronDown } from 'lucide-react';

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ average: 0, total: 0, distribution: [0, 0, 0, 0, 0] });
  const [activeTab, setActiveTab] = useState('reviews');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(5);

  // Filter states
  const [filters, setFilters] = useState({
    rating: null as number | null,
    sort: 'newest' as 'newest' | 'oldest' | 'highest' | 'lowest',
    verified: false,
    search: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
    fetchStats();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load reviews. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await reviewService.getReviewStats();
      setStats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load review statistics.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitReview = async (reviewData: Omit<Review, 'id' | 'created_at'>) => {
    try {
      await reviewService.createReview(reviewData);
      await fetchReviews();
      await fetchStats();
      setActiveTab('reviews');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      toast({
        title: "Success",
        description: "Your review has been submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    // Filter by rating
    if (filters.rating !== null) {
      filtered = filtered.filter(review => review.rating === filters.rating);
    }
    
    // Filter by verified
    if (filters.verified) {
      filtered = filtered.filter(review => review.verified);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(review => 
        review.title.toLowerCase().includes(searchTerm) || 
        review.content.toLowerCase().includes(searchTerm) ||
        review.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort the results
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
    }
    
    return filtered;
  };

  const filteredReviews = getFilteredReviews();
  const showLoadMore = visibleReviews < filteredReviews.length;

  const handleWriteReviewClick = () => {
    setActiveTab('write');
    setTimeout(() => {
      const writeReviewSection = document.getElementById('write-review-section');
      if (writeReviewSection) {
        writeReviewSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 5);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <BookInfo 
          title="Sell Like Crazy" 
          author="by Sabri Suby" 
          coverImage="public/lovable-uploads/7ce3b083-e0bb-4d89-a77f-df5a9e7ce8ad.png"
        />
        
        <section className="py-12 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Review Stats */}
            <ReviewStats 
              stats={stats} 
              onWriteReview={handleWriteReviewClick} 
              className="mb-8"
            />
            
            {/* Tabs */}
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full mt-8"
            >
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="reviews" className="text-base py-3">
                  All Reviews
                </TabsTrigger>
                <TabsTrigger value="write" className="text-base py-3">
                  <PenLine className="mr-2 h-4 w-4" />
                  Write a Review
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="mt-6">
                <ReviewFilters 
                  onFilterChange={handleFilterChange}
                  className="mb-6"
                />
                
                <AnimatePresence>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-orange"></div>
                    </div>
                  ) : filteredReviews.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 bg-white rounded-lg shadow-sm"
                    >
                      <p className="text-muted-foreground text-lg">No reviews match your filters.</p>
                      <Button 
                        variant="link" 
                        onClick={() => handleFilterChange({ rating: null, sort: 'newest', verified: false, search: '' })}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {filteredReviews.slice(0, visibleReviews).map((review, index) => (
                        <ReviewCard 
                          key={review.id} 
                          review={review}
                        />
                      ))}
                      
                      {showLoadMore && (
                        <div className="text-center mt-8">
                          <Button 
                            variant="outline" 
                            onClick={loadMoreReviews}
                            className="gap-2"
                          >
                            Load More
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>
              
              <TabsContent value="write" className="mt-6">
                <div id="write-review-section">
                  <ReviewForm onSubmit={handleSubmitReview} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReviewsPage;
