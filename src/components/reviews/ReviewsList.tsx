import { useState } from "react";
import { motion } from "framer-motion";
import { Review } from "@/types/review";
import ReviewCard from "../ReviewCard";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import TestimonialCarousel from "./TestimonialCarousel";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  filter: number | "all";
  setFilter: React.Dispatch<React.SetStateAction<number | "all">>;
  reviewCounts: {
    all: number;
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ReviewsList = ({ reviews, isLoading, filter, setFilter, reviewCounts }: ReviewsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 12; 
  
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginationNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`h-8 w-8 p-0 ${currentPage === i ? 'bg-yellow-500 text-black' : 'bg-transparent text-white border-gray-700'}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const reviewVariants = {
    hidden: { 
      opacity: 0,
      x: -40,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <>
          <TestimonialCarousel reviews={reviews} isLoading={isLoading} />
          
          {false && totalPages > 1 && (
            <motion.div 
              className="flex justify-center items-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="bg-transparent border-gray-700 text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              {paginationNumbers()}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="bg-transparent border-gray-700 text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <p className="text-gray-500">No reviews found</p>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewsList;
