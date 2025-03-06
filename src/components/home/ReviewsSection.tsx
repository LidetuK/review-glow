
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import ReviewsHeading from '@/components/reviews/ReviewsHeading';
import TestimonialCarousel from '@/components/reviews/TestimonialCarousel';
import ReviewForm from '@/components/reviews/ReviewForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  isLoading: boolean;
  onSubmitReview: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
}

const ReviewsSection = ({ reviews, isLoading, onSubmitReview }: ReviewsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set to a fixed number for demonstration
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${1 === currentPage ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-white border-gray-700'}`}
          onClick={() => goToPage(1)}
        >
          1
        </Button>
      );
      
      // Add ellipsis if there's a gap
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-1 text-gray-500">...</span>);
      }
    }
    
    // Add pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${i === currentPage ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-white border-gray-700'}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    
    // Always show last page
    if (endPage < totalPages) {
      // Add ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="px-1 text-gray-500">...</span>);
      }
      
      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${totalPages === currentPage ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-white border-gray-700'}`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    
    return buttons;
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReviewsHeading reviews={reviews} />
        </motion.div>

        <div className="mt-10 mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            {/* Review form */}
            <ReviewForm onSubmit={onSubmitReview} />
          </motion.div>
        </div>
      </div>
      
      {/* Full-width testimonial carousel with 6 rows */}
      <div className="w-full overflow-hidden">
        <TestimonialCarousel reviews={reviews} isLoading={isLoading} />
      </div>
      
      {/* Pagination navigation */}
      <div className="container max-w-7xl mx-auto px-4 mt-8">
        <div className="flex justify-center items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="bg-transparent border-gray-700 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {getPaginationButtons()}
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="bg-transparent border-gray-700 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
