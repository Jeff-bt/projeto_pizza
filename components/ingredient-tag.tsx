"use client";

import { motion } from "framer-motion";

interface IngredientTagProps {
  label: string;
  bgColor: string;
  textColor: string;
  index: number;
}

export function IngredientTag({
  label,
  bgColor,
  textColor,
  index,
}: IngredientTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: 0.3 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium tracking-wide"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${textColor}20`,
      }}
    >
      {label}
    </motion.span>
  );
}
