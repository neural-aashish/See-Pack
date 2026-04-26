"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { getAllBrands, categories } from "@/data/products";
import { formatPrice, getPlatformName } from "@/lib/price-utils";
import { FilterState, PlatformPrice } from "@/types/product";
import { cn } from "@/lib/utils";

const platforms: PlatformPrice["platform"][] = ["amazon", "flipkart", "tatacliq", "myntra"];
const brands = getAllBrands();

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export function ProductFilters({ filters, onFiltersChange, className }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brands: true,
    platforms: true,
    categories: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePlatformChange = (platform: PlatformPrice["platform"], checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter((p) => p !== platform);
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 200000],
      brands: [],
      platforms: [],
      categories: [],
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.platforms.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200000;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        expanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={200000}
            step={1000}
            className="mt-2"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {formatPrice(filters.priceRange[0])}
            </span>
            <span className="text-muted-foreground">
              {formatPrice(filters.priceRange[1])}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Platforms */}
      <FilterSection
        title="Platforms"
        expanded={expandedSections.platforms}
        onToggle={() => toggleSection("platforms")}
        count={filters.platforms.length}
      >
        <div className="space-y-3">
          {platforms.map((platform) => (
            <label key={platform} className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={filters.platforms.includes(platform)}
                onCheckedChange={(checked) =>
                  handlePlatformChange(platform, checked as boolean)
                }
              />
              <span className="text-sm">{getPlatformName(platform)}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection
        title="Brands"
        expanded={expandedSections.brands}
        onToggle={() => toggleSection("brands")}
        count={filters.brands.length}
      >
        <div className="max-h-48 space-y-3 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection
        title="Categories"
        expanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
        count={filters.categories.length}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

function FilterSection({ title, expanded, onToggle, count, children }: FilterSectionProps) {
  return (
    <div className="border-t border-border pt-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {title}
          {count && count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilters({ filters, onFiltersChange, isOpen, onClose }: MobileFiltersProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-background p-6 shadow-xl lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ProductFilters filters={filters} onFiltersChange={onFiltersChange} />
            <div className="mt-6">
              <Button onClick={onClose} className="w-full">
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
