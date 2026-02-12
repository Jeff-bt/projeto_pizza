"use client";

import { motion } from "framer-motion";
import type { PizzaFlavor } from "@/lib/pizza-data";

interface PizzaNavDotsProps {
  flavors: PizzaFlavor[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PizzaNavDots({
  flavors,
  activeIndex,
  onSelect,
}: PizzaNavDotsProps) {
  const colors = flavors[activeIndex].colors;

  return (
    <div className="flex items-center gap-3">
      {flavors.map((flavor, index) => (
        <button
          key={flavor.id}
          onClick={() => onSelect(index)}
          className="relative p-1 group"
          aria-label={`Ver pizza ${flavor.name}`}
          aria-current={index === activeIndex ? "true" : undefined}
          type="button"
        >
          <motion.div
            className="rounded-full"
            animate={{
              width: index === activeIndex ? 32 : 10,
              height: 10,
              backgroundColor:
                index === activeIndex ? colors.dotActive : colors.dotInactive,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      ))}
    </div>
  );
}
