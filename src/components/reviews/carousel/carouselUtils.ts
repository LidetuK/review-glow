import { Review } from "@/types/review";

// Calculate how many cards to show based on viewport width
export const getCardsToShow = (): number => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) return 1.2;  // Mobile - slight overlap for continuous feel
    if (window.innerWidth < 1024) return 2.2; // Tablet - slight overlap for continuous feel
    return 3.2; // Desktop - slight overlap for continuous feel
  }
  return 3.2; // Default for SSR
};

// Ensure we have enough reviews for smooth continuous looping
export const ensureEnoughReviews = (rowReviews: Review[]): Review[] => {
  const minLength = 30; // Increased for smoother looping
  if (rowReviews.length < minLength) {
    // Duplicate reviews until we have enough
    let duplicated = [...rowReviews];
    while (duplicated.length < minLength) {
      duplicated = [...duplicated, ...rowReviews];
    }
    return duplicated;
  }
  return rowReviews;
};

// Split reviews evenly across multiple rows
export const splitReviews = (reviews: Review[], rowCount: number = 6): Review[][] => {
  if (!reviews.length) return Array(rowCount).fill([]);
  
  // Ensure we have at least 36 reviews (6 per row)
  let paddedReviews = [...reviews];
  while (paddedReviews.length < rowCount * 6) {
    paddedReviews = [...paddedReviews, ...reviews];
  }
  
  const rowSize = Math.ceil(paddedReviews.length / rowCount);
  const rows = Array(rowCount).fill([]).map((_, index) => {
    const start = index * rowSize;
    const end = start + rowSize;
    // For every even-indexed row (2nd, 4th, 6th), reverse the array to create visual diversity
    const slicedReviews = paddedReviews.slice(start, end);
    const finalReviews = index % 2 === 1 ? [...slicedReviews].reverse() : slicedReviews;
    // Ensure each row has enough reviews for smooth looping
    return ensureEnoughReviews(finalReviews);
  });
  
  return rows;
};

// Duplicate the reviews multiple times to create seamless infinite scroll effect
export const duplicateReviews = (rowReviews: Review[], duplications: number = 6): Review[] => {
  let result: Review[] = [];
  
  // Create multiple duplications for smoother looping
  for (let i = 0; i < duplications; i++) {
    result = [...result, ...rowReviews];
  }
  
  return result;
};

// Calculate the width of each row based on card width
export const getRowWidth = (rowReviews: Review[], cardsToShow: number): number => {
  const cardWidth = 100 / cardsToShow; // percentage width of each card
  return (cardWidth * rowReviews.length) / 6; // divide by 6 as a base factor for the duplications
};

// Check if a row needs special timing (rows 2 and 4)
export const getRowSpeedMultiplier = (index: number): number => {
  // Rows 2 and 4 (indices 1 and 3) need even slower timing for contrast
  if (index === 1 || index === 3) return 0.7;
  // Other odd rows (reverse direction) get slight speed adjustment
  if (index % 2 === 1) return 0.85;
  return 1;
};
