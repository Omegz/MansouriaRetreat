import { useState } from "react";
import { X, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const CheckoutModal = () => {
  const { cartItems, cartTotal, closeCheckout, clearCart, openConfirmation } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare order items
      const items = cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        option: item.option,
        imageUrl: item.imageUrl
      }));
      
      // Submit order to backend
      await apiRequest("POST", "/api/orders", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        items,
        total: cartTotal
      });
      
      // Clear cart and show confirmation
      clearCart();
      closeCheckout();
      openConfirmation();
      
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Order Submission Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-10" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-heading font-bold text-primary">Checkout</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCheckout}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={`${item.id}-${item.option}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.option}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="py-3 px-4 text-right font-semibold" colSpan={2}>Total:</td>
                  <td className="py-3 px-4 text-right font-bold text-primary">{formatCurrency(cartTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567" 
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <Textarea 
                id="address" 
                name="address" 
                value={formData.address}
                onChange={handleChange}
                rows={3} 
                placeholder="123 Main St, Anytown, AN 12345" 
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="notes" className="block text-gray-700 font-semibold mb-2">
                Order Notes (Optional)
              </label>
              <Textarea 
                id="notes" 
                name="notes" 
                value={formData.notes}
                onChange={handleChange}
                rows={3} 
                placeholder="Any special instructions or requests..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : (
                <>
                  Place Order <Check className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
