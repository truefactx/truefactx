"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";

export default function ShopPage() {
  const { cartCount } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ['All', 'Fleece', 'T-Shirts', 'Headwear', 'Accessories'];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-zinc-50 text-black font-sans pb-24">
      {/* Shop Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="font-black text-xl tracking-widest uppercase">Shop</span>
          <Link href="/cart" className="relative hover:opacity-70 transition-opacity">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">The Collection</h1>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          Every piece is built to order in our live workshop. Select your size, place your order, and watch it get made.
        </p>
      </header>

      {/* Categories Bar */}
      <div className="container mx-auto px-6 mb-12 flex justify-center gap-4 flex-wrap">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
              activeCategory === cat 
                ? 'bg-black text-white' 
                : 'bg-white border border-zinc-300 text-zinc-600 hover:border-black hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <FadeIn key={product.id}>
              <Link href={`/shop/${product.id}`} className="group flex flex-col">
                <div className="aspect-square bg-white rounded-3xl overflow-hidden relative shadow-sm border border-zinc-100 flex items-center justify-center p-8 mb-4 group-hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)] group-hover:border-red-500/20 transition-all duration-500">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="px-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-lg leading-snug group-hover:text-red-600 transition-colors">{product.name}</h3>
                    <span className="font-black text-lg bg-zinc-100 px-2 py-1 rounded-md">{product.price}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
