import { Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";

const OrderConfirmationModal = () => {
  const { closeConfirmation } = useCart();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeConfirmation();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full text-center p-8 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-green-500 text-6xl flex justify-center">
          <Check className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-4">Thank You for Your Order!</h2>
        <p className="text-gray-600 mb-6">
          We've received your order and will contact you shortly to confirm. 
          A confirmation email has been sent to your address.
        </p>
        <Button 
          onClick={closeConfirmation}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
