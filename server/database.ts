import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  contactMessages, type ContactMessage, type InsertContactMessage,
  orders, type Order, type InsertOrder
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }
  
  async updateProduct(id: number, updateProduct: InsertProduct): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updateProduct)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });
    return result.length > 0;
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    
    // Simulate sending an email to admin (in a real app, you'd use an email service)
    console.log(`[Email to Admin] New contact message from ${message.name} (${message.email}): ${message.message}`);
    
    return message;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    
    // Simulate sending an email to admin
    console.log(`[Email to Admin] New order #${order.id} from ${order.name}`);
    console.log(`Contact: Email - ${order.email} | Phone - ${order.phone}`);
    console.log(`Items ordered:`);
    
    // Format order items in a more readable way
    if (Array.isArray(order.items)) {
      order.items.forEach((item: any) => {
        console.log(`- ${item.name} (${item.option}) - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity / 100).toFixed(2)}`);
      });
    } else {
      console.log(`Items: ${JSON.stringify(order.items)}`);
    }
    
    console.log(`Total: $${(order.total / 100).toFixed(2)}`);
    console.log(`Delivery Address: ${order.address}`);
    if (order.notes) {
      console.log(`Customer Notes: ${order.notes}`);
    }
    
    // In a real implementation, this would send an actual email to the admin
    // using a service like SendGrid, AWS SES, or another email provider
    
    return order;
  }
}