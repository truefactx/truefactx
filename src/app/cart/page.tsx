"use client";

import Link from "next/link";
import { ArrowLeft, Trash2, ShieldCheck, Lock, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating checkout: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-black font-sans pb-24">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link href="/shop" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-black transition-opacity">
              <ArrowLeft className="w-3.5 h-3.5" /> Keep Shopping
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Link href="/custom-orders" className="hover:text-black transition-colors">Apparel</Link>
            <span>•</span>
            <Link href="/graphic-design" className="hover:text-black transition-colors">Design</Link>
            <span>•</span>
            <Link href="/digitizing" className="hover:text-black transition-colors">Digitizing</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 md:py-24 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Your Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link href="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors shadow-sm">
                <Home className="w-4 h-4" /> Return to Home
              </Link>
              <Link href="/shop" className="inline-block bg-zinc-100 text-black border border-zinc-200 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors">
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="lg:w-2/3 flex flex-col gap-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm items-center">
                  <div className="w-24 h-24 bg-zinc-100 rounded-xl p-2 shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    {item.size && <p className="text-sm font-bold text-zinc-400 uppercase">Size: {item.size}</p>}
                    <p className="font-black mt-2">${item.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 font-bold transition-colors"
                      >-</button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 font-bold transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm sticky top-24">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-zinc-100 pb-4">Order Summary</h3>
                
                <div className="flex justify-between mb-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between mb-6 text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span>{cartTotal > 75 ? 'Free' : 'Calculated at next step'}</span>
                </div>
                
                <div className="flex justify-between mb-8 text-2xl font-black border-t border-zinc-100 pt-6">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl hover:translate-y-[-2px]"
                >
                  <Lock className="w-4 h-4" /> Checkout Securely
                </button>

                <p className="text-xs text-center font-bold text-zinc-400 uppercase tracking-widest mt-6 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Secure checkout powered by Stripe
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
