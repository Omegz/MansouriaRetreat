import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { productCategories, getRandomImage } from "../lib/utils";
import { useProducts } from "../contexts/ProductsContext";
import { insertProductSchema, Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Edit, Trash2, Plus } from "lucide-react";

// Extend the product schema for the form
const productFormSchema = insertProductSchema.extend({
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  options: z.string().min(1, {
    message: "Options are required (comma-separated)",
  }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const Admin = () => {
  const { toast } = useToast();
  const { products, refreshProducts } = useProducts();
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Initialize form with empty values or editing product values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: editingProduct?.name || "",
      description: editingProduct?.description || "",
      benefits: editingProduct?.benefits || "",
      price: editingProduct ? String(editingProduct.price / 100) : "",
      category: editingProduct?.category || "honey",
      imageUrl: editingProduct?.imageUrl || "",
      options: editingProduct?.options ? 
        (Array.isArray(editingProduct.options) ? editingProduct.options.join(", ") : JSON.stringify(editingProduct.options)) : 
        "",
      active: editingProduct?.active !== undefined ? editingProduct.active : true,
    },
  });

  // Form reset function
  const resetForm = () => {
    form.reset({
      name: "",
      description: "",
      benefits: "",
      price: "",
      category: "honey",
      imageUrl: "",
      options: "",
      active: true,
    });
    setEditingProduct(null);
  };

  // Start editing a product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      description: product.description,
      benefits: product.benefits,
      price: String(product.price / 100),
      category: product.category,
      imageUrl: product.imageUrl,
      options: Array.isArray(product.options) ? product.options.join(", ") : JSON.stringify(product.options),
      active: product.active,
    });
    setIsCreating(true);
  };

  // Delete a product
  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await apiRequest("DELETE", `/api/products/${productId}`, undefined);
      
      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
      });
      
      refreshProducts();
    } catch (error) {
      console.error("Delete product error:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the product.",
        variant: "destructive",
      });
    }
  };

  // Form submission handler
  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Parse options from comma-separated string to array
      const optionsArray = data.options.split(",").map(option => option.trim());
      
      // Convert price from dollars to cents
      const priceInCents = Math.round(parseFloat(data.price) * 100);
      
      // Use dummy image if no URL provided
      const imageUrl = data.imageUrl || getRandomImage();
      
      const productData = {
        ...data,
        price: priceInCents,
        options: optionsArray,
        imageUrl,
      };
      
      if (editingProduct) {
        // Update existing product
        await apiRequest("PATCH", `/api/products/${editingProduct.id}`, productData);
        toast({
          title: "Product Updated",
          description: "The product has been successfully updated.",
        });
      } else {
        // Create new product
        await apiRequest("POST", "/api/products", productData);
        toast({
          title: "Product Created",
          description: "The new product has been successfully created.",
        });
      }
      
      // Reset form and refresh products
      resetForm();
      setIsCreating(false);
      refreshProducts();
      
    } catch (error) {
      console.error("Submit product error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error saving the product.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-6">Product Management</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Add, edit, and manage your farm products from this admin dashboard.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
              </CardHeader>
              <CardContent>
                {!isCreating ? (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setIsCreating(true)}
                  >
                    <Plus className="mr-2" size={16} /> Add New Product
                  </Button>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Organic Honey" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Raw, unfiltered honey from our own beehives..." 
                                rows={3} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="benefits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Benefits/Fun Facts</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Rich in antioxidants and has antibacterial properties..." 
                                rows={3} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="12.50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {productCategories.filter(cat => cat.id !== "all").map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="options"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Options (comma-separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="5kg, 10kg, 15kg" {...field} />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500">For quantities, use format like "5kg, 10kg, 15kg" or for size options use "Small, Medium, Large"</p>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500">Leave empty to use a default image</p>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex space-x-4">
                        <Button 
                          type="submit" 
                          className="flex-1 bg-primary hover:bg-primary/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : (editingProduct ? "Update" : "Create")}
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            resetForm();
                            setIsCreating(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Product List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Manage Products</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No products available</p>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setIsCreating(true)}
                    >
                      <Plus className="mr-2" size={16} /> Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center border p-4 rounded-lg">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            {product.category} • ${(product.price / 100).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
