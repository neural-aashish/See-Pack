import { PlatformPrice } from "@/types/product";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateDiscount = (price: number, originalPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const getPlatformColor = (platform: PlatformPrice["platform"]): string => {
  const colors = {
    amazon: "bg-amber-500",
    flipkart: "bg-blue-500",
    tatacliq: "bg-pink-500",
    myntra: "bg-rose-500",
  };
  return colors[platform] || "bg-gray-500";
};

export const getPlatformName = (platform: PlatformPrice["platform"]): string => {
  const names = {
    amazon: "Amazon",
    flipkart: "Flipkart",
    tatacliq: "Tata CLiQ",
    myntra: "Myntra",
  };
  return names[platform] || platform;
};

export const getPlatformLogo = (platform: PlatformPrice["platform"]): string => {
  const logos = {
    amazon: "🛒",
    flipkart: "🛍️",
    tatacliq: "👜",
    myntra: "👗",
  };
  return logos[platform] || "🏪";
};
