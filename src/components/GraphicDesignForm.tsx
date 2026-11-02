"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle2, ArrowRight, X, Image as ImageIcon, Sparkles, Home, Cpu, Scissors, ShoppingBag } from "lucide-react";

export default function GraphicDesignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setFilePreview(null);
      return;
    }
    setFile(selectedFile);
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("service_category", "graphic_design");
    if (file) {
      formData.set("design_file", file);
    }

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
        alert("Error submitting request: " + (data.error || "Please try again."));
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-zinc-950 text-white p-8 sm:p-12 text-center rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
          Design Request Received!
        </h3>
        <p className="text-zinc-400 text-base max-w-md mx-auto mb-6">
          Our design team is reviewing your concept and uploaded artwork. We will reply to your email with a quote and concept brief.
        </p>
        {orderId && (
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-8">
            Quote Reference: <span className="text-white font-bold">{orderId}</span>
          </p>
        )}

        {/* Action Links */}
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
              clearFile();
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
      <input type="hidden" name="service_category" value="graphic_design" />

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
          <Link href="/custom-orders" className="hover:text-black transition-colors flex items-center gap-1">
            <Scissors className="w-3 h-3" /> Apparel
          </Link>
          <span className="text-zinc-300">•</span>
          <Link href="/digitizing" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Digitizing
          </Link>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <Sparkles className="w-4 h-4 text-amber-500" />
        Graphic Design Request Form
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="name"
            type="text"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="e.g. Alex Morgan"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="email"
            type="email"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="alex@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Phone / Instagram <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          <input
            name="phone"
            type="text"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="@yourhandle or 555-123-4567"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Turnaround Speed
          </label>
          <select
            name="urgency"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value="standard">Standard (2 - 3 Days)</option>
            <option value="rush_24h">Rush (24-Hour Turnaround)</option>
            <option value="flexible">Flexible / Planning Phase</option>
          </select>
        </div>
      </div>

      {/* Project Type & Formats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Design Service Type <span className="text-red-500">*</span>
          </label>
          <select
            required
            name="project_type"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value="Vector Redraw">Vector Redraw (Low-Res to Scalable Vector)</option>
            <option value="Logo Design">Custom Logo Design / Brand Mark</option>
            <option value="Apparel Graphic">Apparel Graphic (T-Shirts / Hoodies)</option>
            <option value="Patch & Embroidery Prep">Patch & Embroidery Artwork Prep</option>
            <option value="Typography & Lettering">Custom Typography / Lettering</option>
            <option value="Other Custom Artwork">Other Custom Graphic Design</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Deliverable Formats Needed
          </label>
          <select
            name="format_needed"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value="All Vector Formats (AI, SVG, PDF, EPS, 300DPI PNG)">
              Full Package (AI, SVG, PDF, EPS, 300 DPI PNG)
            </option>
            <option value="Vector SVG / PDF only">Vector SVG & PDF</option>
            <option value="High-Res Transparent PNG (300 DPI)">High-Res Transparent PNG (300 DPI)</option>
            <option value="Adobe Illustrator (.AI)">Adobe Illustrator (.AI)</option>
            <option value="Not Sure / Tell Me">Not Sure (Recommend for me)</option>
          </select>
        </div>
      </div>

      {/* Approximate Dimensions */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
          Intended Size / Dimensions <span className="text-zinc-400 font-normal">(Optional)</span>
        </label>
        <input
          name="dimensions"
          type="text"
          className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
          placeholder="e.g. 10x12 inches chest print, 3.5 inch patch, or 4000x4000px square"
        />
      </div>

      {/* Image / Reference File Upload */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Upload Reference / Sketch / Logo
          </label>
          {file && (
            <button
              type="button"
              onClick={clearFile}
              className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Remove File
            </button>
          )}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-black bg-zinc-100"
              : file
              ? "border-green-500 bg-green-50/30"
              : "border-zinc-300 hover:border-black hover:bg-zinc-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="design_file"
            accept="image/*,.pdf,.ai,.eps,.svg,.psd"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          {filePreview ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm flex items-center justify-center">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-zinc-900">{file?.name}</p>
                <p className="text-xs text-zinc-500">
                  {file ? (file.size / 1024 / 1024).toFixed(2) + " MB" : ""} • Click to replace
                </p>
              </div>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-10 h-10 text-green-600" />
              <p className="font-bold text-sm text-zinc-900">{file.name}</p>
              <p className="text-xs text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Click or drag to change
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400 hover:text-zinc-700">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 mb-1">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm text-zinc-900">
                Click or drag & drop your image here
              </p>
              <p className="text-xs text-zinc-500">
                Supports PNG, JPG, SVG, PDF, AI, PSD (up to 25MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Brief / Notes */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
          Design Brief & Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          name="details"
          rows={4}
          className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none"
          placeholder="Describe your design idea, style preference, preferred color codes, text to include, inspiration links, or what parts of your image you want modified..."
        ></textarea>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest text-base hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          "Uploading & Submitting..."
        ) : (
          <>
            Submit Design Request <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Helpful Links Footer */}
      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-black inline-flex items-center gap-1 font-bold">
          <Home className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/digitizing" className="hover:text-emerald-600">Need embroidery stitch files? &rarr;</Link>
          <span>•</span>
          <Link href="/custom-orders" className="hover:text-black">Need custom garments? &rarr;</Link>
        </div>
      </div>
    </form>
  );
}
