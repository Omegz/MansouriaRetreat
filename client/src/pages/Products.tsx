import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductsContext";
import { productCategories } from "../lib/utils";

const Products = () => {
  const [_, params] = useLocation();
  const searchParams = new URLSearchParams(params);
  const initialCategoryParam = searchParams.get('category');
  
  const { products, isLoading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState(initialCategoryParam || "all");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter products based on active category
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = activeCategory === "all" 
        ? products 
        : products.filter(product => product.category === activeCategory);
      
      setDisplayedProducts(filtered);
      // Reset visible count when changing category
      setVisibleCount(6);
    }
  }, [activeCategory, products]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="bg-red-100 p-4 rounded-lg text-red-700 text-center">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5f1] px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-6">Our Farm Products</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Discover our range of organic farm products, harvested and prepared with care for the best quality and taste.
        </p>
        
        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {productCategories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-gray-100 text-neutral-dark"
              }
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-xl font-semibold text-gray-600">No products available in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProducts.slice(0, visibleCount).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Load More Button */}
            {visibleCount < displayedProducts.length && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-3 px-6 rounded-lg transition"
                  onClick={loadMore}
                >
                  Load More Products
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
