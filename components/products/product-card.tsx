"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ChevronRight, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount, getPlatformName } from "@/lib/price-utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
  const cheapestPrice =
    availablePrices.length > 0
      ? availablePrices.reduce((min, p) => (p.price < min.price ? p : min))
      : null;

  const highestOriginalPrice = Math.max(
    ...product.prices.filter((p) => p.originalPrice > 0).map((p) => p.originalPrice)
  );

  const discount = cheapestPrice
    ? calculateDiscount(cheapestPrice.price, highestOriginalPrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
              -{discount}%
            </span>
          )}
          {availablePrices.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span>({product.reviewCount.toLocaleString()})</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 flex-1 text-sm font-medium leading-snug">
            {product.title}
          </h3>

          {/* Price */}
          <div className="mb-3">
            {cheapestPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">
                  {formatPrice(cheapestPrice.price)}
                </span>
                {highestOriginalPrice > cheapestPrice.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(highestOriginalPrice)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Unavailable</span>
            )}
            {cheapestPrice && (
              <p className="mt-1 text-xs text-muted-foreground">
                Cheapest on {getPlatformName(cheapestPrice.platform)}
              </p>
            )}
          </div>

          {/* Platforms */}
          <div className="mb-3 flex flex-wrap gap-1">
            {availablePrices.slice(0, 4).map((price) => (
              <span
                key={price.platform}
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-medium",
                  price.platform === cheapestPrice?.platform
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {getPlatformName(price.platform)}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 text-xs"
              onClick={handleAddToCart}
              disabled={!cheapestPrice || isAdded}
            >
              {isAdded ? (
                <>
                  <Check className="h-3 w-3" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button size="sm" className="gap-1 text-xs">
              Compare
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
