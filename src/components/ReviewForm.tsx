import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '@/types/review';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    rating: false,
    title: false,
    content: false,
    name: false,
    email: false
  });

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      rating: rating === 0,
      title: title.trim() === '',
      content: content.trim() === '',
      name: name.trim() === '',
      email: !validateEmail(email)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Review submission failed",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        rating,
        title,
        content,
        name,
        email,
        verified: false,
        helpful_count: 0
      });
      
      toast({
        title: "Review submitted successfully!",
        description: "Thank you for sharing your thoughts.",
      });
      
      // Reset form
      setRating(0);
      setTitle('');
      setContent('');
      setName('');
      setEmail('');
    } catch (error) {
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">Write a Review</CardTitle>
          <CardDescription>Share your thoughts about this book</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rating" className="flex items-center">
                Rating <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <StarRating 
                  rating={rating} 
                  onChange={setRating} 
                  size={30} 
                  interactive={true} 
                  className={errors.rating ? "animate-shake" : ""}
                />
                <span className="text-sm text-muted-foreground ml-2">
                  {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
                </span>
              </div>
              <AnimatePresence>
                {errors.rating && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    Please select a rating
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                Review Title <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "border-red-500" : ""}
                placeholder="Summarize your experience in a short title"
              />
              <AnimatePresence>
                {errors.title && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    Please provide a title for your review
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="flex items-center">
                Review <span className="text-red-500 ml-1">*</span>
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cn(
                  "min-h-[120px] resize-none",
                  errors.content ? "border-red-500" : ""
                )}
                placeholder="Share your experience with this book"
              />
              <AnimatePresence>
                {errors.content && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm"
                  >
                    Please share your thoughts in the review
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  Your Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Enter your name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm"
                    >
                      Name is required
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="Enter your email"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm"
                    >
                      Please enter a valid email
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-book-orange hover:bg-book-orange/90 text-white font-semibold py-2 px-4 rounded transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              By submitting, you agree to our <a href="#" className="text-book-orange underline">Terms of Service</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewForm;
