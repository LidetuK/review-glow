
// List of negative words to check for
const negativeWords = [
  'bad',
  'terrible',
  'awful',
  'horrible',
  'disappointing',
  'waste',
  'useless',
  'refund',
  'scam',
  'fraud',
  'ripoff',
  'rip-off',
  'unhappy',
  'dissatisfied',
  'regret',
  'worst',
  'avoid',
  'trash'
];

// Safe way to check for negative content
export const containsNegativeContent = (text: string): boolean => {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Simple word matching approach instead of regex
  return negativeWords.some(word => {
    return lowerText.includes(word);
  });
};
