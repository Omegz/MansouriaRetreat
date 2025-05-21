import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../lib/utils";

const ShoppingCart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    cartTotal, 
    closeCart, 
    openCheckout,
    isCartOpen
  } = useCart();

  // If cart is not open, don't render anything
  if (!isCartOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <>
      <div className="overlay" onClick={handleOverlayClick}></div>
      <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg overflow-y-auto z-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary">Your Cart</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeCart} 
              className="text-neutral-dark hover:text-primary hover:bg-transparent"
            >
              <X size={24} />
            </Button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-neutral-dark mb-4">Your cart is empty</p>
              <Button 
                onClick={closeCart}
                className="bg-primary hover:bg-primary/90"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.id}-${item.option}`}
                    className="border-b border-gray-200 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.option}</p>
                        <p className="text-sm font-semibold text-primary">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border rounded-md mr-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                          onClick={() => decreaseQuantity(item.id, item.option)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                          onClick={() => increaseQuantity(item.id, item.option)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-transparent"
                        onClick={() => removeFromCart(item.id, item.option)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatCurrency(cartTotal)}</span>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span>Total</span>
                  <span className="font-bold text-lg text-primary">{formatCurrency(cartTotal)}</span>
                </div>
                
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition"
                  onClick={() => {
                    closeCart();
                    openCheckout();
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
