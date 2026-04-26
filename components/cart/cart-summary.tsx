"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingDown, ExternalLink, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, getPlatformName } from "@/lib/price-utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartSummary() {
  const { items, getTotalPrice, getCheapestTotal, updatePlatform } = useCartStore();

  const totalPrice = getTotalPrice();
  const { total: cheapestTotal, savings, suggestions } = getCheapestTotal();

  const hasSavings = savings > 0;

  const handleOptimize = () => {
    suggestions.forEach((suggestion) => {
      updatePlatform(suggestion.productId, suggestion.platform);
    });
  };

  // Group items by platform for external links
  const groupedByPlatform = items.reduce((acc, item) => {
    const platform = item.selectedPlatform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <ShoppingBag className="h-5 w-5" />
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>

        {hasSavings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-800 dark:text-green-300">
                  You can save {formatPrice(savings)}!
                </p>
                <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                  Switch to cheaper platforms for better prices
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOptimize}
                  className="mt-3 gap-2 border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/50"
                >
                  <Sparkles className="h-4 w-4" />
                  Optimize Cart
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
              {hasSavings && (
                <p className="text-sm text-muted-foreground">
                  Best: {formatPrice(cheapestTotal)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="mt-6 border-t border-border pt-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Buy from platforms:
        </h3>
        <div className="space-y-3">
          {Object.entries(groupedByPlatform).map(([platform, platformItems]) => {
            const platformTotal = platformItems.reduce((sum, item) => {
              const price = item.product.prices.find(
                (p) => p.platform === item.selectedPlatform
              );
              return sum + (price?.price || 0) * item.quantity;
            }, 0);

            const affiliateLink = platformItems[0]?.product.prices.find(
              (p) => p.platform === platform
            )?.affiliateLink;

            return (
              <div
                key={platform}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
              >
                <div>
                  <span className="font-medium">
                    {getPlatformName(platform as any)}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {platformItems.length} {platformItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{formatPrice(platformTotal)}</span>
                  {affiliateLink && (
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1">
                        Buy
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Prices may vary. Click platform links to verify current prices.
        We earn affiliate commissions from purchases.
      </p>
    </div>
  );
}
