
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
      return new Intl.DateTimeFormat('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit' 
      }).format(date);
    } catch (error) {
      return new Intl.DateTimeFormat('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit' 
      }).format(new Date());
    }
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <Avatar className="h-10 w-10 border-2 border-blue-500">
        <AvatarFallback 
          style={{ backgroundColor: generatePlaceholderColor(name) }}
          className="text-white font-medium"
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col">
        <div className="flex items-center">
          <h4 className="font-medium text-white text-base mr-1.5">{name}</h4>
          {verified && <BadgeCheck className="h-7 w-7 text-blue-500" />}
        </div>
        {createdAt && <span className="text-gray-400 text-xs">{formatDate(createdAt)}</span>}
      </div>
    </div>
  );
};
