"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Radio, 
  Video, 
  Eye, 
  ExternalLink, 
  Scissors, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Tv
} from "lucide-react";

export default function LiveCreationPromo() {
  const [activeCamera, setActiveCamera] = useState<number>(1);

  const cameras = [
    {
      id: 1,
      name: "Cam 01: Tajima 3D Puff Embroidery",
      description: "Direct needle-head capture running 950 RPM with high-density polyester thread.",
      orderOnDeck: "#TF-9421 • Midnight Heavyweight Fleece Hoodie",
      detail: "Stitching: 18,400 / 29,800 stitches (62%)",
      poster: "/images/macro_laser_patch.jpg",
    },
    {
      id: 2,
      name: "Cam 02: DTF Heat Press & Vinyl",
      description: "Dual-platen pneumatic heat press applying ultra-durable opaque prints at 320°F.",
      orderOnDeck: "#TF-9422 • Vintage Washed Panda Yin-Yang Tee",
      detail: "Press cycle: 15s dwell time • Cold peel finish",
      poster: "/images/bg_custom_production.jpg",
    },
    {
      id: 3,
      name: "Cam 03: Laser Patch & Merrowing",
      description: "CO2 precision laser cutting twill emblems with merrowed border edge overlocking.",
      orderOnDeck: "#TF-9423 • 4-Inch Chenille Panda Atelier Crest",
      detail: "Laser perimeter: 100% sealed • Overlock complete",
      poster: "/images/macro_laser_patch.jpg",
    },
    {
      id: 4,
      name: "Cam 04: Digitizing & Vector Studio",
      description: "Engineers inspecting stitch pathing, pull compensation, and underlay densities.",
      orderOnDeck: "#TF-9424 • Client Vector Redraw & .DST Calibration",
      detail: "Wilcom / Tajima DG16 stitch path verified",
      poster: "/images/bg_digitizing.jpg",
    },
  ];

  const currentCam = cameras.find((c) => c.id === activeCamera) || cameras[0];

  return (
    <section id="live-workshop" className="relative w-full py-24 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            Live Workshop Broadcast
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-5">
            Watch Your Clothing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
              Be Created Live.
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            We don’t hide our manufacturing in a black box. Every custom hoodie, vintage tee, and embroidered dad hat is cut, stitched, and pressed on live stream. Tune into TikTok, YouTube, and Facebook to watch your exact piece come alive.
          </p>
        </div>

        {/* Live Workshop Broadcast Console */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl mb-16">
          
          {/* Console Header Bar */}
          <div className="bg-zinc-900/90 border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-black text-sm uppercase tracking-widest text-white">
                Pandgaea Atelier Live Feed
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                NYC ATELIER • 4K MULTI-CAM
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5 text-red-400">
                <Eye className="w-4 h-4" /> 1,480 Viewing
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300 font-mono">BROADCAST 1080P 60FPS</span>
            </div>
          </div>

          {/* Interactive Screen & Camera Switcher Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left 8 Cols: Video Stream Monitor */}
            <div className="lg:col-span-8 relative aspect-video bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
              {/* Actual Workshop Video Playing */}
              <video
                key={activeCamera}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover brightness-105 contrast-110"
              >
                <source src="/images/pandgaea_hero_freestyle.mp4" type="video/mp4" />
                <source src="/images/Panda_Yin_Yang_Logo_Hatching_Video.mp4" type="video/mp4" />
              </video>

              {/* Broadcast Overlay Graphics */}
              <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/40">
                {/* Top Overlay */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white">
                    <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span>REC ● [LIVE FEED]</span>
                  </div>

                  <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-amber-400 font-bold">
                    {currentCam.name.split(":")[0]}
                  </div>
                </div>

                {/* Bottom Overlay - Current Order on Deck */}
                <div className="bg-black/85 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 max-w-lg shadow-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      CURRENT ATELIER WORK IN PROGRESS
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-sm md:text-base truncate">
                    {currentCam.orderOnDeck}
                  </h4>
                  <p className="text-zinc-400 text-xs font-mono mt-1">
                    {currentCam.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Camera Switcher Controls */}
            <div className="lg:col-span-4 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <Tv className="w-4 h-4 text-white" /> Switch Workshop Cameras
                </h4>

                <div className="space-y-3">
                  {cameras.map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => setActiveCamera(cam.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                        activeCamera === cam.id
                          ? "bg-zinc-900 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                          : "bg-black/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        activeCamera === cam.id 
                          ? "bg-red-500 text-white" 
                          : "bg-zinc-800 text-zinc-400"
                      }`}>
                        <Video className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">
                            {cam.name}
                          </p>
                          {activeCamera === cam.id && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {cam.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Shouting Tag */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="bg-gradient-to-r from-zinc-900 to-black p-4 rounded-2xl border border-zinc-800">
                  <p className="text-xs font-black uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Order Shoutout Guarantee
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Leave your handle at checkout or use hashtag <span className="text-white font-mono font-bold">#TrueFactxLive</span> to have your garment tagged and presented live to the chat!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross Promotion Channel Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Cross-Platform Broadcast Channels
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">
              Join Our Live Community
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. TikTok Live */}
            <a
              href="https://www.tiktok.com/@truefactx6"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-pink-500/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(236,72,153,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full">
                    Daily Live Streams
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                  TikTok Live @truefactx6
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                  Watch fast-paced live embroidery stitching, 3D puff cap setups, vinyl weeding, and live viewer giveaways.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                  Tune In On TikTok
                </span>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>

            {/* 2. YouTube Channel */}
            <a
              href="https://www.youtube.com/@TrueFactx"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-red-500/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                    4K Studio Archive
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                  YouTube @TrueFactx
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                  Full in-depth machine embroidery builds, Wilcom digitizing tutorials, equipment tours, and high-res time-lapses.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                  Watch On YouTube
                </span>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>

            {/* 3. Facebook Community */}
            <a
              href="https://www.facebook.com/truefactx165/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-blue-500/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                    Community & Q&A
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  Facebook @truefactx165
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                  Connect with streetwear designers, discuss bulk order inquiries, and get notified about special drop schedules.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  Join On Facebook
                </span>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
          </div>
        </div>

        {/* 3-Step Live Production Workflow */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white text-center mb-10">
            How The Live Production Experience Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center mb-4 shadow-lg">
                1
              </div>
              <h4 className="font-bold text-base text-white uppercase tracking-tight mb-2">
                Order Your Custom Garment
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Choose a blank hoodie, drop tee, dad hat, or upload your artwork for custom digitizing and production.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center mb-4 shadow-lg">
                2
              </div>
              <h4 className="font-bold text-base text-white uppercase tracking-tight mb-2">
                Get Your Stream Queue Number
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                You’ll receive a production schedule email letting you know the exact day and time slot your order goes on the machine.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center mb-4 shadow-lg">
                3
              </div>
              <h4 className="font-bold text-base text-white uppercase tracking-tight mb-2">
                Tune In & Watch It Stitched Live
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Join our TikTok or YouTube live, interact with the makers, and watch your garment packaged and sealed on camera.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-orders"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Order Custom Garment To Be Made Live
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-700 hover:border-white text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
            >
              Shop Atelier Blanks
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}