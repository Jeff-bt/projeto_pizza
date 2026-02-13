"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";
import { pizzaFlavors, PizzaCategory } from "@/lib/pizza-data";
import { IngredientTag } from "./ingredient-tag";
import { PizzaNavDots } from "./pizza-nav-dots";
import { CartSidebar } from "./cart-sidebar";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

const SWIPE_THRESHOLD = 50;

const categories: { value: PizzaCategory | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "salgado", label: "Salgados" },
  { value: "doce", label: "Doces" },
  { value: "bebida", label: "Bebidas" },
];

export function PizzaShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    PizzaCategory | "all"
  >("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLElement>(null);
  const { addToCart, getTotalItems } = useCart();

  // Filter pizzas based on search and category
  const filteredPizzas = useMemo(() => {
    return pizzaFlavors.filter((pizza) => {
      const matchesSearch =
        searchQuery === "" ||
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" || pizza.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Reset active index when filters change
  useEffect(() => {
    if (activeIndex >= filteredPizzas.length && filteredPizzas.length > 0) {
      setActiveIndex(0);
    }
  }, [filteredPizzas.length, activeIndex]);

  const pizza = filteredPizzas[activeIndex];
  const colors = pizza?.colors || {
    bg: "#1a0f0a",
    text: "#fef3e2",
    accent: "#d4442a",
    accentText: "#fef3e2",
    muted: "#8a7b6e",
    ingredientBg: "rgba(212, 68, 42, 0.12)",
    ingredientText: "#e8a090",
  };

  const navigate = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= filteredPizzas.length) return;
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    },
    [activeIndex, filteredPizzas.length],
  );

  const goNext = useCallback(() => {
    if (activeIndex < filteredPizzas.length - 1) navigate(activeIndex + 1);
  }, [activeIndex, navigate, filteredPizzas.length]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) navigate(activeIndex - 1);
  }, [activeIndex, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    const x = info.offset.x;

    if (x < -SWIPE_THRESHOLD) goNext();
    else if (x > SWIPE_THRESHOLD) goPrev();
  };

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "40%" : "-40%",
      opacity: 0,
      scale: 0.88,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "40%" : "-40%",
      opacity: 0,
      scale: 0.88,
      rotateY: dir < 0 ? 8 : -8,
    }),
  };

  const textVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  if (!pizza) {
    return (
      <section className="relative min-h-dvh w-full flex items-center justify-center bg-[#1a0f0a]">
        <p className="text-white/60 text-lg">
          Nenhuma pizza encontrada com esses filtros
        </p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh  w-full  md:h-dvh md:overflow-hidden overflow-x-hidden select-none"
      style={{ perspective: "1200px" }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ backgroundColor: colors.bg }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Radial glow behind pizza */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none hidden md:block"
        animate={{
          background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Swipe area */}
      <motion.div
        className="absolute inset-0 z-10 touch-none touch-pan-y md:touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        style={{ x: dragX }}
        onDragEnd={handleDragEnd}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col pointer-events-none">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8">
          <motion.div
            animate={{ color: colors.text }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
              Forno
            </span>
            <span
              className="font-serif text-xl md:text-2xl font-light ml-1"
              style={{ color: colors.accent }}
            >
              .
            </span>
          </motion.div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto relative p-3 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: colors.accent }}
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.accentText,
                }}
              >
                {getTotalItems()}
              </span>
            )}
          </button>
        </header>

        {/* Search and Category Filters */}
        <div className="px-6 md:px-12 mt-6 my-10 md:my-0 space-y-4">
          {/* Search Bar */}
          <div className="relative pointer-events-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: colors.muted }}
            />
            <input
              type="text"
              placeholder="Buscar pizzas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 pl-12 pr-4 py-3 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: `${colors.accent}10`,
                border: `1px solid ${colors.accent}20`,
                color: colors.text,
              }}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 pointer-events-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className="px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-all"
                style={{
                  backgroundColor:
                    selectedCategory === category.value
                      ? colors.accent
                      : `${colors.accent}15`,
                  color:
                    selectedCategory === category.value
                      ? colors.accentText
                      : colors.muted,
                  border: `1px solid ${selectedCategory === category.value ? colors.accent : `${colors.accent}20`}`,
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botão ESQUERDO */}
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="
          pointer-events-auto
    absolute 
   left-4
    top-1/3 
    md:left-4 
    md:top-1/2 
    -translate-y-1/2
    w-11 h-11 
    rounded-full 
    flex items-center justify-center 
    transition-all duration-300 
    disabled:opacity-20 
    hover:scale-110 
    active:scale-95
  "
          style={{
            border: `1px solid ${colors.accent}40`,
            color: colors.accent,
          }}
          aria-label="Sabor anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Botão DIREITO */}
        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === filteredPizzas.length - 1}
          className="
          pointer-events-auto
                      absolute 
                      right-4
    top-1/3 
    md:right-4 
    md:top-1/2 
                      -translate-y-1/2
                      w-11 h-11 
                      rounded-full 
                      flex items-center justify-center 
                      transition-all duration-300 
                      disabled:opacity-20 
                      hover:scale-110 
                      active:scale-95
                    "
          style={{
            backgroundColor: colors.accent,
            color: colors.accentText,
          }}
          aria-label="Próximo sabor"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Center Content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-8 mt-12 md:mt-0  ">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`badge-${pizza.id}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      backgroundColor: `${colors.accent}18`,
                      color: colors.accent,
                      border: `1px solid ${colors.accent}30`,
                    }}
                  >
                    {pizza.badge}
                  </span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`title-${pizza.id}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h1
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-balance"
                    style={{ color: colors.text }}
                  >
                    {pizza.name}
                  </h1>
                  <p
                    className="font-serif text-lg md:text-xl italic mt-2"
                    style={{ color: colors.muted }}
                  >
                    {pizza.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={`desc-${pizza.id}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-base md:text-lg leading-relaxed max-w-md"
                  style={{ color: colors.muted }}
                >
                  {pizza.description}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`ingredients-${pizza.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {pizza.ingredients.map((ingredient, idx) => (
                    <IngredientTag
                      key={`${pizza.id}-${ingredient}`}
                      label={ingredient}
                      bgColor={colors.ingredientBg}
                      textColor={colors.ingredientText}
                      index={idx}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`price-${pizza.id}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center md:justify-start gap-6 pointer-events-auto"
                >
                  <span
                    className="text-3xl md:text-4xl font-bold font-serif"
                    style={{ color: colors.accent }}
                  >
                    {pizza.price}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.accentText,
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Pizza Image */}
            <div className="order-1 lg:order-2 flex items-center justify-center relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`image-${pizza.id}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
    relative
    w-64 h-64
    sm:w-80 sm:h-80
    md:w-[420px] md:h-[420px]

    lg:w-[500px] lg:h-[500px]
    xl:w-[1000px] xl:h-[1000px]
  "
                >
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: `0 0 80px 20px ${colors.accent}20, 0 0 120px 40px ${colors.accent}10`,
                    }}
                    transition={{ duration: 1 }}
                  />

                  {/* Pizza image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={pizza.image}
                      alt={`Pizza ${pizza.name}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 500px"
                      className="object-cover rounded-full"
                      draggable={false}
                    />
                    {/* Overlay vignette */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, transparent 50%, ${colors.bg}90 100%)`,
                      }}
                    />
                  </div>

                  {/* Floating decorative ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full "
                    style={{
                      border: `1px solid ${colors.accent}15`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 30,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: `${colors.accent}40` }}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <footer className="flex items-center justify-center p-8 md:px-12 pb-6 md:pb-8">
          <PizzaNavDots
            flavors={filteredPizzas}
            activeIndex={activeIndex}
            onSelect={(idx) => navigate(idx)}
          />
        </footer>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </section>
  );
}
