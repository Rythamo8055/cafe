"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function MenuCatalog() {
  const categories = ["Coffee", "Tea", "Pastries", "Sandwiches"];
  
  const menuItems = [
    { id: "c1", name: "Oat Milk Latte", category: "Coffee", price: "$5.50", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop" },
    { id: "c2", name: "Cold Brew", category: "Coffee", price: "$4.75", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop" },
    { id: "c3", name: "Cappuccino", category: "Coffee", price: "$4.95", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
    { id: "c4", name: "Flat White", category: "Coffee", price: "$5.25", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop" },
    { id: "t1", name: "Iced Matcha Latte", category: "Tea", price: "$6.00", img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&h=400&fit=crop" },
    { id: "t2", name: "Earl Grey", category: "Tea", price: "$3.50", img: "https://images.unsplash.com/photo-1594835496417-69ee6206037f?w=400&h=400&fit=crop" },
    { id: "p1", name: "Butter Croissant", category: "Pastries", price: "$4.00", img: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400&h=400&fit=crop" },
    { id: "p2", name: "Blueberry Muffin", category: "Pastries", price: "$3.75", img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
    { id: "s1", name: "Turkey Club", category: "Sandwiches", price: "$8.50", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop" },
    { id: "s2", name: "Avocado Toast", category: "Sandwiches", price: "$7.25", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop" },
  ];

  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      img: item.img
    });
  };

  return (
    <main className="min-h-screen max-w-md mx-auto relative bg-background pb-32">
      {/* Sticky Header & Categories */}
      <div className="bg-background pt-6 pb-4 border-b border-muted/20">
        <h1 className="font-headings text-[28px] font-semibold text-primary px-6 mb-4 leading-none">Menu</h1>
        
        {/* Search Bar */}
        <div className="px-6 mb-5 relative">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-50">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search for coffee, pastries..." 
            className="w-full bg-surface border border-muted/20 rounded-pill py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-accent shadow-sm"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto px-6 pb-2 hide-scrollbar">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-pill whitespace-nowrap text-sm font-medium transition-colors ${
                idx === 0 
                  ? "bg-primary text-surface" 
                  : "bg-surface text-muted border border-muted/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link href={`/item/${item.id}`} key={item.id} className="group flex flex-col h-full bg-surface rounded-[20px] p-3 shadow-sm border border-muted/10 hover:shadow-md transition-all">
            <div className="w-full aspect-square rounded-[16px] overflow-hidden bg-background mb-3 relative shrink-0">
              <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[600ms]" unoptimized />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-semibold text-primary text-[15px] leading-tight mb-1">{item.name}</h3>
                <p className="text-[11px] font-medium text-muted mb-2 uppercase tracking-wide">{item.category}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-primary">{item.price}</span>
                <button 
                  className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-surface transition-colors shrink-0 shadow-sm"
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
