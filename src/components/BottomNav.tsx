"use client";

import { usePathname } from "next/navigation";
import PillNav from "./ui/PillNav";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === '/onboarding') {
    return null;
  }

  return (
    <PillNav
      logo="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=100&h=100&fit=crop"
      logoAlt="Cafe Logo"
      items={[
        { label: 'Home', href: '/' },
        { label: 'Menu', href: '/menu' },
        { label: 'Rewards', href: '/rewards' }
      ]}
      activeHref={pathname}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#3C2415"
      pillColor="#F9F6F0"
      hoveredPillTextColor="#3C2415"
      pillTextColor="#3C2415"
      initialLoadAnimation={false}
    />
  );
}
