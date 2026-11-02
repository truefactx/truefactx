import Link from "next/link";
import { ArrowLeft, Home, Scissors, ShoppingBag } from "lucide-react";
import CustomOrderForm from "@/components/CustomOrderForm";

export default function CustomOrdersPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans pb-24">
      {/* Top Sticky Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800 text-white">
        <div className="container mx-auto px-6 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Shop
            </Link>
          </div>

          {/* Quick Service Switcher Tabs */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-zinc-900 p-1.5 rounded-full border border-zinc-800">
            <span className="px-3 py-1.5 rounded-full bg-white text-black shadow-sm font-black">
              Apparel
            </span>
            <Link
              href="/graphic-design"
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              Graphic Design
            </Link>
            <Link
              href="/digitizing"
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              Digitizing
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Context / Branding with Relative Background Image */}
        <div className="lg:w-1/3 bg-zinc-950 text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 pt-12 lg:pt-16 border-r-4 border-black relative overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/bg_custom_production.jpg" 
              alt="Custom Production Workshop Background" 
              className="w-full h-full object-cover opacity-30 filter contrast-125 brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-zinc-950/80 to-black/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-md">
              Custom <br/> Production
            </h1>
            <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-8 drop-shadow-sm">
              Submit your logo or artwork to get a quote for a custom run. 
              We offer Custom Patches (up to 8 inches), Direct Embroidery, Vinyl Prints, and DTF.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-zinc-300">
                <span className="text-white mt-0.5">01</span> Submit your artwork and requirements.
              </li>
              <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-zinc-300">
                <span className="text-white mt-0.5">02</span> We review the design and send a quote.
              </li>
              <li className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-zinc-300">
                <span className="text-white mt-0.5">03</span> We produce it live in the workshop.
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Other Services</p>
              <div className="flex flex-col gap-2 text-xs font-medium">
                <Link href="/graphic-design" className="text-amber-400 hover:underline flex items-center justify-between">
                  <span>Need custom artwork or vector redraw?</span> <span>&rarr;</span>
                </Link>
                <Link href="/digitizing" className="text-emerald-400 hover:underline flex items-center justify-between">
                  <span>Need embroidery DST / PES stitch files?</span> <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-800 relative z-10">
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest mb-2">
              Need help?
            </p>
            <div className="flex flex-col gap-1">
              <a href="mailto:team@truefactx.net" className="text-white hover:underline">team@truefactx.net</a>
              <a href="tel:3478444556" className="text-white hover:underline">347-844-4556</a>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="lg:w-2/3 flex items-center justify-center p-6 sm:p-10 lg:p-16 pt-12 lg:pt-16 bg-white">
          <div className="max-w-2xl w-full">
            <CustomOrderForm />
          </div>
        </div>

      </div>
    </main>
  );
}
