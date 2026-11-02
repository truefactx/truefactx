import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-zinc-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col items-start col-span-1 md:col-span-2">
          <img 
            src="/images/new_logo_transparent.png" 
            alt="Pandgaea" 
            className="w-16 h-16 object-contain mb-4"
          />
          <p className="text-zinc-500 font-medium max-w-sm mb-6">
            Premium blanks, custom embroidery, and live workshop production. Operating out of New York.
          </p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.tiktok.com/@truefactx6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="https://www.facebook.com/truefactx165/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/@TrueFactx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Services & Shop Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold uppercase tracking-widest mb-2 text-sm text-zinc-300">Services & Shop</h4>
          <Link href="/shop" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">All Products</Link>
          <Link href="/custom-orders" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">Custom Apparel Quotes</Link>
          <Link href="/graphic-design" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">Graphic Design</Link>
          <Link href="/digitizing" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">Embroidery Digitizing</Link>
          <Link href="/about" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">The Workshop</Link>
          <Link href="/gallery" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">The Archive (Gallery)</Link>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold uppercase tracking-widest mb-2 text-sm text-zinc-300">Support</h4>
          <a href="mailto:team@truefactx.net" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">team@truefactx.net</a>
          <a href="tel:3478444556" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">347-844-4556</a>
          <Link href="#" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">Shipping Policy</Link>
          <Link href="#" className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">Returns & Exchanges</Link>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 text-center text-xs font-bold uppercase tracking-widest text-zinc-700">
        © {new Date().getFullYear()} Pandgaea. All rights reserved. TrueFactx.
      </div>
    </footer>
  );
}
