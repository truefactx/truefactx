"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Palette, Cpu, Scissors, Flame, Sparkles, Check, Play } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import FadeIn from "@/components/FadeIn";
import KineticTruefactx from "@/components/KineticTruefactx";
import FlyingApparelHero from "@/components/FlyingApparelHero";
import ServicesPromoRibbon from "@/components/ServicesPromoRibbon";
import LiveCreationPromo from "@/components/LiveCreationPromo";

export default function LandingPage() {
  const { cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fleece", "T-Shirts", "Headwear", "Accessories"];

  const displayedProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Enhanced High-Contrast Navbar with Prominent Glowing Logo */}
      <nav className="absolute top-12 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/images/new_logo_transparent.png" 
              alt="Pandgaea TrueFactx Logo" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain relative z-10 animate-logo-glow group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl md:text-2xl tracking-widest uppercase leading-none text-white">
              PANDGAEA
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
              TRUEFACTX ATELIER
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium tracking-widest uppercase">
          <Link href="/shop" className="hover:text-amber-400 transition-colors hidden sm:inline-block">Shop</Link>
          <Link href="/custom-orders" className="hover:text-amber-400 transition-colors hidden sm:inline-block">Custom</Link>
          <Link href="/graphic-design" className="hover:text-amber-400 transition-colors hidden md:inline-block text-amber-300 font-bold">Design</Link>
          <Link href="/digitizing" className="hover:text-emerald-400 transition-colors hidden md:inline-block text-emerald-300 font-bold">Digitizing</Link>
          <Link href="/about" className="hover:text-amber-400 transition-colors hidden lg:inline-block">Workshop</Link>
          <Link href="/gallery" className="hover:text-amber-400 transition-colors hidden lg:inline-block">Archive</Link>
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
            <a href="https://www.tiktok.com/@truefactx6" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" aria-label="TikTok" title="TikTok Live">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="https://www.youtube.com/@TrueFactx" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" aria-label="YouTube" title="YouTube Channel">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="https://www.facebook.com/truefactx165/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <Link href="/cart" className="relative hover:opacity-70 transition-opacity ml-2">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Cinematic Freestyle Video Hero with Prominent Yin-Yang Logo Crest */}
      <section className="relative w-full min-h-[700px] md:h-[92vh] max-h-[920px] flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-100 contrast-110 saturate-110 brightness-105"
        >
          <source src="/images/pandgaea_hero_freestyle.mp4" type="video/mp4" />
          <source src="/images/Panda_Yin_Yang_Logo_Hatching_Video.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center mt-28 px-4 max-w-4xl mx-auto">
          {/* Central Pulsing Panda Yin-Yang Emblem Crest */}
          <FadeIn>
            <div className="mb-4 relative inline-flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-amber-500/30 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="/images/new_logo_transparent.png" 
                alt="TrueFactx Yin Yang Logo" 
                className="w-20 h-20 md:w-28 md:h-28 object-contain animate-logo-glow drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] group-hover:scale-115 transition-transform duration-500"
              />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> TrueFactx Atelier NYC
            </div>
          </FadeIn>

          <FadeIn>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-5 leading-[0.9] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              Built For <br/> The Culture.
            </h1>
          </FadeIn>

          <FadeIn>
            <p className="text-zinc-200 text-lg md:text-2xl font-medium mb-10 max-w-2xl drop-shadow-md">
              Heavyweight blanks, precision embroidery digitizing, and live workshop streaming. We don't just sell clothes, we craft them live.
            </p>
          </FadeIn>
          
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link 
                href="/shop" 
                className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] transition-all duration-300 rounded-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enter Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-zinc-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              <Link 
                href="/custom-orders" 
                className="px-8 py-4 bg-black/50 backdrop-blur-md text-white border border-white/40 hover:border-white font-black uppercase tracking-widest text-sm transition-all rounded-xl hover:bg-white/10"
              >
                Custom Apparel Quote
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 1. KINETIC TYPOGRAPHY FLY-IN: The Word TRUEFACTX Flying Into The Landing Page */}
      <KineticTruefactx />

      {/* 2. 3D FLOATING APPAREL VAULT: T-Shirts, Hoodies & Hats Flying Into The Page */}
      <FlyingApparelHero />

      {/* 3. PROMOTING DIGITIZING & GRAPHIC DESIGN SERVICES */}
      <ServicesPromoRibbon />

      {/* 4. CROSS-PROMOTION: "WATCH YOUR CLOTHING BE CREATED LIVE" */}
      <LiveCreationPromo />

      {/* 5. EXPANDED MERCHANDISE SHOWCASE: 11 Products With Category Filters */}
      <section id="merch-collection" className="bg-black text-white py-24 px-6 border-t border-zinc-900 relative">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Flame className="w-3.5 h-3.5 text-red-500" /> Complete Atelier Catalog
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                The Merch Collection
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
                Heavyweight 450GSM cotton fleece, 280GSM drop tees, curved-brim dad hats, and merrowed chenille patches crafted in our New York atelier.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group flex flex-col bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-3xl p-5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Category Pill Tag */}
                <div className="absolute top-8 left-8 z-20">
                  <span className="bg-black/90 backdrop-blur-md border border-zinc-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-zinc-300">
                    {product.category}
                  </span>
                </div>

                {/* Image Container with Ambient Glow */}
                <div className="aspect-square bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden relative flex items-center justify-center p-6 mb-5 border border-zinc-850 group-hover:border-zinc-700 transition-colors">
                  <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-base leading-snug text-white group-hover:text-zinc-200 transition-colors mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-900 mt-auto">
                    <span className="font-black text-xl text-white tracking-tight">
                      {product.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white text-black px-3.5 py-1.5 rounded-xl group-hover:bg-zinc-200 transition-colors shadow-sm">
                      View Item <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Explore Full Shop Action */}
          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 duration-300"
            >
              Explore Full Collection ({products.length} Products) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}