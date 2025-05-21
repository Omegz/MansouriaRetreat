import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  contactMessages, type ContactMessage, type InsertContactMessage,
  orders, type Order, type InsertOrder
} from "@shared/schema";

export interface IStorage {
  // User methods (keeping existing ones)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private contactMessages: Map<number, ContactMessage>;
  private orders: Map<number, Order>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private contactCurrentId: number;
  private orderCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contactMessages = new Map();
    this.orders = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.contactCurrentId = 1;
    this.orderCurrentId = 1;
    
    // Add some sample products
    this.seedSampleProducts();
  }

  // Helper to seed sample products
  private seedSampleProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Organic Honey",
        description: "Raw, unfiltered honey from our own beehives, collected with care to preserve all natural benefits.",
        benefits: "Rich in antioxidants and has antibacterial properties. Local honey may help with seasonal allergies.",
        price: 1250, // $12.50
        category: "honey",
        imageUrl: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
        options: ["250g", "500g", "1kg"],
        active: true
      },
      {
        name: "Farm Fresh Eggs",
        description: "Free-range eggs from our happy, pasture-raised chickens fed with organic grains.",
        benefits: "Higher in omega-3 fatty acids and vitamin E than conventional eggs. Lower in cholesterol.",
        price: 675, // $6.75
        category: "dairy",
        imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05",
        options: ["Half Dozen", "Dozen", "Tray (30)"],
        active: true
      },
      {
        name: "Homemade Jams",
        description: "Delicious preserves made from our seasonal fruits, with no artificial additives.",
        benefits: "Made with organic fruit and less sugar than commercial jams. Great source of vitamin C.",
        price: 895, // $8.95
        category: "preserves",
        imageUrl: "https://images.unsplash.com/photo-1607257884360-bc74cba4a419",
        options: ["Strawberry", "Mixed Berry", "Apricot", "Fig"],
        active: true
      },
      {
        name: "Seasonal Vegetables",
        description: "Freshly harvested seasonal vegetables grown with sustainable farming practices.",
        benefits: "Higher nutrient content due to being harvested at peak ripeness. Zero pesticides or chemicals.",
        price: 2450, // $24.50
        category: "produce",
        imageUrl: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499",
        options: ["Small Basket", "Family Basket", "Individual Items"],
        active: true
      },
      {
        name: "Extra Virgin Olive Oil",
        description: "Cold-pressed olive oil from our grove, rich in flavor and natural antioxidants.",
        benefits: "High in monounsaturated fats and antioxidants. May help reduce inflammation and heart disease risk.",
        price: 1875, // $18.75
        category: "oils",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
        options: ["250ml", "500ml", "1L"],
        active: true
      },
      {
        name: "Artisanal Cheese",
        description: "Traditional handcrafted cheese made from our farm's milk using ancestral recipes.",
        benefits: "Rich in calcium and protein. Our natural aging process enhances flavor and probiotic content.",
        price: 1625, // $16.25
        category: "dairy",
        imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
        options: ["Fresh", "Aged", "Herb-infused"],
        active: true
      }
    ];
    
    for (const product of sampleProducts) {
      this.createProduct(product);
    }
  }

  // User methods (keeping existing ones)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, updateProduct: InsertProduct): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return undefined;
    }
    
    const updatedProduct: Product = { ...updateProduct, id };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    if (!this.products.has(id)) {
      return false;
    }
    return this.products.delete(id);
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactCurrentId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    
    // Simulate sending an email to admin
    console.log(`[Email to Admin] New contact message from ${message.name} (${message.email}): ${message.message}`);
    
    return message;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    
    // Simulate sending an email to admin
    console.log(`[Email to Admin] New order #${id} from ${order.name} (${order.phone})`);
    console.log(`Items: ${JSON.stringify(order.items)}`);
    console.log(`Total: $${(order.total / 100).toFixed(2)}`);
    console.log(`Address: ${order.address}`);
    if (order.notes) {
      console.log(`Notes: ${order.notes}`);
    }
    
    return order;
  }
}

export const storage = new MemStorage();
