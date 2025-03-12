import { Link } from "react-router-dom";
import { Facebook, Mail, Instagram, X as TwitterX, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        {/* Subtitle - Styled Like the Image */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white font-extrabold text-5xl md:text-6xl lg:text-[4rem] leading-tight tracking-tight"
        >
          <span className="text-[#FF4A3D]">Unlock</span> the{" "}
          <span className="text-[#FF4A3D]">mindset, habits, and strategies</span>  
          to rise above limits and create a life of{" "}
          <span className="text-[#FF4A3D]">purpose, impact, and success.</span>
        </motion.p>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mt-8"
        >
          {/* Email */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-gray-600 hover:border-yellow-400 transition-all hover:scale-125 hover:shadow-lg hover:shadow-yellow-400/50"
            onClick={() => window.location.href = "mailto:Booking.Reskque@gmail.com"}
          >
            <Mail className="h-6 w-6 text-black hover:text-yellow-400 transition-colors" />
          </Button>

          {/* Twitter */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-gray-600 hover:border-yellow-400 transition-all hover:scale-125 hover:shadow-lg hover:shadow-yellow-400/50"
            onClick={() => window.open("https://twitter.com/reskque", "_blank")}
          >
            <TwitterX className="h-6 w-6 text-black hover:text-yellow-400 transition-colors" />
          </Button>

          {/* Instagram */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-gray-600 hover:border-yellow-400 transition-all hover:scale-125 hover:shadow-lg hover:shadow-yellow-400/50"
            onClick={() => window.open("https://www.instagram.com/reskque/p/DGV7ZjiOC8a/", "_blank")}
          >
            <Instagram className="h-6 w-6 text-black hover:text-yellow-400 transition-colors" />
          </Button>

          {/* Facebook */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 border-gray-600 hover:border-yellow-400 transition-all hover:scale-125 hover:shadow-lg hover:shadow-yellow-400/50"
            onClick={() => window.open("https://www.facebook.com/ireskque/", "_blank")}
          >
            <Facebook className="h-6 w-6 text-black hover:text-yellow-400 transition-colors" />
          </Button>
        </motion.div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Elevate Higher. All rights reserved.
          </p>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0"
          >
            <Button
              variant="ghost"
              className="text-white hover:text-book-orange transition-all"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5 mr-2" />
              Back to top
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
