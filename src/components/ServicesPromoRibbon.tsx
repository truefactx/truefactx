"use client";

import Link from "next/link";
import { Palette, Cpu, Scissors, ArrowRight, UploadCloud, CheckCircle2, Zap } from "lucide-react";

export default function ServicesPromoRibbon() {
  return (
    <section id="services-spotlight" className="relative w-full py-16 px-6 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Subtle Gradient & Logo Ambient Accent */}
      <div className="absolute top-0 right-10 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Banner Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> B2B & Creator Workshop Services
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Artwork • Digitizing • Production
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-2">
              Have an idea or existing graphic? Our New York production floor handles everything from raw sketches to calibrated stitch files and finished streetwear garments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/digitizing"
              className="px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-bold uppercase tracking-wider transition-all"
            >
              Digitize Stitch File
            </Link>
            <Link
              href="/graphic-design"
              className="px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-bold uppercase tracking-wider transition-all"
            >
              Vector Design
            </Link>
          </div>
        </div>

        {/* Dual High-Impact Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Graphic Design Spotlight */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-black/70 overflow-hidden p-8 flex flex-col justify-between hover:border-amber-500/60 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/bg_graphic_design.jpg"
                alt="Graphic Design Background"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  24H Turnaround
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-amber-300 transition-colors">
                Graphic Design Services
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                We transform low-res images, hand drawings, and concepts into razor-sharp, production-ready vector assets for printing and embroidery.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Vector redrawing (AI, SVG, EPS, 300 DPI PNG)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Color separations for screenprint & DTF transfers</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Brand logos, streetwear crests & typographic art</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-zinc-800">
              <Link
                href="/graphic-design"
                className="w-full py-3.5 px-4 bg-white text-black hover:bg-amber-400 rounded-xl text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <UploadCloud className="w-4 h-4" /> Upload Artwork For Design <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Embroidery Digitizing Spotlight */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-black/70 overflow-hidden p-8 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/bg_digitizing.jpg"
                alt="Embroidery Digitizing Background"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Machine Calibrated
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Embroidery Digitizing
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Expert machine embroidery programming calibrated for proper stitch pathing, zero thread breakage, pull compensation, and 3D foam puff.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>.DST, .PES, .EMB, .EXP formats for all machines</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Specialized 3D Puff, Hat Cap & Flat calibration</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Detailed stitch simulation PDF proof included</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-zinc-800">
              <Link
                href="/digitizing"
                className="w-full py-3.5 px-4 bg-white text-black hover:bg-emerald-400 rounded-xl text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                <UploadCloud className="w-4 h-4" /> Upload Logo For Digitizing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Custom Production & Live Crafting */}
          <div className="group relative rounded-3xl border border-zinc-800 bg-black/70 overflow-hidden p-8 flex flex-col justify-between hover:border-white/60 transition-all duration-500 shadow-xl md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/bg_custom_production.jpg"
                alt="Custom Production Background"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center shadow-lg">
                  <Scissors className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 bg-zinc-800/80 border border-zinc-700 px-3 py-1 rounded-full">
                  Live Workshop
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-zinc-200 transition-colors">
                Custom Apparel Production
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Order custom heavyweight fleece hoodies, vintage washed tees, beanies, or laser-cut patches created live in our New York atelier.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                  <span>Small batch runs & one-of-a-kind streetwear pieces</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                  <span>Custom merrowed patches up to 8 inches</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                  <span>Watch your order cut, stitched & printed LIVE on stream</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-zinc-800">
              <Link
                href="/custom-orders"
                className="w-full py-3.5 px-4 bg-white text-black hover:bg-zinc-200 rounded-xl text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                Request Custom Garments <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}