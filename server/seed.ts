import { db } from './db';
import { products, type InsertProduct } from '@shared/schema';

async function seedDatabase() {
  console.log('Checking if products table needs seeding...');
  
  // Check if we already have products
  const existingProducts = await db.select().from(products);
  
  if (existingProducts.length > 0) {
    console.log(`Database already has ${existingProducts.length} products. Skipping seed.`);
    return;
  }
  
  console.log('Seeding products...');
  
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
      options: ["5kg", "10kg", "15kg"],
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
      options: ["200g", "500g", "1kg"],
      active: true
    }
  ];
  
  // Insert products in batches
  await db.insert(products).values(sampleProducts);
  
  console.log(`Successfully seeded ${sampleProducts.length} products.`);
}

export { seedDatabase };