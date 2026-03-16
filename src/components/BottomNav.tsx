"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const tabs = [
  {
    label: "Home",
    href: "/",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        {active ? (
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
        )}
      </svg>
    ),
  },
  {
    label: "Menu",
    href: "/menu",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        {active ? (
          <path d="M4 6h16M4 12h16M4 18h7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        )}
      </svg>
    ),
  },
  {
    label: "Rewards",
    href: "/rewards",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        {active ? (
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        )}
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (pathname === "/onboarding") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div 
          className="mx-4 mb-4 bg-primary rounded-[28px] shadow-2xl flex items-center justify-around py-1 px-2"
          style={{ paddingBottom: `calc(0.25rem + env(safe-area-inset-bottom, 0px))` }}
        >
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-2.5 px-5 rounded-[20px] transition-all duration-300 relative ${
                  isActive
                    ? "text-accent bg-surface/10"
                    : "text-surface/60 active:scale-95"
                }`}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
                )}
                {tab.icon(isActive)}
                <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-surface/50"
                }`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
