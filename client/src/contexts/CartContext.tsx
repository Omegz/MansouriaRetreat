import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  option: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, option: string) => void;
  increaseQuantity: (id: number, option: string) => void;
  decreaseQuantity: (id: number, option: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  isConfirmationOpen: boolean;
  openConfirmation: () => void;
  closeConfirmation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("mansouriaCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mansouriaCart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      // Check if item already exists with same option
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.option === item.option
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${item.name} (${item.option}) has been added to your cart.`,
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: number, option: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.option === option))
    );
  };
  
  // Increase item quantity
  const increaseQuantity = (id: number, option: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.option === option
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  
  // Decrease item quantity
  const decreaseQuantity = (id: number, option: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id && item.option === option) {
          const newQuantity = Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Cart visibility functions
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  // Checkout modal visibility
  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);
  
  // Confirmation modal visibility
  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      isConfirmationOpen,
      openConfirmation,
      closeConfirmation
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
