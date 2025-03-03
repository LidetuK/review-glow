
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Book, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-2xl mr-2 text-book-red">Sell Like</span>
              <span className="font-bold text-2xl">Crazy</span>
            </Link>
            <p className="text-muted-foreground mt-4">
              Discover the marketing secrets that have helped thousands of businesses explode their sales with our bestselling book.
            </p>
            <div className="flex gap-4 mt-6">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Book className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Book Preview
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Free Chapters
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-book-orange transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sell Like Crazy. All rights reserved.
          </p>
          
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
