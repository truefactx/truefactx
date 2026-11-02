"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame, ShoppingBag } from "lucide-react";

export default function FlyingApparelHero() {
  const [activeSet, setActiveSet] = useState<"dark" | "light">("dark");

  const apparelData = {
    dark: {
      hoodie: {
        img: "/images/transparent_black hoodie white vinyl logo.png",
        title: "Pandgaea Signature Black Hoodie",
        price: "$65.00",
        tag: "450 GSM Heavy Fleece",
        link: "/shop/1",
      },
      tee: {
        img: "/images/transparent_white tee black logo..png",
        title: "Classic White Logo Tee",
        price: "$35.00",
        tag: "280 GSM Vintage Wash",
        link: "/shop/2",
      },
      hat: {
        img: "/images/transparent_black dad hat.png",
        title: "Embroidered Black Dad Hat",
        price: "$28.00",
        tag: "6-Panel Curved Brim",
        link: "/shop/3",
      },
      patch: {
        img: "/images/transparent_patch.png",
        title: "Custom 8\" Patch",
        price: "$20.00",
        tag: "High-Density Stitch",
        link: "/shop/4",
      },
    },
    light: {
      hoodie: {
        img: "/images/transparent_white hoodie black vinyl logo.png",
        title: "White Signature Hoodie",
        price: "$65.00",
        tag: "450 GSM French Terry",
        link: "/shop/5",
      },
      tee: {
        img: "/images/transparent_black tee vinly logo.png",
        title: "Black Logo Tee",
        price: "$35.00",
        tag: "Drop Shoulder Cut",
        link: "/shop/6",
      },
      hat: {
        img: "/images/transparent_white dad hat.png",
        title: "White Dad Hat",
        price: "$28.00",
        tag: "Embroidered Eyelets",
        link: "/shop/8",
      },
      patch: {
        img: "/images/transparent_cream wool beanie.png",
        title: "Cream Wool Beanie",
        price: "$24.00",
        tag: "Fold-Over Woven Label",
        link: "/shop/7",
      },
    },
  };

  const current = apparelData[activeSet];

  return (
    <section id="floating-apparel" className="relative w-full py-20 px-6 overflow-hidden bg-black border-t border-zinc-900 select-none">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-zinc-900/60 via-black to-black pointer-events-none" />

      {/* Pulsing Central Panda Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
        <img
          src="/images/new_logo_transparent.png"
          alt=""
          className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] object-contain animate-logo-glow"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> 3D Floating Apparel Vault
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Streetwear In Motion
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-3">
              Precision cut, high-density embroidery, and premium heavyweight blanks floating into reality. Click any piece to view details and order.
            </p>
          </div>

          {/* Palette Switcher */}
          <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-full z-20">
            <button
              onClick={() => setActiveSet("dark")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSet === "dark"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Midnight Vault
            </button>
            <button
              onClick={() => setActiveSet("light")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSet === "light"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Ghost Vault
            </button>
          </div>
        </div>

        {/* 3D Flying Floating Apparel Chamber */}
        <div className="relative min-h-[580px] md:min-h-[640px] w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl p-6 md:p-12 overflow-hidden flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />

          {/* 1. LEFT PIECE: Flying Hoodie */}
          <div className="absolute left-4 md:left-12 top-10 md:top-12 z-20 hover:z-40 focus-within:z-40 animate-fly-left">
            <Link
              href={current.hoodie.link}
              className="group block relative cursor-pointer"
            >
              <div className="relative w-48 sm:w-64 md:w-80 aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={current.hoodie.img}
                  alt={current.hoodie.title}
                  className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_30px_45px_rgba(255,255,255,0.25)] transition-all duration-500"
                />
              </div>

              {/* Floating Pill Tag */}
              <div className="mt-2 bg-black/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-3 max-w-[220px] shadow-2xl group-hover:border-amber-400 transition-all">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                  {current.hoodie.tag}
                </span>
                <p className="text-xs font-bold text-white truncate">{current.hoodie.title}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900">
                  <span className="text-sm font-black text-white">{current.hoodie.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-white px-2 py-0.5 rounded-md flex items-center gap-1 group-hover:bg-amber-400 transition-colors">
                    Shop <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. CENTER PIECE: Flying Graphic T-Shirt */}
          <div className="relative z-30 hover:z-40 focus-within:z-40 animate-fly-center my-8 md:my-0">
            <Link
              href={current.tee.link}
              className="group block relative cursor-pointer"
            >
              <div className="relative w-56 sm:w-72 md:w-96 aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={current.tee.img}
                  alt={current.tee.title}
                  className="w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_35px_50px_rgba(255,255,255,0.3)] transition-all duration-500"
                />
              </div>

              {/* Floating Center Badge */}
              <div className="mx-auto mt-2 bg-black/95 backdrop-blur-md border border-zinc-700/80 rounded-2xl p-3.5 max-w-[260px] shadow-2xl text-center group-hover:border-white transition-all">
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">
                  <Flame className="w-3 h-3" /> {current.tee.tag}
                </div>
                <p className="text-sm font-black text-white truncate">{current.tee.title}</p>
                <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-zinc-800">
                  <span className="text-base font-black text-white">{current.tee.price}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-black bg-white px-3 py-1 rounded-lg flex items-center gap-1 shadow-md group-hover:bg-zinc-200 transition-colors">
                    <ShoppingBag className="w-3 h-3" /> View Product
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* 3. RIGHT PIECE: Flying Dad Hat / Headwear */}
          <div className="absolute right-4 md:right-12 top-8 md:top-14 z-20 hover:z-40 focus-within:z-40 animate-fly-right">
            <Link
              href={current.hat.link}
              className="group block relative cursor-pointer"
            >
              <div className="relative w-44 sm:w-56 md:w-72 aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={current.hat.img}
                  alt={current.hat.title}
                  className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_30px_45px_rgba(255,255,255,0.25)] transition-all duration-500"
                />
              </div>

              {/* Floating Pill Tag */}
              <div className="mt-2 bg-black/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-3 max-w-[210px] shadow-2xl ml-auto group-hover:border-emerald-400 transition-all">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-0.5">
                  {current.hat.tag}
                </span>
                <p className="text-xs font-bold text-white truncate">{current.hat.title}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900">
                  <span className="text-sm font-black text-white">{current.hat.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-white px-2 py-0.5 rounded-md flex items-center gap-1 group-hover:bg-emerald-400 transition-colors">
                    Shop <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* 4. FLOATING ACCENT: Merrowed Patch / Wool Beanie */}
          <div className="absolute bottom-6 right-8 md:right-28 z-20 hover:z-40 focus-within:z-40 animate-fly-hat hidden sm:block">
            <Link
              href={current.patch.link}
              className="group block relative cursor-pointer"
            >
              <div className="relative w-28 md:w-36 aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-115">
                <img
                  src={current.patch.img}
                  alt={current.patch.title}
                  className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
                />
              </div>
              <div className="bg-black/90 backdrop-blur-md border border-zinc-800 rounded-xl px-2.5 py-1.5 text-center mt-1 group-hover:border-amber-400 transition-colors">
                <p className="text-[10px] font-black uppercase text-zinc-300 truncate">{current.patch.title}</p>
                <span className="text-xs font-bold text-amber-400">{current.patch.price}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <img src="/images/new_logo_transparent.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              TrueFactx Atelier Guaranteed Quality • Hand Finished in NYC
            </span>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-amber-400 transition-colors"
          >
            View All 11 Atelier Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
