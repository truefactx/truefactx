import Link from "next/link";
import { ArrowLeft, Home, Cpu, Check, Layers, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import DigitizingForm from "@/components/DigitizingForm";

export const metadata = {
  title: "Embroidery Digitizing Services | Pandgaea",
  description: "Commercial embroidery digitizing for Tajima, Brother, and all machine brands. Clean stitch files, 3D puff, and patch calibration.",
};

export default function DigitizingPage() {
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
            <Link
              href="/custom-orders"
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              Apparel
            </Link>
            <Link
              href="/graphic-design"
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              Graphic Design
            </Link>
            <span className="px-3 py-1.5 rounded-full bg-white text-black shadow-sm font-black">
              Digitizing
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: Context & Technical Info with Relative Background Image */}
        <div className="lg:w-1/3 bg-zinc-950 text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 pt-12 lg:pt-16 border-r-4 border-black relative overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/bg_digitizing.jpg" 
              alt="Embroidery Digitizing Machine Background" 
              className="w-full h-full object-cover opacity-30 filter contrast-125 brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-zinc-950/80 to-black/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_50%)]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Cpu className="w-3.5 h-3.5" /> Embroidery Engineering
            </div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight drop-shadow-md">
              Embroidery <br /> Digitizing
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-medium leading-relaxed mb-8 drop-shadow-sm">
              We translate your 2D artwork into precision stitch files calibrated with the exact underlay, density, and pull compensation required to run cleanly on your machines without thread breaks or puckering.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-200">Universal Machine Formats</h4>
                  <p className="text-xs text-zinc-400">Delivered in .DST, .PES, .EMB, .EXP, and .JEF with complete thread sequence sheets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-200">3D Puff & Cap Calibration</h4>
                  <p className="text-xs text-zinc-400">Specially digitized center-out sequencing for curved hat frames and capped 3D foam stitches.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-200">Stitch Simulation & Free Tweaks</h4>
                  <p className="text-xs text-zinc-400">Every file comes with visual 3D simulation preview and free minor revisions for optimal sew-out.</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="border-t border-zinc-800/80 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Digitizing Steps</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px]">1</span>
                  Upload logo & specify target dimensions & garment
                </li>
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px]">2</span>
                  Receive stitch estimate & simulation approval
                </li>
                <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px]">3</span>
                  Load file straight into your embroidery machine
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-800 relative z-10">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Direct Contact</p>
            <div className="flex flex-col gap-1 text-sm font-medium">
              <a href="mailto:team@truefactx.net" className="text-white hover:underline">
                team@truefactx.net
              </a>
              <a href="tel:3478444556" className="text-white hover:underline">
                347-844-4556
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The Interactive Upload Form */}
        <div className="lg:w-2/3 flex items-center justify-center p-6 sm:p-10 lg:p-16 pt-12 lg:pt-16 bg-white">
          <div className="max-w-2xl w-full">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                Order Embroidery Digitizing
              </h2>
              <p className="text-zinc-600 text-sm">
                Upload your graphic or logo image below. Specify dimensions and file format for instant quote review.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-3xl shadow-sm">
              <DigitizingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
