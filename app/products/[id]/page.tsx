"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Check,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { Product, PlatformPrice } from "@/types/product";
import { formatPrice, calculateDiscount, getPlatformName } from "@/lib/price-utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/products/image-gallery";
import { PriceComparison } from "@/components/products/price-comparison";
import { ProductCard } from "@/components/products/product-card";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const p = getProductById(params.id as string);
    if (p) {
      setProduct(p);
    } else {
      router.push("/products");
    }
  }, [params.id, router]);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
  const cheapest =
    availablePrices.length > 0
      ? availablePrices.reduce((min, p) => (p.price < min.price ? p : min))
      : null;

  const highestOriginalPrice = Math.max(
    ...product.prices.filter((p) => p.originalPrice > 0).map((p) => p.originalPrice)
  );

  const discount = cheapest ? calculateDiscount(cheapest.price, highestOriginalPrice) : 0;

  const handleAddToCart = (platform?: PlatformPrice["platform"]) => {
    addItem(product, platform);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="truncate font-medium">{product.title}</span>
        </nav>

        {/* Back Button (Mobile) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 gap-2 lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageGallery images={product.images} title={product.title} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Brand & Title */}
            <div>
              <span className="text-sm font-medium text-primary">{product.brand}</span>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            {cheapest && (
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Best Price</p>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-3xl font-bold">{formatPrice(cheapest.price)}</span>
                  {highestOriginalPrice > cheapest.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(highestOriginalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  on {getPlatformName(cheapest.platform)}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => handleAddToCart()}
                disabled={!cheapest || isAdded}
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold">Key Features</h3>
              <ul className="mt-3 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Price Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <PriceComparison product={product} onAddToCart={handleAddToCart} />
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-xl font-bold">Related Products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
