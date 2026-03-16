"use client";

import ProfileCard from "@/components/ui/ProfileCard";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ItemCustomization() {
  const [size, setSize] = useState("Regular");
  const [milk, setMilk] = useState("Oat Milk");
  const [temp, setTemp] = useState("Hot");
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  
  const basePrice = 5.50;
  // Simple mockup pricing logic
  const totalPrice = (basePrice + (size === "Large" ? 1 : 0) + (milk === "Oat Milk" ? 0.75 : 0)) * qty;

  const handleAddToCart = () => {
    addItem({
      id: "c1", // Placeholder ID
      name: `Oat Milk Latte - ${size} - ${temp}`,
      price: totalPrice / qty,
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop"
    });
    // Add multiple if quantity > 1
    for (let i = 1; i < qty; i++) {
        addItem({
          id: "c1",
          name: `Oat Milk Latte - ${size} - ${temp}`,
          price: totalPrice / qty,
          img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop"
        });
    }
    router.push("/menu");
  };

  return (
    <main className="min-h-screen bg-background pb-32 max-w-md mx-auto relative flex flex-col">
      {/* Interactive ProfileCard Header */}
      <div className="w-full h-[320px] relative shrink-0 bg-[#E5E0D8]/40 pt-4 flex justify-center">
        <ProfileCard
          avatarUrl="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowColor="rgba(200, 106, 66, 0.4)" // Accent color match
          behindGlowEnabled={true}
          className="scale-90 opacity-90"
        />
        
        {/* Top Back Button overlaid on image */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/menu" className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content Card overlapping the image */}
      <div className="-mt-6 bg-background rounded-t-[32px] pt-8 px-6 relative flex-grow z-10">
        <h1 className="font-headings text-[28px] font-semibold text-primary mb-2">Oat Milk Latte</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          A perfectly balanced blend of our signature espresso and creamy oat milk, crafted for a smooth and rich flavor.
        </p>

        {/* Configuration Sections */}
        <div className="space-y-8">
          
          {/* Size Section */}
          <section>
            <h2 className="font-headings text-lg font-semibold text-text mb-3">Size</h2>
            <div className="flex flex-wrap gap-3">
              {["Regular", "Large (+$1.00)"].map((opt) => {
                const isSelected = size === opt.split(" ")[0];
                return (
                  <button
                    key={opt}
                    onClick={() => setSize(opt.split(" ")[0])}
                    className={`px-5 py-2.5 rounded-pill text-sm font-medium transition-colors border ${
                      isSelected 
                        ? "bg-primary text-surface border-primary shadow-sm" 
                        : "bg-surface text-muted border-muted/30 hover:border-muted"
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Temperature Section */}
          <section>
            <h2 className="font-headings text-lg font-semibold text-text mb-3">Temperature</h2>
            <div className="flex flex-wrap gap-3">
              {["Hot", "Extra Hot", "Iced"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTemp(opt)}
                  className={`px-5 py-2.5 rounded-pill text-sm font-medium transition-colors border ${
                    temp === opt 
                      ? "bg-primary text-surface border-primary shadow-sm" 
                      : "bg-surface text-muted border-muted/30 hover:border-muted"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>

          {/* Milk Section */}
          <section>
            <h2 className="font-headings text-lg font-semibold text-text mb-3">Milk</h2>
            <div className="flex flex-wrap gap-3">
              {["Whole Milk", "Oat Milk (+$0.75)", "Almond Milk (+$0.75)", "Soy Milk"].map((opt) => {
                const baseName = opt.split(" (")[0];
                return (
                  <button
                    key={opt}
                    onClick={() => setMilk(baseName)}
                    className={`px-5 py-2.5 rounded-pill text-sm font-medium transition-colors border ${
                      milk === baseName 
                        ? "bg-primary text-surface border-primary shadow-sm" 
                        : "bg-surface text-muted border-muted/30 hover:border-muted"
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </section>
          
        </div>
      </div>

      {/* Sticky Checkout Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-surface border-t border-muted/10 p-6 z-50 flex items-center gap-4 pb-8">
        {/* Quantity Selector */}
        <div className="flex items-center bg-background rounded-pill border border-muted/20 h-14 px-1 shrink-0">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <span className="w-8 text-center font-semibold text-primary">{qty}</span>
          <button 
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="flex-grow bg-primary text-surface rounded-pill h-14 font-medium tracking-wide shadow-md flex items-center justify-between px-6 hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <span>Add to Cart</span>
          <span>${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </main>
  );
}
