"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle2, Image as ImageIcon, Home, Package } from "lucide-react";

export default function AdminGalleryPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Upload successful! The media is now live in the gallery.");
        setFileName(null);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Home className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 bg-zinc-200/80 hover:bg-zinc-300 text-zinc-800 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Package className="w-3.5 h-3.5" /> Quotes & Orders
            </Link>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Gallery Admin</h1>
          <p className="text-zinc-500 font-medium">Upload new photos and videos to the public archive.</p>
        </header>

        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upload Media</h2>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
            Select a .jpg, .png, .mp4, or .mov file to add to the public gallery grid.
          </p>

          <div className="relative border-2 border-dashed border-zinc-300 rounded-2xl p-12 hover:bg-zinc-50 hover:border-black transition-colors cursor-pointer group">
            <input 
              type="file" 
              accept="image/*,video/mp4,video/quicktime"
              disabled={isUploading}
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
            />
            <div className="pointer-events-none flex flex-col items-center gap-4 text-zinc-400 group-hover:text-black transition-colors">
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="font-bold">Uploading {fileName}...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10" />
                  <span className="font-bold text-lg">Click or drag a file here</span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <CheckCircle2 className="w-4 h-4" /> Goes live instantly
          </div>
        </div>
      </div>
    </div>
  );
}
