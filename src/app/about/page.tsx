import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import LiveStream from "@/components/LiveStream";

export default function WorkshopPage() {
  const galleryImages = [
    "/images/gallery_1.png",
    "/images/gallery_2.png",
    "/images/gallery_4.png",
    "/images/gallery_5.png",
    "/images/gallery_6.png",
    "/images/gallery_7.png",
    "/images/galley 3.png",
    "/images/store_front_gallery.png"
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-24 selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="font-black text-xl tracking-widest uppercase">The Workshop</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@truefactx6" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/truefactx165/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@TrueFactx" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero / Live Stream Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 border-b border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              Live Production feed
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Transparency <br/> In Craft.
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-lg leading-relaxed">
              We aren't hiding behind a computer. Every single order that comes through the site is cut, stitched, printed, and pressed live on camera. 
              You can tune in and watch your exact garment being made in real time.
            </p>
            <div className="flex gap-4">
              <Link href="/shop" className="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 transition-colors">
                Shop The Process
              </Link>
            </div>
          </div>
          
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-black rounded-xl border border-zinc-800 overflow-hidden">
              <LiveStream />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 border-b border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Past Work</h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            A look back at some of our favorite custom runs, shop drops, and pieces spotted out in the wild.
          </p>
        </div>

        {/* Central Team/Hero Photo */}
        <div className="w-full max-w-5xl mx-auto mb-8 border-4 border-zinc-900 bg-zinc-900 p-2">
          <img 
            src="/images/gallery_center.jpg" 
            alt="The Team" 
            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>

        {/* Masonry-ish Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 max-w-7xl mx-auto mt-12">
          {galleryImages.map((src, i) => (
            <div key={i} className="break-inside-avoid relative group overflow-hidden border-2 border-zinc-900">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-500" />
              <img 
                src={src} 
                alt={`Gallery photo ${i+1}`} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Location */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 text-zinc-700">Operating out of</h2>
        <p className="text-4xl font-black uppercase tracking-widest text-zinc-300">New York</p>
      </section>

    </main>
  );
}
