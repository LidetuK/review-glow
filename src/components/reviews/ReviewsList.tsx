
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/types/review';
import ReviewCard from '../ReviewCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star } from 'lucide-react';

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  filter: number | 'all';
  setFilter: (filter: number | 'all') => void;
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
  const [sort, setSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // For now, we're not implementing search functionality
  };

  const clearFilters = () => {
    setFilter('all');
    setSort('newest');
    setSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select
              value={sort}
              onValueChange={(value) => setSort(value as any)}
            >
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest rated</SelectItem>
                <SelectItem value="lowest">Lowest rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center border rounded-md">
              {[5, 4, 3, 2, 1].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 px-2 h-10 ${
                    filter === star ? "bg-purple-100 text-purple-700" : ""
                  }`}
                  onClick={() => setFilter(filter === star ? 'all' : star)}
                >
                  <Star 
                    className={`h-4 w-4 ${
                      filter === star ? "fill-purple-700 text-purple-700" : "text-muted-foreground"
                    }`} 
                  />
                  <span>{star}</span>
                </Button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-10"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ReviewCard review={review} />
            </motion.div>
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
    </motion.div>
  );
};

export default ReviewsList;
