"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartFAB() {
  const pathname = usePathname();
  const { totalItems, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show on checkout cart page or onboarding
  if (pathname === "/cart" || pathname === "/onboarding") {
    return null;
  }

  if (!mounted || totalItems() === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
      <Link href="/cart">
        <button className="bg-accent text-surface px-6 py-3 rounded-pill font-medium shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform">
          <div className="bg-surface/20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
            {totalItems()}
          </div>
          <span>View Cart</span>
          <span>${totalPrice().toFixed(2)}</span>
        </button>
      </Link>
    </div>
  );
}
