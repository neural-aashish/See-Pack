"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, ArrowUpDown, Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters, MobileFilters } from "@/components/products/product-filters";
import { products, searchProducts, categories } from "@/data/products";
import { FilterState, SortOption, Product } from "@/types/product";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200000],
    brands: [],
    platforms: [],
    categories: categoryParam ? [categoryParam] : [],
  });

  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update filters when category param changes
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryParam],
      }));
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result: Product[] = searchQuery ? searchProducts(searchQuery) : [...products];

    // Apply filters
    result = result.filter((product) => {
      // Price filter
      const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
      const cheapestPrice =
        availablePrices.length > 0
          ? Math.min(...availablePrices.map((p) => p.price))
          : 0;
      if (cheapestPrice < filters.priceRange[0] || cheapestPrice > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0) {
        const hasSelectedPlatform = product.prices.some(
          (p) => filters.platforms.includes(p.platform) && p.inStock && p.price > 0
        );
        if (!hasSelectedPlatform) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => {
          const aPrice = Math.min(
            ...a.prices.filter((p) => p.inStock && p.price > 0).map((p) => p.price)
          );
          const bPrice = Math.min(
            ...b.prices.filter((p) => p.inStock && p.price > 0).map((p) => p.price)
          );
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const aPrice = Math.min(
            ...a.prices.filter((p) => p.inStock && p.price > 0).map((p) => p.price)
          );
          const bPrice = Math.min(
            ...b.prices.filter((p) => p.inStock && p.price > 0).map((p) => p.price)
          );
          return bPrice - aPrice;
        });
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const categoryName = categoryParam
    ? categories.find((c) => c.id === categoryParam)?.name
    : null;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : categoryName
              ? categoryName
              : "All Products"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-muted-foreground"
          >
            {filteredProducts.length} products found
          </motion.p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="gap-2 lg:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "grid" && "bg-secondary"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "list" && "bg-secondary"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        filters={filters}
        onFiltersChange={setFilters}
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
      />
    </div>
  );
}
