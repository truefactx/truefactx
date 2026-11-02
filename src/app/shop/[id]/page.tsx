import Link from "next/link";
import { ArrowLeft, ShoppingBag, Home } from "lucide-react";
import { products } from "@/lib/products";
import AddToCartClient from "@/components/AddToCartClient";

// Required for dynamic routes in Next.js app router if not fetching from DB
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-24 text-center font-black text-4xl uppercase">Product Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link href="/shop" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-black transition-opacity">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
            </Link>
          </div>
          <Link href="/cart" className="relative hover:opacity-70 transition-opacity">
            <ShoppingBag className="w-6 h-6" />
          </Link>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Massive Image Showcase */}
        <div className="lg:w-1/2 bg-zinc-50 flex items-center justify-center p-12 lg:p-24 min-h-[50vh] lg:min-h-screen border-r border-zinc-200">
          <img 
            src={product.img} 
            alt={product.name} 
            className="w-full max-w-2xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out" 
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:w-1/2 flex items-center p-8 lg:p-24">
          <div className="max-w-xl w-full mx-auto flex flex-col items-start">
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Pandgaea / {product.category}
            </p>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Client Component for Sizes & Price */}
            <AddToCartClient product={product} />

          </div>
        </div>
        
      </div>
    </main>
  );
}
