import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Mansouria Retreat</h3>
            <p className="mb-6">Experience authentic farm life and organic products in a tranquil countryside setting.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white hover:text-secondary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white hover:text-secondary transition">
                  Our Products
                </Link>
              </li>
              <li>
                <a href="/#events" className="text-white hover:text-secondary transition">
                  Events & Workshops
                </a>
              </li>
              <li>
                <a href="/#about" className="text-white hover:text-secondary transition">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-secondary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Farm Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=honey" className="text-white hover:text-secondary transition">
                  Honey & Bee Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=produce" className="text-white hover:text-secondary transition">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link href="/products?category=dairy" className="text-white hover:text-secondary transition">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link href="/products?category=preserves" className="text-white hover:text-secondary transition">
                  Preserves & Jams
                </Link>
              </li>
              <li>
                <Link href="/products?category=oils" className="text-white hover:text-secondary transition">
                  Oils & Vinegars
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 shrink-0 mt-1" size={20} />
                <span>Mansouria Farm, Rural Route 7<br />Countryside Valley, CV 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 shrink-0" size={20} />
                <span>info@mansouriaretreat.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-3 shrink-0 mt-1" size={20} />
                <span>Wednesday to Sunday: 9:00 AM - 5:00 PM<br />Monday & Tuesday: Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mansouria Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
