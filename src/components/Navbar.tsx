
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl mr-2 text-book-red">Sell Like</span>
            <span className="font-bold text-xl">Crazy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"} 
                className={cn(
                  "font-medium", 
                  isActive('/') && "bg-book-orange text-white hover:bg-book-orange/90"
                )}
              >
                Home
              </Button>
            </Link>
            <Link to="/reviews">
              <Button 
                variant={isActive('/reviews') ? "default" : "ghost"}
                className={cn(
                  "font-medium", 
                  isActive('/reviews') && "bg-book-orange text-white hover:bg-book-orange/90"
                )}
              >
                <Star className="mr-1 h-4 w-4" />
                Reviews
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant={isActive('/admin') ? "default" : "ghost"}
                className={cn(
                  "font-medium", 
                  isActive('/admin') && "bg-book-orange text-white hover:bg-book-orange/90"
                )}
              >
                <ShieldCheck className="mr-1 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-book-dark"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant={isActive('/') ? "default" : "ghost"} 
                  className={cn(
                    "w-full justify-start font-medium", 
                    isActive('/') && "bg-book-orange text-white hover:bg-book-orange/90"
                  )}
                >
                  Home
                </Button>
              </Link>
              <Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant={isActive('/reviews') ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start font-medium", 
                    isActive('/reviews') && "bg-book-orange text-white hover:bg-book-orange/90"
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </Button>
              </Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant={isActive('/admin') ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start font-medium", 
                    isActive('/admin') && "bg-book-orange text-white hover:bg-book-orange/90"
                  )}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
