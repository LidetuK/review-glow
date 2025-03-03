
import { Review } from "@/types/review";
import { createClient } from "@supabase/supabase-js";

// This would be replaced with real env variables in production
const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-key';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Placeholder data for development before connecting to Supabase
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Game changer for my business",
    content: "This book completely transformed how I approach sales and marketing. The strategies are unconventional but incredibly effective. I've already seen a 40% increase in conversions since implementing just a few of the techniques.",
    name: "Richard S.",
    email: "richard@example.com",
    created_at: "2023-02-03T14:30:00Z",
    verified: true,
    helpful_count: 28
  },
  {
    id: "2",
    rating: 5,
    title: "Mind-blowing strategies that actually work",
    content: "I've read dozens of marketing books, and most regurgitate the same tired advice. This one is different. The author doesn't just theorize—he provides a step-by-step system backed by real results. Worth every penny.",
    name: "Mark Z.",
    email: "mark@example.com",
    created_at: "2023-01-26T09:15:00Z",
    verified: true,
    helpful_count: 42
  },
  {
    id: "3",
    rating: 5,
    title: "Changed my entrepreneurial journey",
    content: "The concepts in this book are revolutionary yet practical. I implemented the customer avatar framework and immediately saw an improvement in my ad targeting. If you're serious about growing your business, this is mandatory reading.",
    name: "Giancarlos H.",
    email: "giancarlos@example.com",
    created_at: "2023-01-24T16:45:00Z",
    verified: true,
    helpful_count: 19
  },
  {
    id: "4",
    rating: 4,
    title: "Solid advice for serious marketers",
    content: "While some of the techniques are advanced, the core principles are applicable to businesses of any size. I especially appreciated the section on psychological triggers. A few parts felt repetitive, hence the 4 stars.",
    name: "Sarah J.",
    email: "sarah@example.com",
    created_at: "2023-01-18T11:20:00Z",
    verified: false,
    helpful_count: 7
  },
  {
    id: "5",
    rating: 3,
    title: "Good concepts but overwhelming",
    content: "There's valuable information here, but it feels like drinking from a firehose. I would have preferred a more structured approach with clearer implementation steps. Still, I've bookmarked several sections to revisit.",
    name: "David L.",
    email: "david@example.com",
    created_at: "2023-01-15T13:10:00Z",
    verified: true,
    helpful_count: 3
  }
];

// Service for handling reviews
export const reviewService = {
  // Get all reviews
  getAllReviews: async (): Promise<Review[]> => {
    try {
      // This would be replaced with a real Supabase query
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .select('*')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return Promise.resolve([...MOCK_REVIEWS]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },
  
  // Get a single review by id
  getReviewById: async (id: string): Promise<Review | null> => {
    try {
      // This would be replaced with a real Supabase query
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      const review = MOCK_REVIEWS.find(r => r.id === id);
      return Promise.resolve(review || null);
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new review
  createReview: async (reviewData: Omit<Review, 'id' | 'created_at'>): Promise<Review> => {
    try {
      // This would be replaced with a real Supabase insert
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .insert([{ 
      //     ...reviewData,
      //     created_at: new Date().toISOString()
      //   }])
      //   .select()
      //   .single();
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      const newReview: Review = {
        id: (MOCK_REVIEWS.length + 1).toString(),
        ...reviewData,
        created_at: new Date().toISOString()
      };
      MOCK_REVIEWS.unshift(newReview);
      return Promise.resolve(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },
  
  // Update an existing review
  updateReview: async (id: string, reviewData: Partial<Review>): Promise<Review> => {
    try {
      // This would be replaced with a real Supabase update
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .update(reviewData)
      //   .eq('id', id)
      //   .select()
      //   .single();
      
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      const index = MOCK_REVIEWS.findIndex(r => r.id === id);
      if (index === -1) throw new Error(`Review with id ${id} not found`);
      
      MOCK_REVIEWS[index] = { ...MOCK_REVIEWS[index], ...reviewData };
      return Promise.resolve(MOCK_REVIEWS[index]);
    } catch (error) {
      console.error(`Error updating review ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a review
  deleteReview: async (id: string): Promise<void> => {
    try {
      // This would be replaced with a real Supabase delete
      // const { error } = await supabase
      //   .from('reviews')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      // Using mock data for now
      const index = MOCK_REVIEWS.findIndex(r => r.id === id);
      if (index === -1) throw new Error(`Review with id ${id} not found`);
      
      MOCK_REVIEWS.splice(index, 1);
      return Promise.resolve();
    } catch (error) {
      console.error(`Error deleting review ${id}:`, error);
      throw error;
    }
  },
  
  // Get review statistics
  getReviewStats: async (): Promise<{ average: number; total: number; distribution: number[] }> => {
    try {
      // This would be calculated from real data in Supabase
      // const { data, error } = await supabase
      //   .from('reviews')
      //   .select('rating');
      
      // if (error) throw error;
      
      // Using mock data for now
      const distribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
      let sum = 0;
      
      MOCK_REVIEWS.forEach(review => {
        sum += review.rating;
        distribution[5 - review.rating]++;
      });
      
      const average = MOCK_REVIEWS.length > 0 ? sum / MOCK_REVIEWS.length : 0;
      
      return Promise.resolve({
        average,
        total: MOCK_REVIEWS.length,
        distribution
      });
    } catch (error) {
      console.error("Error calculating review stats:", error);
      throw error;
    }
  }
};

export default reviewService;
