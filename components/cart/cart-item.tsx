"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { CartItem as CartItemType, PlatformPrice } from "@/types/product";
import { formatPrice, getPlatformName } from "@/lib/price-utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  suggestedPlatform?: PlatformPrice["platform"];
}

export function CartItemCard({ item, suggestedPlatform }: CartItemProps) {
  const { updateQuantity, removeItem, updatePlatform } = useCartStore();

  const availablePrices = item.product.prices.filter((p) => p.inStock && p.price > 0);
  const selectedPrice = item.product.prices.find((p) => p.platform === item.selectedPlatform);
  const cheapestPrice =
    availablePrices.length > 0
      ? availablePrices.reduce((min, p) => (p.price < min.price ? p : min))
      : null;

  const isCheapest = cheapestPrice && item.selectedPlatform === cheapestPrice.platform;
  const canSave =
    cheapestPrice && selectedPrice && cheapestPrice.price < selectedPrice.price;
  const savings = canSave ? (selectedPrice!.price - cheapestPrice!.price) * item.quantity : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 rounded-xl border border-border bg-card p-4"
    >
      {/* Image */}
      <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
        <div className="h-24 w-24 overflow-hidden rounded-lg bg-secondary/30">
          <img
            src={item.product.images[0]}
            alt={item.product.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/products/${item.product.id}`}>
              <h3 className="line-clamp-2 font-medium hover:text-primary">
                {item.product.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.product.id)}
            className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          {/* Platform Selector */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Select
                value={item.selectedPlatform}
                onValueChange={(value) =>
                  updatePlatform(item.product.id, value as PlatformPrice["platform"])
                }
              >
                <SelectTrigger className="h-9 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availablePrices.map((price) => (
                    <SelectItem key={price.platform} value={price.platform}>
                      <span className="flex items-center gap-2">
                        {getPlatformName(price.platform)}
                        {cheapestPrice && price.platform === cheapestPrice.platform && (
                          <span className="text-[10px] font-bold text-green-600">BEST</span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedPrice && (
                <a
                  href={selectedPrice.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>

            {canSave && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Save {formatPrice(savings)} by switching to {getPlatformName(cheapestPrice!.platform)}
              </p>
            )}
          </div>

          {/* Quantity & Price */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              {selectedPrice && (
                <>
                  <p className="font-semibold">
                    {formatPrice(selectedPrice.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(selectedPrice.price)} each
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
