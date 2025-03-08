
// Extremely comprehensive list of negative patterns with extra sensitivity
export const containsNegativeContent = (content: string): boolean => {
  const negativePatterns = [
    // General negative terms
    'terrible', 'awful', 'horrible', 'worst', 'bad', 'hate', 'dislike', 
    'disappointing', 'waste', 'useless', 'scam', 'fraud', 'refund',
    'poor quality', 'not worth', 'regret', 'unhappy', 'dissatisfied',
    'broken', 'defective', 'sucks', 'low quality', 'cheap', 'overpriced',
    'misleading', 'false', 'ineffective', 'doesn\'t work', 'failed',
    'avoid', 'stay away', 'don\'t buy', 'unprofessional', 'dishonest',
    'lying', 'incomplete', 'missing', 'problem', 'error', 'mistake',
    'not as described', 'faulty', 'damaged', 'return', 'complained',
    'upset', 'angry', 'furious', 'ridiculous', 'joke',
    
    // Profanity and offensive language - comprehensive 
    'fuck', 'shit', 'damn', 'crap', 'ass', 'hell', 'bitch', 'bastard', 
    'wtf', 'stfu', 'omfg', 'ffs', 'bs', 'bullshit', 'piss', 'dick', 'cock',
    'pussy', 'nigga', 'nigger', 'fag', 'faggot', 'retard', 'retarded', 'kys',
    'kill yourself', 'suicide', 'die', 'death', 'bombing', 'porn', 'pornography',
    'jerk', 'f*ck', 'f**k', 'sh*t', 'sh**', 'b*tch', 'p*ss',
    
    // Slurs and discriminatory language
    'racist', 'sexist', 'homophobic', 'transphobic', 'bigot', 'discrimination',
    'nazi', 'hitler', 'holocaust', 'slavery', 'slut', 'whore', 'terrorist',
    
    // Additional negative expressions
    'pathetic', 'garbage', 'junk', 'trash', 'stupid', 'dumb', 'idiot', 
    'lame', 'mediocre', 'boring', 'dull', 'confusing', 'pointless',
    'disaster', 'catastrophe', 'nightmare', 'fiasco', 'mess', 'shambles',
    'letdown', 'disappointing', 'unacceptable', 'unsatisfactory',
    'inferior', 'subpar', 'second-rate', 'third-rate', 'unworthy',
    'rip-off', 'con', 'swindle', 'cheat', 'dubious', 'suspicious',
    'flawed', 'imperfect', 'buggy', 'glitchy', 'unreliable',
    'annoying', 'irritating', 'frustrating', 'aggravating',
    'yikes', 'oof', 'meh', 'bleh', 'ugh', 'eww', 'gross',
    
    // More subtle negative expressions
    'not great', 'could be better', 'somewhat', 'just ok', 'just okay', 
    'not impressed', 'mildly', 'kind of', 'sort of', 'expected more',
    'too expensive', 'too cheap', 'too difficult', 'too easy', 'too complicated',
    'not enough', 'too much', 'lacking', 'falls short', 'skimped',
    
    // Content-specific negativity
    'outdated', 'obsolete', 'typos', 'errors', 'contradictory', 
    'unclear', 'vague', 'repetitive', 'redundant', 'shallow',
    'superficial', 'basic', 'elementary', 'slow', 'tedious'
  ];
  
  const lowerContent = content.toLowerCase();
  
  // Strict check for exact matches and word boundaries
  return negativePatterns.some(pattern => {
    const regex = new RegExp(`(^|[^a-z])${pattern}($|[^a-z])`, 'i');
    return regex.test(lowerContent);
  });
};

// Additional content filter functions can be added here in the future
