import { useState } from "react";
import { motion } from "framer-motion";
import { Review } from "@/types/review";
import ReviewCard from "../ReviewCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star } from "lucide-react";

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
  const [sort, setSort] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // Start with 3 reviews

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setFilter("all");
    setSort("newest");
    setSearch("");
    setVisibleCount(3); // Reset review count on filter reset
  };

  const loadMoreReviews = () => {
    setVisibleCount((prev) => prev + 3); // Load 3 more reviews on click
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="p-6 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md"
    >
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search reviews..."
              value={search}
              onChange={handleSearchChange}
              className="pl-12 border-gray-300 focus:ring-2 focus:ring-purple-400 rounded-lg"
            />
          </div>

          {/* Sorting and Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={sort} onValueChange={(value) => setSort(value as any)}>
              <SelectTrigger className="w-[170px] border-gray-300 rounded-lg hover:shadow-sm">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest rated</SelectItem>
                <SelectItem value="lowest">Lowest rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
              {[5, 4, 3, 2, 1].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 px-3 h-10 rounded-lg transition-all 
                    ${
                      filter === star
                        ? "bg-purple-600 text-white shadow-md"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  onClick={() => setFilter(filter === star ? "all" : star)}
                >
                  <Star
                    className={`h-5 w-5 transition-all ${
                      filter === star ? "fill-white text-white" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{star} ({reviewCounts[star]})</span>
                </Button>
              ))}
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-10 border-gray-300 hover:border-purple-500 hover:text-purple-600"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.slice(0, visibleCount).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:shadow-lg transition-shadow rounded-xl bg-white p-4"
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
            
            {/* Load More Button (Only shows if more reviews are left) */}
            {visibleCount < reviews.length && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={loadMoreReviews}
                  variant="default"
                  className="px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
                >
                  Load More Reviews
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No reviews found</p>
            {filter !== "all" && (
              <Button variant="link" onClick={() => setFilter("all")} className="mt-2">
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
