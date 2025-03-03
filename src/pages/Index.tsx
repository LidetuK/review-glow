
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-16 relative bg-gray-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"
            style={{ 
              opacity: 0.8,
              backgroundImage: `radial-gradient(ellipse at top, rgba(255, 72, 0, 0.1), transparent 60%)` 
            }}
          />
          
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 text-center md:text-left"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-book-dark">
                    "Possibly The Most <span className="text-book-red">Controversial</span> Marketing Book"
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Join thousands of businesses who have transformed their sales with Sabri Suby's #1 bestseller.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link to="/reviews">
                      <Button className="bg-book-orange hover:bg-book-orange/90 text-white">
                        <Star className="mr-2 h-4 w-4" />
                        Read Reviews
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Get The Book
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start text-muted-foreground text-sm">
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      5,580+ Reviews
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      #1 Bestseller
                    </span>
                  </div>
                </motion.div>
              </div>
              
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <img 
                    src="public/lovable-uploads/7ce3b083-e0bb-4d89-a77f-df5a9e7ce8ad.png" 
                    alt="Sell Like Crazy Book" 
                    className="w-full h-auto max-w-lg mx-auto"
                  />
                  <div 
                    className="absolute -bottom-6 -right-6 h-40 w-40 bg-book-orange rounded-full blur-3xl opacity-20 -z-10"
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Reviews Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight">What Readers Are Saying</h2>
                <p className="mt-3 text-muted-foreground">
                  Don't just take our word for it, hear from those who've applied these strategies
                </p>
              </motion.div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Richard S.",
                  role: "Marketing Director",
                  content: "Read the whole book. Learned a lot. Now setting up the systems. Easy to read and understand. Thank you.",
                  rating: 5
                },
                {
                  name: "Mark Z.",
                  role: "Entrepreneur",
                  content: "Blew my mind. Such a multidimensional perspective on business. Literally should be a mandatory reading for entrepreneurs.",
                  rating: 5
                },
                {
                  name: "Giancarlos H.",
                  role: "Business Owner",
                  content: "This book changed my life. The frameworks presented in this book taught me how to run my business and changed my perspective on marketing.",
                  rating: 5
                }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <div className="h-full p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-book-orange/10 text-book-orange flex items-center justify-center font-semibold">
                          {review.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-book-orange fill-book-orange' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/reviews">
                <Button variant="outline" className="mt-4">
                  View All Reviews
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-book-orange text-white relative overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ 
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at top right, white, transparent 60%)` 
            }}
          />
          
          <div className="container max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                  Get your copy of "Sell Like Crazy" today and discover the secrets to unstoppable business growth.
                </p>
                <Button size="lg" className="bg-white text-book-orange hover:bg-white/90">
                  Get The Book Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
