
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Review } from '@/types/review';

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard = ({ review }: TestimonialCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Generate a random avatar placeholder based on the name
  const generatePlaceholderColor = (name: string) => {
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Extract job title and company if available
  const getJobInfo = (name: string) => {
    // For demo purposes, generating random job titles
    const titles = ['CEO', 'Product Manager', 'Operations Manager', 'Creative Director', 'Founder', 'COO'];
    const companies = ['Tech Company', 'Corporate', 'Agency', 'Startup', 'Enterprise'];
    
    const titleIndex = name.length % titles.length;
    const companyIndex = (name.charCodeAt(0) + name.length) % companies.length;
    
    return {
      title: titles[titleIndex],
      company: companies[companyIndex]
    };
  };

  const jobInfo = getJobInfo(review.name);

  return (
    <motion.div
      className="bg-gray-900/60 p-6 rounded-xl h-full flex flex-col min-h-[240px] border border-gray-800"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Stars rating at top */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
          />
        ))}
      </div>
      
      {/* Review content with quotation marks */}
      <p className="text-gray-300 text-base mb-6 flex-grow">
        "{review.content.length > 150 ? `${review.content.substring(0, 150)}...` : review.content}"
      </p>
      
      {/* Author information at bottom */}
      <div className="flex items-center mt-auto">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback 
            style={{ backgroundColor: generatePlaceholderColor(review.name) }}
            className="text-white text-sm"
          >
            {getInitials(review.name)}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h4 className="font-medium text-white text-sm">{review.name}</h4>
          <p className="text-gray-400 text-xs">{jobInfo.title} • {jobInfo.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
