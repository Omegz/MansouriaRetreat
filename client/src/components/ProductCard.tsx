import { useState } from "react";
import { ShoppingBasket, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../lib/utils";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<string>(
    Array.isArray(product.options) && product.options.length > 0 
      ? product.options[0] 
      : ""
  );
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    if (!selectedOption) return;
    
    setIsAdding(true);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      option: selectedOption,
      quantity: 1
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {Array.isArray(product.options) && product.options.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Select Option:</h4>
            <div className="flex flex-wrap gap-2">
              {product.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`px-3 py-1 rounded text-sm transition ${
                    selectedOption === option
                      ? "bg-primary/10 border-2 border-primary font-semibold"
                      : "bg-[#f8f5f1] hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded transition"
          >
            {isAdding ? (
              <>
                <Check className="mr-1" size={16} /> Added!
              </>
            ) : (
              <>
                Add to Cart <ShoppingBasket className="ml-1" size={16} />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
