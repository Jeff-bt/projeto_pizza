"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
        useCart();

    const total = getTotalPrice();

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#1a1410] border-l border-white/10 z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-6 h-6 text-orange-500" />
                                <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white/60" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
                                    <p className="text-white/40 text-sm">
                                        Seu carrinho está vazio
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.pizza.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                                        >
                                            <div className="flex gap-3">
                                                {/* Pizza Image */}
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.pizza.image}
                                                        alt={item.pizza.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-white text-sm truncate">
                                                                {item.pizza.name}
                                                            </h3>
                                                            <p
                                                                className="text-xs font-bold"
                                                                style={{ color: item.pizza.colors.accent }}
                                                            >
                                                                {item.pizza.price}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.pizza.id)}
                                                            className="p-1 hover:bg-white/10 rounded transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                        </button>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.pizza.id,
                                                                    item.quantity - 1,
                                                                )
                                                            }
                                                            className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3 text-white" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-semibold text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.pizza.id,
                                                                    item.quantity + 1,
                                                                )
                                                            }
                                                            className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3 text-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-white/10 p-6 space-y-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span className="text-white/80">Total:</span>
                                    <span className="text-orange-500">
                                        R$ {total.toFixed(2).replace(".", ",")}
                                    </span>
                                </div>
                                <button
                                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                                >
                                    Finalizar Pedido
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full py-2 text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    Limpar Carrinho
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
