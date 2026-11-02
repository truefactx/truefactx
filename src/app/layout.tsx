import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pandgaea",
  description: "Premium blanks, custom embroidery, and live workshop production.",
};

import Footer from "@/components/Footer";
import MarqueeBanner from "@/components/MarqueeBanner";
import FilmGrain from "@/components/FilmGrain";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <FilmGrain />
        <CartProvider>
          <MarqueeBanner />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
