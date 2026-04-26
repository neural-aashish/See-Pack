"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/price-utils";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSelect?: () => void;
  className?: string;
}

const trendingSearches = ["iPhone 15", "MacBook Pro", "Sony Headphones", "Nike Jordan"];

export function SearchBar({ onSelect, className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 2 ? searchProducts(query).slice(0, 5) : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (productId: string) => {
    setQuery("");
    setIsOpen(false);
    onSelect?.();
    router.push(`/products/${productId}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setIsOpen(false);
      onSelect?.();
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        handleSelect(results[highlightedIndex].id);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getCheapestPrice = (product: (typeof products)[0]) => {
    const available = product.prices.filter((p) => p.inStock && p.price > 0);
    if (available.length === 0) return null;
    return Math.min(...available.map((p) => p.price));
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products, brands..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-10 pl-9 pr-9"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-xl"
          >
            {results.length > 0 ? (
              <div className="divide-y divide-border">
                {results.map((product, index) => {
                  const cheapest = getCheapestPrice(product);
                  return (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                        highlightedIndex === index
                          ? "bg-secondary"
                          : "hover:bg-secondary/50"
                      )}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                      {cheapest && (
                        <span className="text-sm font-semibold text-primary">
                          {formatPrice(cheapest)}
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={handleSearch}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-primary hover:bg-secondary/50"
                >
                  <Search className="h-4 w-4" />
                  Search for &quot;{query}&quot;
                </button>
              </div>
            ) : query.length >= 2 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No products found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  Trending Searches
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        setIsOpen(true);
                      }}
                      className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary/80"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
