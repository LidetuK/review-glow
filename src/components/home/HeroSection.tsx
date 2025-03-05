
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden py-32">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: 0.9,
          backgroundImage: `radial-gradient(circle at top, rgba(255, 72, 0, 0.15), transparent 60%)` 
        }}
      />

      {/* Content Container */}
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Headline Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold leading-tight tracking-tight text-gray-900">
              "Quite possibly the most 
              <span className="text-book-red drop-shadow-md"> provocative </span> 
              book ever written for developing a better mindset and achieving success..."
            </h1>
          </motion.div>

          {/* Book Image Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="w-full max-w-xl mx-auto"
          >
            <img 
              src="/lovable-uploads/8ebd4889-d01b-480e-942a-42139c5c9167.png" 
              alt="Book Cover" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
