import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../contexts/CartContext";
import { Menu, ShoppingBasket, X } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const { cartItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-primary">
            Mansouria Retreat
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                className={`${
                  location === link.path 
                    ? "text-primary font-semibold" 
                    : "text-neutral-dark hover:text-primary"
                } transition`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="relative ml-4">
              <button 
                onClick={openCart}
                className="text-neutral-dark hover:text-primary transition text-xl"
              >
                <ShoppingBasket size={24} />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={openCart}
                className="text-neutral-dark hover:text-primary transition text-xl"
              >
                <ShoppingBasket size={24} />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </button>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-dark hover:text-primary transition text-xl"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 py-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    location === link.path
                      ? "text-primary font-semibold"
                      : "text-neutral-dark hover:text-primary"
                  } transition`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/admin" 
                className="text-neutral-dark hover:text-primary transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
