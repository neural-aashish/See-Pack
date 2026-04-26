import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "Smartphone", productCount: 156 },
  { id: "fashion", name: "Fashion", icon: "Shirt", productCount: 342 },
  { id: "home", name: "Home & Living", icon: "Home", productCount: 89 },
  { id: "beauty", name: "Beauty", icon: "Sparkles", productCount: 124 },
  { id: "sports", name: "Sports", icon: "Dumbbell", productCount: 67 },
  { id: "books", name: "Books", icon: "BookOpen", productCount: 215 },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
    description: "iPhone 15 Pro Max features a strong and light titanium design with Action button, A17 Pro chip with GPU that's up to 20% faster than A16 Bionic. Capture stunning photos with the powerful 48MP Main camera with new Portrait features.",
    brand: "Apple",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
      "https://images.unsplash.com/photo-1697220286460-71ffe85bc6a3?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 159900, originalPrice: 169900, affiliateLink: "https://amazon.in/dp/iphone15promax", inStock: true },
      { platform: "flipkart", price: 156999, originalPrice: 169900, affiliateLink: "https://flipkart.com/iphone15promax", inStock: true },
      { platform: "tatacliq", price: 158500, originalPrice: 169900, affiliateLink: "https://tatacliq.com/iphone15promax", inStock: true },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.8,
    reviewCount: 12453,
    features: ["A17 Pro chip", "48MP Main Camera", "Titanium Design", "Action Button", "USB-C"],
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB)",
    description: "Galaxy S24 Ultra with built-in S Pen, AI-powered features, 200MP camera, and the most powerful Galaxy processor yet. Experience the future of mobile AI.",
    brand: "Samsung",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 129999, originalPrice: 149999, affiliateLink: "https://amazon.in/dp/s24ultra", inStock: true },
      { platform: "flipkart", price: 124999, originalPrice: 149999, affiliateLink: "https://flipkart.com/s24ultra", inStock: true },
      { platform: "tatacliq", price: 127999, originalPrice: 149999, affiliateLink: "https://tatacliq.com/s24ultra", inStock: true },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 8932,
    features: ["200MP Camera", "S Pen Included", "Galaxy AI", "Snapdragon 8 Gen 3", "5000mAh Battery"],
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with Auto NC Optimizer and 8 microphones. Crystal clear hands-free calling with 4 beamforming microphones.",
    brand: "Sony",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 29990, originalPrice: 34990, affiliateLink: "https://amazon.in/dp/wh1000xm5", inStock: true },
      { platform: "flipkart", price: 28499, originalPrice: 34990, affiliateLink: "https://flipkart.com/wh1000xm5", inStock: true },
      { platform: "tatacliq", price: 29500, originalPrice: 34990, affiliateLink: "https://tatacliq.com/wh1000xm5", inStock: false },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.9,
    reviewCount: 5621,
    features: ["30hr Battery", "Industry-leading ANC", "Multipoint Connection", "Speak-to-Chat", "LDAC Support"],
  },
  {
    id: "4",
    title: "Nike Air Jordan 1 Retro High OG - Chicago",
    description: "The Air Jordan 1 Retro High OG remains faithful to the original with premium leather, classic colorways, and Air-Sole cushioning for legendary comfort.",
    brand: "Nike",
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 16995, originalPrice: 18995, affiliateLink: "https://amazon.in/dp/jordan1chicago", inStock: true },
      { platform: "flipkart", price: 17499, originalPrice: 18995, affiliateLink: "https://flipkart.com/jordan1chicago", inStock: true },
      { platform: "tatacliq", price: 16500, originalPrice: 18995, affiliateLink: "https://tatacliq.com/jordan1chicago", inStock: true },
      { platform: "myntra", price: 15999, originalPrice: 18995, affiliateLink: "https://myntra.com/jordan1chicago", inStock: true },
    ],
    rating: 4.6,
    reviewCount: 3245,
    features: ["Premium Leather", "Air-Sole Unit", "Rubber Outsole", "Padded Collar", "Classic Design"],
  },
  {
    id: "5",
    title: "MacBook Pro 14\" M3 Pro (18GB RAM, 512GB SSD)",
    description: "MacBook Pro with M3 Pro chip delivers exceptional performance with up to 18 hours of battery life. Stunning Liquid Retina XDR display.",
    brand: "Apple",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 199900, originalPrice: 219900, affiliateLink: "https://amazon.in/dp/macbookpro14m3", inStock: true },
      { platform: "flipkart", price: 194999, originalPrice: 219900, affiliateLink: "https://flipkart.com/macbookpro14m3", inStock: true },
      { platform: "tatacliq", price: 198500, originalPrice: 219900, affiliateLink: "https://tatacliq.com/macbookpro14m3", inStock: true },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.9,
    reviewCount: 6789,
    features: ["M3 Pro Chip", "18GB Unified Memory", "Liquid Retina XDR", "18hr Battery", "MagSafe Charging"],
  },
  {
    id: "6",
    title: "Dyson V15 Detect Absolute Vacuum Cleaner",
    description: "Dyson's most powerful cordless vacuum with laser dust detection, piezo sensor, and HEPA filtration. Reveals microscopic dust and counts particles.",
    brand: "Dyson",
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
      "https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 62900, originalPrice: 72900, affiliateLink: "https://amazon.in/dp/dysonv15", inStock: true },
      { platform: "flipkart", price: 59999, originalPrice: 72900, affiliateLink: "https://flipkart.com/dysonv15", inStock: true },
      { platform: "tatacliq", price: 61500, originalPrice: 72900, affiliateLink: "https://tatacliq.com/dysonv15", inStock: true },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 2134,
    features: ["Laser Dust Detection", "60min Runtime", "HEPA Filtration", "LCD Screen", "Auto Mode"],
  },
  {
    id: "7",
    title: "Levi's 501 Original Fit Men's Jeans - Dark Stonewash",
    description: "The iconic straight fit with signature button fly. Made from premium denim for authentic style and lasting comfort.",
    brand: "Levi's",
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 3499, originalPrice: 4999, affiliateLink: "https://amazon.in/dp/levis501", inStock: true },
      { platform: "flipkart", price: 3299, originalPrice: 4999, affiliateLink: "https://flipkart.com/levis501", inStock: true },
      { platform: "tatacliq", price: 3599, originalPrice: 4999, affiliateLink: "https://tatacliq.com/levis501", inStock: true },
      { platform: "myntra", price: 2999, originalPrice: 4999, affiliateLink: "https://myntra.com/levis501", inStock: true },
    ],
    rating: 4.5,
    reviewCount: 8976,
    features: ["100% Cotton", "Button Fly", "5-Pocket Styling", "Regular Fit", "Signature Leather Patch"],
  },
  {
    id: "8",
    title: "Apple Watch Series 9 GPS 45mm - Midnight Aluminum",
    description: "The most powerful Apple Watch yet with S9 chip, Double Tap gesture, brighter Always-On Retina display, and precise GPS.",
    brand: "Apple",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 44900, originalPrice: 49900, affiliateLink: "https://amazon.in/dp/applewatch9", inStock: true },
      { platform: "flipkart", price: 42999, originalPrice: 49900, affiliateLink: "https://flipkart.com/applewatch9", inStock: true },
      { platform: "tatacliq", price: 44500, originalPrice: 49900, affiliateLink: "https://tatacliq.com/applewatch9", inStock: true },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.8,
    reviewCount: 4567,
    features: ["S9 Chip", "Double Tap Gesture", "Blood Oxygen", "ECG App", "18hr Battery"],
  },
  {
    id: "9",
    title: "The Ordinary Niacinamide 10% + Zinc 1% Serum",
    description: "High-strength vitamin and mineral blemish formula. Targets visible blemishes, congestion, and oiliness for clearer-looking skin.",
    brand: "The Ordinary",
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 690, originalPrice: 850, affiliateLink: "https://amazon.in/dp/ordinaryniacinamide", inStock: true },
      { platform: "flipkart", price: 649, originalPrice: 850, affiliateLink: "https://flipkart.com/ordinaryniacinamide", inStock: true },
      { platform: "tatacliq", price: 699, originalPrice: 850, affiliateLink: "https://tatacliq.com/ordinaryniacinamide", inStock: true },
      { platform: "myntra", price: 599, originalPrice: 850, affiliateLink: "https://myntra.com/ordinaryniacinamide", inStock: true },
    ],
    rating: 4.4,
    reviewCount: 15678,
    features: ["Reduces Blemishes", "Controls Oil", "Zinc Formula", "Vegan", "Cruelty-Free"],
  },
  {
    id: "10",
    title: "Sony PlayStation 5 Console (Slim Edition)",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and stunning 4K gaming.",
    brand: "Sony",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 54990, originalPrice: 59990, affiliateLink: "https://amazon.in/dp/ps5slim", inStock: true },
      { platform: "flipkart", price: 52999, originalPrice: 59990, affiliateLink: "https://flipkart.com/ps5slim", inStock: true },
      { platform: "tatacliq", price: 54500, originalPrice: 59990, affiliateLink: "https://tatacliq.com/ps5slim", inStock: false },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.9,
    reviewCount: 9876,
    features: ["4K Gaming", "Ray Tracing", "DualSense Controller", "Ultra-High Speed SSD", "3D Audio"],
  },
  {
    id: "11",
    title: "Adidas Ultraboost 23 Running Shoes",
    description: "Experience incredible energy return with BOOST midsole technology. Primeknit upper adapts to your foot for a sock-like fit.",
    brand: "Adidas",
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 16999, originalPrice: 19999, affiliateLink: "https://amazon.in/dp/ultraboost23", inStock: true },
      { platform: "flipkart", price: 15999, originalPrice: 19999, affiliateLink: "https://flipkart.com/ultraboost23", inStock: true },
      { platform: "tatacliq", price: 16500, originalPrice: 19999, affiliateLink: "https://tatacliq.com/ultraboost23", inStock: true },
      { platform: "myntra", price: 14999, originalPrice: 19999, affiliateLink: "https://myntra.com/ultraboost23", inStock: true },
    ],
    rating: 4.6,
    reviewCount: 5432,
    features: ["BOOST Midsole", "Primeknit Upper", "Continental Rubber", "Responsive Cushioning", "Torsion System"],
  },
  {
    id: "12",
    title: "Kindle Paperwhite (16GB) - 6.8\" Display",
    description: "The thinnest, lightest Kindle Paperwhite yet with a 6.8\" display, adjustable warm light, and up to 10 weeks of battery life.",
    brand: "Amazon",
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1592434134753-a70f1a5a5848?w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    ],
    prices: [
      { platform: "amazon", price: 14999, originalPrice: 17999, affiliateLink: "https://amazon.in/dp/kindlepaperwhite", inStock: true },
      { platform: "flipkart", price: 15499, originalPrice: 17999, affiliateLink: "https://flipkart.com/kindlepaperwhite", inStock: true },
      { platform: "tatacliq", price: 15999, originalPrice: 17999, affiliateLink: "https://tatacliq.com/kindlepaperwhite", inStock: false },
      { platform: "myntra", price: 0, originalPrice: 0, affiliateLink: "", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 23456,
    features: ["6.8\" Display", "Adjustable Warm Light", "10 Week Battery", "Waterproof IPX8", "16GB Storage"],
  },
];

export const featuredProducts = products.slice(0, 6);

export const getAllBrands = (): string[] => {
  const brands = new Set(products.map((p) => p.brand));
  return Array.from(brands).sort();
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

export const getCheapestPrice = (product: Product): PlatformPrice | null => {
  const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
  if (availablePrices.length === 0) return null;
  return availablePrices.reduce((min, p) => (p.price < min.price ? p : min));
};

import { PlatformPrice } from "@/types/product";
