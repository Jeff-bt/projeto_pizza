"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PizzaFlavor } from "@/lib/pizza-data";

export interface CartItem {
    pizza: PizzaFlavor;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (pizza: PizzaFlavor) => void;
    removeFromCart: (pizzaId: string) => void;
    updateQuantity: (pizzaId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (pizza: PizzaFlavor) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.pizza.id === pizza.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.pizza.id === pizza.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevItems, { pizza, quantity: 1 }];
        });
    };

    const removeFromCart = (pizzaId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.pizza.id !== pizzaId));
    };

    const updateQuantity = (pizzaId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(pizzaId);
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.pizza.id === pizzaId ? { ...item, quantity } : item,
            ),
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.pizza.price.replace("R$ ", "").replace(",", "."));
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
