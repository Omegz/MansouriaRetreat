import { Elysia, t } from "elysia";
import { storage } from "./storage";
import { insertProductSchema, insertContactMessageSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Elysia) {
  return app.group("/api", (app) => app
    // Products routes
    .get("/products", async () => {
      try {
        const products = await storage.getAllProducts();
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products");
      }
    })

    .get("/products/:id", async ({ params, error }) => {
      try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
          return error(400, { message: "Invalid product ID" });
        }
        
        const product = await storage.getProductById(id);
        if (!product) {
          return error(404, { message: "Product not found" });
        }
        
        return product;
      } catch (err) {
        console.error("Error fetching product:", err);
        return error(500, { message: "Error fetching product" });
      }
    }, {
      params: t.Object({
        id: t.String()
      })
    })

    .post("/products", async ({ body, error }) => {
      try {
        const productData = insertProductSchema.parse(body);
        const newProduct = await storage.createProduct(productData);
        return newProduct;
      } catch (err) {
        if (err instanceof z.ZodError) {
          return error(400, { 
            message: "Invalid product data", 
            errors: err.errors 
          });
        }
        console.error("Error creating product:", err);
        return error(500, { message: "Error creating product" });
      }
    })

    .patch("/products/:id", async ({ params, body, error }) => {
      try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
          return error(400, { message: "Invalid product ID" });
        }
        
        const productData = insertProductSchema.parse(body);
        const updatedProduct = await storage.updateProduct(id, productData);
        
        if (!updatedProduct) {
          return error(404, { message: "Product not found" });
        }
        
        return updatedProduct;
      } catch (err) {
        if (err instanceof z.ZodError) {
          return error(400, { 
            message: "Invalid product data", 
            errors: err.errors 
          });
        }
        console.error("Error updating product:", err);
        return error(500, { message: "Error updating product" });
      }
    }, {
      params: t.Object({
        id: t.String()
      })
    })

    .delete("/products/:id", async ({ params, error }) => {
      try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
          return error(400, { message: "Invalid product ID" });
        }
        
        const result = await storage.deleteProduct(id);
        if (!result) {
          return error(404, { message: "Product not found" });
        }
        
        return { message: "Product deleted successfully" };
      } catch (err) {
        console.error("Error deleting product:", err);
        return error(500, { message: "Error deleting product" });
      }
    }, {
      params: t.Object({
        id: t.String()
      })
    })

    // Contact form submission
    .post("/contact", async ({ body, error }) => {
      try {
        const contactData = insertContactMessageSchema.parse(body);
        const newContact = await storage.createContactMessage(contactData);
        
        return { 
          message: "Contact message received successfully",
          id: newContact.id
        };
      } catch (err) {
        if (err instanceof z.ZodError) {
          return error(400, { 
            message: "Invalid contact data", 
            errors: err.errors 
          });
        }
        console.error("Error processing contact form:", err);
        return error(500, { message: "Error processing contact form" });
      }
    })

    // Orders
    .post("/orders", async ({ body, error }) => {
      try {
        const orderData = insertOrderSchema.parse(body);
        const newOrder = await storage.createOrder(orderData);
        
        return {
          message: "Order placed successfully",
          id: newOrder.id
        };
      } catch (err) {
        if (err instanceof z.ZodError) {
          return error(400, { 
            message: "Invalid order data", 
            errors: err.errors 
          });
        }
        console.error("Error processing order:", err);
        return error(500, { message: "Error processing order" });
      }
    })
  );
}
