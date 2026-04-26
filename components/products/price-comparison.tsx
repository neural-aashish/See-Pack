"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check, X, TrendingDown } from "lucide-react";
import { Product, PlatformPrice } from "@/types/product";
import { formatPrice, calculateDiscount, getPlatformName } from "@/lib/price-utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PriceComparisonProps {
  product: Product;
  onAddToCart?: (platform: PlatformPrice["platform"]) => void;
}

export function PriceComparison({ product, onAddToCart }: PriceComparisonProps) {
  const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
  const cheapest =
    availablePrices.length > 0
      ? availablePrices.reduce((min, p) => (p.price < min.price ? p : min))
      : null;

  const sortedPrices = [...product.prices].sort((a, b) => {
    if (!a.inStock && b.inStock) return 1;
    if (a.inStock && !b.inStock) return -1;
    if (a.price === 0) return 1;
    if (b.price === 0) return -1;
    return a.price - b.price;
  });

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="flex items-center gap-2 font-semibold">
          <TrendingDown className="h-5 w-5 text-primary" />
          Price Comparison
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Compare prices across all platforms
        </p>
      </div>

      <div className="divide-y divide-border">
        {sortedPrices.map((price, index) => {
          const isCheapest = cheapest && price.platform === cheapest.platform;
          const discount = calculateDiscount(price.price, price.originalPrice);

          return (
            <motion.div
              key={price.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "flex items-center justify-between p-4 transition-colors",
                isCheapest && "bg-primary/5"
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold",
                    price.platform === "amazon" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                    price.platform === "flipkart" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    price.platform === "tatacliq" && "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
                    price.platform === "myntra" && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  )}
                >
                  {getPlatformName(price.platform).charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{getPlatformName(price.platform)}</span>
                    {isCheapest && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                        Best Price
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {price.inStock ? (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check className="h-3 w-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <X className="h-3 w-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {price.inStock && price.price > 0 ? (
                  <>
                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">{formatPrice(price.price)}</span>
                        {discount > 0 && (
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            -{discount}%
                          </span>
                        )}
                      </div>
                      {price.originalPrice > price.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(price.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddToCart?.(price.platform)}
                      >
                        Add to Cart
                      </Button>
                      <a
                        href={price.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="gap-1">
                          Buy
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">Unavailable</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {cheapest && (
        <div className="border-t border-border bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Best Deal</p>
              <p className="text-xs text-muted-foreground">
                Save up to {formatPrice(Math.max(...product.prices.map((p) => p.price)) - cheapest.price)} compared to other platforms
              </p>
            </div>
            <a href={cheapest.affiliateLink} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                Buy from {getPlatformName(cheapest.platform)}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
