
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BookInfoProps {
  title: string;
  author: string;
  coverImage: string;
  className?: string;
}

const BookInfo = ({ title, author, coverImage, className }: BookInfoProps) => {
  return (
    <div className={cn("relative py-20 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-book-red/10 to-white dark:from-book-red/5 dark:to-gray-950"
        style={{ 
          opacity: 0.8,
          backgroundImage: `radial-gradient(ellipse at top, rgba(255, 72, 0, 0.15), transparent 70%)` 
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform rotate-1">
              <img 
                src={coverImage} 
                alt={title} 
                className="w-full h-auto max-w-[280px]"
              />
              <div className="absolute inset-0 shadow-inner"></div>
            </div>
            <div 
              className="absolute -bottom-6 -right-6 h-40 w-40 bg-book-orange rounded-full blur-3xl opacity-20 -z-10"
              aria-hidden="true"
            />
          </motion.div>
          
          <div className="md:flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center md:text-left space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-book-dark">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground">
                by <span className="font-medium">{author}</span>
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-book-orange/10 text-book-orange rounded-full text-sm font-medium">
                  #1 Bestseller
                </span>
                <span className="px-3 py-1 bg-book-dark/5 rounded-full text-sm font-medium dark:bg-book-dark/20">
                  Marketing
                </span>
                <span className="px-3 py-1 bg-book-dark/5 rounded-full text-sm font-medium dark:bg-book-dark/20">
                  Sales
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookInfo;
