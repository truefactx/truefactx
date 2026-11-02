"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

export default function KineticTruefactx() {
  const [animationKey, setAnimationKey] = useState(0);

  const letters = [
    { char: "T", drift: -90, rot: -16, delay: 0.05 },
    { char: "R", drift: -70, rot: 12, delay: 0.12 },
    { char: "U", drift: -50, rot: -10, delay: 0.18 },
    { char: "E", drift: -30, rot: 14, delay: 0.24 },
    { char: "F", drift: 20, rot: -12, delay: 0.30 },
    { char: "A", drift: 45, rot: 10, delay: 0.36 },
    { char: "C", drift: 65, rot: -14, delay: 0.42 },
    { char: "T", drift: 85, rot: 16, delay: 0.48 },
    { char: "X", drift: 105, rot: -22, delay: 0.54 },
  ];

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div id="kinetic-truefactx" className="relative w-full py-12 md:py-20 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black border-y border-zinc-900">
      {/* Background Ambient Glow & Panda Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <img
          src="/images/new_logo_transparent.png"
          alt=""
          className="w-96 h-96 object-contain animate-orbit-slow"
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-10 bg-amber-500/50" />
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-amber-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> High-Voltage Atelier Kinetic Typography
          </span>
          <span className="h-px w-10 bg-amber-500/50" />
        </div>

        {/* Flying TRUEFACTX Typography */}
        <div
          key={animationKey}
          className="my-4 md:my-6 select-none flex items-center justify-center flex-wrap gap-1 md:gap-3"
        >
          {letters.map((item, idx) => (
            <span
              key={`${item.char}-${idx}`}
              className="kinetic-letter font-black text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_10px_25px_rgba(255,255,255,0.25)] hover:scale-110 hover:text-amber-400 transition-transform duration-300 cursor-default"
              style={
                {
                  "--drift": `${item.drift}px`,
                  "--rot": `${item.rot}deg`,
                  animationDelay: `${item.delay}s`,
                } as React.CSSProperties
              }
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* Subtitle & Culture Mission */}
        <div className="max-w-2xl mx-auto mt-2">
          <p className="text-zinc-400 text-sm md:text-lg font-medium tracking-wide">
            STREETWEAR ATELIER • EMBROIDERY DIGITIZING • GRAPHIC DESIGN • NYC
          </p>
          <p className="text-xs text-zinc-600 uppercase tracking-widest mt-2">
            Every garment digitized, cut, embroidered & printed in-house.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors"
            title="Replay Kinetic Fly-In"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Fly-In
          </button>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase tracking-widest transition-transform hover:scale-105"
          >
            Explore Merch <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}