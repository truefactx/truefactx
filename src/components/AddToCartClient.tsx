"use client";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartClient({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const { addToCart } = useCart();
  const router = useRouter();

  const isOneSize = product.category === "Headwear" || product.category === "Accessories";
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  // Calculate price (+ $10 for 3XL-5XL)
  const basePriceNum = parseInt(product.price.replace("$", ""));
  const isOversized = ["3XL", "4XL", "5XL"].includes(selectedSize);
  const currentPrice = isOneSize ? basePriceNum : basePriceNum + (isOversized ? 10 : 0);

  const handleAddToCart = () => {
    const finalSize = isOneSize ? null : selectedSize;
    addToCart({
      id: `${product.id}-${finalSize || 'onesize'}`,
      productId: product.id,
      name: product.name,
      price: currentPrice,
      size: finalSize,
      img: product.img,
      quantity: 1
    });
    router.push('/cart');
  };

  return (
    <div className="flex flex-col gap-8 w-full mt-8">
      {/* Dynamic Price Display */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
        <span className="text-4xl font-black">${currentPrice}</span>
        {isOversized && <span className="text-sm font-bold text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full">+ $10 Oversize Fee</span>}
      </div>

      {/* Size Selector */}
      {!isOneSize && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <span className="font-bold uppercase tracking-widest text-sm text-zinc-500">Select Size</span>
            <span className="text-xs font-semibold text-zinc-400 underline cursor-pointer hover:text-black">Size Guide</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 rounded-xl font-bold transition-all ${
                  selectedSize === size
                    ? "bg-black text-white shadow-md transform scale-105"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-black hover:text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add To Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center gap-3 mt-4 shadow-xl shadow-black/10 hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.5)] hover:text-red-50 hover:translate-y-[-2px]"
      >
        <ShoppingBag className="w-6 h-6" /> Add To Bag
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 mt-6 pt-6 border-t border-zinc-200">
        <span className="flex items-center gap-1">✓ Made to Order</span>
        <span className="flex items-center gap-1">✓ Ships in 3-5 Days</span>
        <span className="flex items-center gap-1">✓ Live Streamed</span>
      </div>
    </div>
  );
}
