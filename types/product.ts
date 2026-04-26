export interface PlatformPrice {
  platform: "amazon" | "flipkart" | "tatacliq" | "myntra";
  price: number;
  originalPrice: number;
  affiliateLink: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
  prices: PlatformPrice[];
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPlatform: PlatformPrice["platform"];
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  productCount: number;
};

export type SortOption = "price-low" | "price-high" | "rating" | "popular";

export type FilterState = {
  priceRange: [number, number];
  brands: string[];
  platforms: PlatformPrice["platform"][];
  categories: string[];
};
