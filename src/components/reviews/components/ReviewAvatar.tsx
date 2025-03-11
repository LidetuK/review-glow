
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck } from 'lucide-react';

interface ReviewAvatarProps {
  name: string;
  createdAt?: string;
  verified?: boolean;
}

export const ReviewAvatar = ({ name, createdAt, verified = false }: ReviewAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const generatePlaceholderColor = (name: string) => {
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#03A9F4', '#E91E63', '#673AB7'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatDate = (dateString?: string) => {
    try {
      const date = dateString ? new Date(dateString) : new Date();
      // Format: Month Day, Year (e.g. Jan 15, 2023)
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).format(date);
    } catch (error) {
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).format(new Date());
    }
  };

  // We're forcing verified to be true here as well for consistency
  const isVerified = true; // Changed this to ensure verification is visible

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border-2 border-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.9)]">
        <AvatarFallback 
          style={{ backgroundColor: generatePlaceholderColor(name) }}
          className="text-white font-medium"
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <div className="flex items-center">
          <h4 className="font-medium text-white text-base mr-1.5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 transition-all hover:from-blue-300 hover:to-cyan-200">{name}</h4>
          {isVerified && <BadgeCheck className="h-4 w-4 text-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />}
        </div>
        {createdAt && <span className="text-gray-400 text-xs">{formatDate(createdAt)}</span>}
      </div>
    </div>
  );
};
