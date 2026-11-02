"use client";

import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Media = {
  filename: string;
  url: string;
  type: "image" | "video";
};

export default function GalleryPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.files) setMedia(data.files);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="font-black text-xl tracking-widest uppercase">The Archive</span>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">
          Photo & Video <br/> Archive.
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
          A running visual log of our past work, custom pieces, and live production runs.
        </p>
      </header>

      {/* Dynamic Masonry Grid */}
      <section className="container mx-auto px-6">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-24 text-zinc-500 font-bold uppercase tracking-widest border-2 border-dashed border-zinc-800 rounded-3xl">
            No media found in the archive yet.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 max-w-7xl mx-auto">
            {media.map((item, i) => (
              <div key={i} className="break-inside-avoid relative group overflow-hidden border-2 border-zinc-900 bg-zinc-900">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500 pointer-events-none" />
                
                {item.type === "video" ? (
                  <>
                    <video 
                      src={item.url} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Play className="w-3 h-3 fill-white" /> Video
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.url} 
                    alt={`Gallery asset ${i}`} 
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
