"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle2, ArrowRight, X, Image as ImageIcon, Cpu, Home, Palette, Scissors, ShoppingBag } from "lucide-react";

export default function DigitizingForm() {
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
    formData.set("service_category", "digitizing");
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
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
          Digitizing Request Received!
        </h3>
        <p className="text-zinc-400 text-base max-w-md mx-auto mb-6">
          Our embroidery digitizer is analyzing your design for stitch counts, pull compensation, and garment calibration. We'll send your quote and stitch simulation preview via email shortly.
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
            Submit Another Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="service_category" value="digitizing" />

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
          <Link href="/graphic-design" className="hover:text-amber-600 transition-colors flex items-center gap-1">
            <Palette className="w-3 h-3" /> Design
          </Link>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <Cpu className="w-4 h-4 text-emerald-500" />
        Embroidery Digitizing Request Form
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
            placeholder="e.g. Jordan Smith"
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
            placeholder="jordan@example.com"
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
            placeholder="@yourbrand or 555-123-4567"
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
            <option value="standard_24_48h">Standard (24 - 48 Hours)</option>
            <option value="rush_sameday">Rush Same-Day (12 - 24 Hours)</option>
            <option value="planning">Estimate / Planning Only</option>
          </select>
        </div>
      </div>

      {/* Style & Target Fabric */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Embroidery Style <span className="text-red-500">*</span>
          </label>
          <select
            required
            name="project_type"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value="Standard Flat Embroidery">Standard Flat Embroidery</option>
            <option value="3D Puff Embroidery">3D Puff Embroidery (Raised Foam)</option>
            <option value="Custom Patch (Merrowed/Laser Border)">Custom Patch (Bordered)</option>
            <option value="Cap / Hat Front (Curved calibration)">Cap / Hat Front (Center-Out Calibrated)</option>
            <option value="Full Jacket Back (Large Format)">Full Jacket Back (Large Format)</option>
            <option value="Applique / Specialty">Applique / Specialty Stitch</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Garment / Fabric Type
          </label>
          <select
            name="target_material"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value="Heavy Fleece / Hoodie">Heavyweight Fleece / Hoodie</option>
            <option value="Structured Baseball Cap / Hat">Structured Hat / Cap</option>
            <option value="Beanie / Ribbed Knit">Beanie / Ribbed Knit</option>
            <option value="T-Shirt / Pique Polo">T-Shirt / Polo (Lightweight)</option>
            <option value="Denim / Canvas / Outerwear">Denim / Canvas / Outerwear</option>
            <option value="Twill Patch Backing">Twill Patch Backing</option>
          </select>
        </div>
      </div>

      {/* Format & Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Machine File Format Needed
          </label>
          <select
            name="format_needed"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm appearance-none"
          >
            <option value=".DST (Tajima / Universal Commercial)">.DST (Tajima / Universal)</option>
            <option value=".PES (Brother / Babylock)">.PES (Brother / Babylock)</option>
            <option value=".EMB (Wilcom Master Source)">.EMB (Wilcom Master Source)</option>
            <option value=".EXP (Melco / Bernina)">.EXP (Melco / Bernina)</option>
            <option value=".JEF (Janome)">.JEF (Janome)</option>
            <option value="All Standard Formats (DST + PES + EMB + PDF Sheet)">
              Full Pack (DST, PES, EMB + PDF Stitch Sheet)
            </option>
            <option value="Not Sure / Ask Technician">Not Sure (Help me choose)</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Exact Embroidery Dimensions <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="dimensions"
            type="text"
            className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="e.g. 3.5 inches wide x 2.2 inches high"
          />
        </div>
      </div>

      {/* Image / Artwork Upload */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
            Upload Logo / Artwork to Digitize <span className="text-red-500">*</span>
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
              ? "border-emerald-500 bg-emerald-50/30"
              : "border-zinc-300 hover:border-black hover:bg-zinc-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="design_file"
            accept="image/*,.pdf,.ai,.eps,.svg"
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
              <ImageIcon className="w-10 h-10 text-emerald-600" />
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
                Click or drag & drop artwork to digitize
              </p>
              <p className="text-xs text-zinc-500">
                Supports PNG, JPG, SVG, AI, EPS, PDF (up to 25MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Special Stitch Instructions */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs uppercase tracking-widest text-zinc-500">
          Stitch Instructions & Thread Notes <span className="text-zinc-400 font-normal">(Optional)</span>
        </label>
        <textarea
          name="details"
          rows={3}
          className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none"
          placeholder="Mention thread color requirements (Madeira/Isacord), small text concerns, satin vs fill preferences, underlay thickness, or machine limitations..."
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
            Submit for Digitizing <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Helpful Links Footer */}
      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-black inline-flex items-center gap-1 font-bold">
          <Home className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/graphic-design" className="hover:text-amber-600">Need artwork designed? &rarr;</Link>
          <span>•</span>
          <Link href="/custom-orders" className="hover:text-black">Need custom garments? &rarr;</Link>
        </div>
      </div>
    </form>
  );
}
