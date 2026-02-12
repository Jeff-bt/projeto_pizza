import React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";

import "./globals.css";

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pizzaria Artesanal | Sabores Exclusivos",
  description:
    "Descubra nossos sabores artesanais de pizza com ingredientes selecionados",
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased md:overflow-hidden">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

