"use client";
import { useState } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle2, ArrowRight, Home, Palette, Cpu, ShoppingBag } from "lucide-react";

export default function CustomOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("service_category", "custom_production");

    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setOrderId(data.orderId);
        setIsSuccess(true);
      } else {
        alert("Error submitting order: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-zinc-950 text-white p-8 sm:p-12 text-center rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Request Received!</h3>
        <p className="text-zinc-400 text-base max-w-md mx-auto mb-6">
          We will review your custom garment design and email you a production quote shortly.
        </p>
        {orderId && (
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-8">
            Quote Reference: <span className="text-white font-bold">{orderId}</span>
          </p>
        )}

        {/* Prominent Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-zinc-200 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white border border-zinc-700 px-6 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-zinc-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Shop
          </Link>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFileName(null);
            }}
            className="w-full sm:w-auto px-6 py-3.5 text-zinc-400 hover:text-white font-bold uppercase text-xs tracking-wider transition-colors underline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="service_category" value="custom_production" />

      {/* Prominent Form Navigation Header with HOME LINK */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm group"
        >
          <Home className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" /> Home
        </Link>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="text-zinc-300">•</span>
          <Link href="/graphic-design" className="hover:text-amber-600 transition-colors flex items-center gap-1">
            <Palette className="w-3 h-3" /> Design
          </Link>
          <span className="text-zinc-300">•</span>
          <Link href="/digitizing" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Digitizing
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Name</label>
          <input required name="name" type="text" className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Email Address</label>
          <input required name="email" type="email" className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Garment Type</label>
          <select name="type" className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black appearance-none">
            <option value="Standalone Patch">Standalone Patch (No Garment)</option>
            <option value="Hoodie">Heavyweight Hoodie</option>
            <option value="T-Shirt">Premium T-Shirt</option>
            <option value="Hat">Dad Hat / Beanie</option>
            <option value="Other">Other (Specify Below)</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Application Method</label>
          <select name="application_method" className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black appearance-none">
            <option value="Custom Patch">Custom Patch</option>
            <option value="Embroidery">Direct Embroidery</option>
            <option value="Vinyl Print">Vinyl Print</option>
            <option value="DTF Print">DTF (Direct-to-Film) Print</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Design Upload</label>
        <div className="relative border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center hover:bg-zinc-50 transition-colors cursor-pointer group">
          <input 
            type="file" 
            name="design_file" 
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
          />
          <div className="pointer-events-none flex flex-col items-center gap-2 text-zinc-400 group-hover:text-black transition-colors">
            <UploadCloud className="w-10 h-10" />
            <span className="font-bold">{fileName ? fileName : "Click or drag to upload your design"}</span>
            {!fileName && <span className="text-sm">JPG, PNG, or PDF up to 10MB</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm uppercase tracking-widest text-zinc-500">Additional Details</label>
        <textarea required name="details" rows={4} className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none" placeholder="Size of patch, placement on garment, exact quantity, etc..."></textarea>
      </div>

      <button disabled={isSubmitting} type="submit" className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md">
        {isSubmitting ? "Submitting..." : <>Request Apparel Quote <ArrowRight className="w-5 h-5" /></>}
      </button>

      {/* Helpful Links Footer */}
      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-black inline-flex items-center gap-1 font-bold">
          <Home className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/graphic-design" className="hover:text-amber-600">Need artwork designed? &rarr;</Link>
          <span>•</span>
          <Link href="/digitizing" className="hover:text-emerald-600">Need stitch files? &rarr;</Link>
        </div>
      </div>
    </form>
  );
}
