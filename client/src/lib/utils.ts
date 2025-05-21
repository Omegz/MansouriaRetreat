import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}

export const productCategories = [
  { id: "all", name: "All Products" },
  { id: "honey", name: "Honey & Bee Products" },
  { id: "dairy", name: "Dairy & Eggs" },
  { id: "produce", name: "Fruits & Vegetables" },
  { id: "preserves", name: "Preserves" },
  { id: "oils", name: "Oils & Vinegars" },
];

export const sampleProductImages = [
  "https://images.unsplash.com/photo-1589927986089-35812388d1f4", // honey
  "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05", // eggs
  "https://images.unsplash.com/photo-1607257884360-bc74cba4a419", // jam
  "https://images.unsplash.com/photo-1573246123716-6b1782bfc499", // vegetables
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5", // olive oil
  "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d", // cheese
];

export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * sampleProductImages.length);
  return sampleProductImages[randomIndex];
}
