"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";

export default function CartCheckout() {
  const [orderMode, setOrderMode] = useState("Pickup");

  const { items: cartItems, addItem, removeItem, clearCart, totalPrice } = useCartStore();

  const handleUpdateQty = (item: CartItem, delta: number) => {
    if (delta > 0) {
      addItem({ id: item.id, name: item.name, price: item.price, img: item.img });
    } else {
      removeItem(item.id);
      // Re-add to adjust quantity down by 1. Realistically, we'd add updateQuantity to store but for this mockup it's fine.
      if (item.quantity > 1) {
        for(let i=1; i < item.quantity; i++) {
          addItem({ id: item.id, name: item.name, price: item.price, img: item.img });
        }
      }
    }
  };

  const subtotal = totalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-background pb-32 max-w-md mx-auto relative px-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/menu" className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="font-headings text-2xl font-semibold text-primary">Checkout</h1>
      </div>

      {/* Order Mode Toggle */}
      <div className="bg-[#E5E0D8]/50 p-1.5 rounded-pill flex gap-1 mb-8 shadow-inner">
        {["Pickup", "Dine-in"].map((mode) => (
          <button
            key={mode}
            onClick={() => setOrderMode(mode)}
            className={`flex-1 py-3 px-4 rounded-pill text-sm font-semibold transition-all ${
              orderMode === mode
                ? "bg-surface text-primary shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {orderMode === "Dine-in" && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-text mb-2">Table Number</label>
          <input 
            type="number" 
            placeholder="e.g. 12" 
            className="w-full bg-surface border border-muted/20 rounded-2xl px-4 py-4 text-primary font-medium focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      )}

      {/* Cart Items */}
      <h2 className="font-headings text-xl font-semibold text-text mb-4">Your Order</h2>
      <div className="space-y-4 mb-8">
        {cartItems.length === 0 ? (
          <div className="text-center text-muted py-8 font-medium">Your cart is empty</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="bg-surface rounded-card p-4 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative bg-background border border-muted/10">
                <Image src={item.img || "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop"} alt={item.name} fill className="object-cover" unoptimized />
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-text mb-1 truncate">{item.name}</h3>
                <div className="font-semibold text-primary">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-3 bg-background rounded-pill border border-muted/20 px-2 py-1 shrink-0">
                <button 
                  onClick={() => handleUpdateQty(item, -1)}
                  className="w-6 h-6 flex items-center justify-center text-muted hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                </button>
                <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQty(item, 1)}
                  className="w-6 h-6 flex items-center justify-center text-muted hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bill Breakdown */}
      <h2 className="font-headings text-xl font-semibold text-text mb-4">Summary</h2>
      <div className="bg-surface rounded-card p-6 shadow-sm space-y-3 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-text">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Taxes & Fees</span>
          <span className="font-medium text-text">${tax.toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t border-muted/20 flex justify-between items-center">
          <span className="font-semibold text-text">Total</span>
          <span className="font-headings text-2xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-primary text-surface py-4 rounded-pill font-semibold text-lg hover:scale-[1.02] shadow-md transition-transform flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.7 3.59-.65 1.48.05 2.58.64 3.26 1.63-2.92 1.74-2.4 5.37.44 6.54-.57 1.66-1.52 3.19-2.37 4.65zm-4.32-15.02c.7-.82 1.12-1.92.93-3.01-1.01.05-2.27.68-3 1.52-.66.78-1.12 1.84-.96 2.92 1.05.12 2.29-.53 3.03-1.43z"/>
        </svg>
        Pay with Apple Pay
      </button>

    </main>
  );
}
