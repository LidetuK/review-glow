
export const generateReviewTitle = (name: string): string => {
  const titles = [
    "Can't believe this book is free...", 
    "Absolutely amazing!", 
    "Life changing advice", 
    "Best purchase ever", 
    "Highly recommended",
    "A must-read!",
    "Exceeded expectations",
    "Worth every penny",
    "Good Book",
    "Fantastic resource",
    "Incredibly helpful",
    "Game changer",
    "Outstanding value",
    "Perfect for beginners",
    "Practical and insightful"
  ];
  
  const index = name.length % titles.length;
  return titles[index];
};

export const shouldShowEmoji = (): boolean => {
  return Math.random() > 0.7;
};
