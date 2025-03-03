
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReviewFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  reviewCounts: {
    all: number;
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

const ReviewFilters = ({ activeFilter, onFilterChange, reviewCounts, className }: ReviewFiltersProps) => {
  const [sort, setSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [verified, setVerified] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // For now, we're not implementing search functionality
  };

  const clearFilters = () => {
    onFilterChange('all');
    setSort('newest');
    setVerified(false);
    setSearch('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <div className="bg-white shadow-sm rounded-lg p-4">
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
                  className={cn(
                    "flex items-center gap-1 px-2 h-10",
                    activeFilter === star.toString() && "bg-book-orange/10 text-book-orange"
                  )}
                  onClick={() => onFilterChange(activeFilter === star.toString() ? 'all' : star.toString())}
                >
                  <Star 
                    className={cn(
                      "h-4 w-4", 
                      activeFilter === star.toString() ? "fill-book-orange text-book-orange" : "text-muted-foreground"
                    )} 
                  />
                  <span>{star}</span>
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10",
                verified && "bg-book-orange/10 text-book-orange border-book-orange"
              )}
              onClick={() => setVerified(!verified)}
              title="Verified Purchases Only"
            >
              <Check className="h-4 w-4" />
            </Button>
            
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
    </motion.div>
  );
};

export default ReviewFilters;
