import { motion } from "framer-motion";

const BookShowcase = () => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-500 to-[#FFB700] py-24 overflow-hidden">
      {/* Background Glow Effect */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `radial-gradient(circle at top, rgba(255, 255, 255, 0.2), transparent 70%)` 
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-center text-white tracking-tight drop-shadow-lg mb-12"
        >
          About the Book
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-white"
          >
            <h3 className="text-4xl font-semibold drop-shadow-md">
              What Makes This Book Special
            </h3>
            <p className="text-lg leading-relaxed opacity-90">
              Uncover the powerful strategies that have helped countless individuals 
              break barriers, achieve success, and transform their lives.
            </p>
            <p className="italic text-lg text-white/90">
              "Possibly the most eye-opening and transformative personal growth book ever written..."
            </p>
            <p className="text-lg opacity-95">
              If you haven't heard of <span className="font-bold text-white">Resk'que</span> before, here’s what you need to know—through 
              years of experience and relentless pursuit of excellence, Resk'que has developed a 
              proven system to help individuals elevate their mindset, overcome limitations, and 
              unlock their highest potential.
            </p>
          </motion.div>

          {/* Book Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <img 
              src="/lovable-uploads/download (1).png" 
              alt="Book Cover" 
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Read More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.6 }} 
          className="mt-12 text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default BookShowcase;
