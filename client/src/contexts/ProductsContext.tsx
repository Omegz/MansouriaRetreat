import React, { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  refreshProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    onError: (err) => {
      console.error("Error fetching products:", err);
      setError(err as Error);
    },
  });

  const refreshProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/products"] });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        refreshProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
