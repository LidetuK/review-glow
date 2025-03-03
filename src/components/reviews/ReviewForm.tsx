
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/types/review';
import StarRatingInput from './StarRatingInput';
import FormField from './FormField';

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
            <StarRatingInput 
              rating={rating}
              onChange={setRating}
              error={errors.rating}
            />
            
            <FormField
              id="title"
              label="Review Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              errorMessage="Please provide a title for your review"
              required
              placeholder="Summarize your experience in a short title"
            />
            
            <FormField
              id="content"
              label="Review"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={errors.content}
              errorMessage="Please share your thoughts in the review"
              required
              placeholder="Share your experience with this book"
              multiline
              className="min-h-[120px]"
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                id="name"
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                errorMessage="Name is required"
                required
                placeholder="Enter your name"
              />
              
              <FormField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                errorMessage="Please enter a valid email"
                required
                placeholder="Enter your email"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              By submitting, you agree to our <a href="#" className="text-purple-600 underline">Terms of Service</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewForm;
