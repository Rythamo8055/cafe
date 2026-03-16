"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/appStore";

export default function CookieBanner() {
  const { cookiesAccepted, acceptCookies, declineCookies, hydrate } = useAppStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (cookiesAccepted === null) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [cookiesAccepted]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-sm z-[100] animate-slide-up">
      <div className="bg-primary text-surface rounded-2xl p-4 shadow-2xl border border-white/10">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-surface/80 text-xs leading-snug">
            We use local storage to save your preferences. No data leaves your device.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-accent text-white py-2 rounded-xl font-semibold text-xs active:scale-95 transition-transform"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="flex-1 bg-white/10 text-surface py-2 rounded-xl font-semibold text-xs active:scale-95 transition-transform border border-white/10"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
