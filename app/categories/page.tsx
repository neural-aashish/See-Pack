"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-muted-foreground"
          >
            Browse products across all categories and find the best deals
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Smartphone;
            const categoryProducts = products.filter(
              (p) => p.category === category.id
            );
            const previewProducts = categoryProducts.slice(0, 3);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/products?category=${category.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-4 p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold">{category.name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {categoryProducts.length} products
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>

                    {/* Preview Products */}
                    {previewProducts.length > 0 && (
                      <div className="border-t border-border bg-secondary/30 p-4">
                        <div className="flex gap-2">
                          {previewProducts.map((product) => (
                            <div
                              key={product.id}
                              className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-background"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                          {categoryProducts.length > 3 && (
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-background text-sm font-medium text-muted-foreground">
                              +{categoryProducts.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/products">
            <Button size="lg" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
