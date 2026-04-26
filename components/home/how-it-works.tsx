"use client";

import { motion } from "framer-motion";
import { Search, BarChart3, ShoppingBag, Wallet } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Products",
    description: "Search for any product you want to buy across multiple platforms",
  },
  {
    icon: BarChart3,
    title: "Compare Prices",
    description: "See prices from Amazon, Flipkart, Tata CLiQ, and Myntra side by side",
  },
  {
    icon: ShoppingBag,
    title: "Add to Cart",
    description: "Add products to your smart cart and track the best deals",
  },
  {
    icon: Wallet,
    title: "Save Money",
    description: "Click through to buy from the cheapest platform and save big",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-muted-foreground"
          >
            Save money in four simple steps
          </motion.p>
        </div>

        <div className="relative mt-12">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold ring-2 ring-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
