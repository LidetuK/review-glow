import { useState } from "react";
import { motion } from "framer-motion";

const BookExperience = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative bg-black text-white overflow-hidden py-32">
      {/* Background Glow */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `radial-gradient(circle at center, rgba(255, 72, 0, 0.2), transparent 80%)`
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold text-center tracking-tight drop-shadow-lg mb-16"
        >
          Experience the Book Like Never Before
        </motion.h2>

        {/* Interactive Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Interactive Text Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-semibold drop-shadow-md">
              A Journey of Transformation
            </h3>
            <p className="text-lg leading-relaxed text-gray-300">
              Every page of this book is designed to challenge, inspire, and reshape the way you think. 
              Engage with interactive elements, revealing hidden insights as you scroll.
            </p>
            <p className="italic text-lg text-gray-400">
              "A book that doesn’t just inform—it transforms."
            </p>
            <p className="text-lg text-gray-300">
              Swipe through key lessons, uncover thought-provoking questions, and dive into a 
              reading experience unlike any other.
            </p>
          </motion.div>

          {/* Interactive Book Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <motion.img 
              src="/lovable-uploads/Elevate_Higher_Book_Mockup_4-removebg-preview.png" 
              alt="Book Cover" 
              className="w-full max-w-lg rounded-lg shadow-2xl transform transition duration-500 hover:scale-105"
              whileHover={{ rotate: 3, scale: 1.05 }}
            />
          </motion.div>
        </div>

        {/* Read More Section */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#FFB700] text-black font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </motion.button>

          {/* Collapsible Content */}
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white text-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-left"
            >
              <h3 className="text-2xl font-bold mb-4">Elevate Higher by Resk'que – A Game-Changer in Personal Growth and Success</h3>
              <p className="text-lg leading-relaxed mb-4">
                When you come across a book that challenges conventional wisdom and offers a fresh perspective on personal and professional growth, you know it's something worth reading. 
                <span className="font-semibold"> Elevate Higher by Resk'que</span> is that book—a transformative guide designed to help individuals break through limitations and unlock their true potential.
              </p>
              <p className="text-lg mb-4">
                This isn't just another self-help book filled with vague motivation. Elevate Higher delivers a powerful, actionable framework to help you rise above setbacks, develop a growth mindset, and take control of your destiny.
              </p>

              <h4 className="text-xl font-semibold mt-6">A Roadmap to Personal Mastery and Success</h4>
              <p className="text-lg mb-4">
                If you've ever felt stuck in life—whether in your career, relationships, or personal development—Elevate Higher provides the clarity and strategies you need to push forward.
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-semibold">The Power of Perspective:</span> Learn how shifting your mindset can change your reality.</li>
                <li><span className="font-semibold">Overcoming Self-Doubt:</span> Strategies to silence your inner critic and build unshakable confidence.</li>
                <li><span className="font-semibold">Taking Decisive Action:</span> Practical steps to move from planning to execution.</li>
                <li><span className="font-semibold">Sustaining Growth:</span> How to stay consistent and keep elevating, no matter the obstacles.</li>
              </ul>

              <h4 className="text-xl font-semibold mt-6">Rave Reviews for Elevate Higher</h4>
              <p className="text-lg mb-4">
                Readers worldwide have praised Elevate Higher for its straightforward yet profound approach to self-improvement. Many have described it as a "wake-up call" that pushes them to take action and stop settling for mediocrity.
              </p>

              <h4 className="text-xl font-semibold mt-6">A Must-Read for Anyone Serious About Growth</h4>
              <p className="text-lg">
                If you're ready to step out of your comfort zone and start living with purpose, Elevate Higher is your guide. This book will challenge you to think bigger, act bolder, and achieve more than you ever thought possible.
              </p>
              <p className="text-lg mt-4 font-bold">So, are you ready to elevate your life? Grab your copy today and take the first step toward your highest potential!</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookExperience;
