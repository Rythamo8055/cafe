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
    // Show banner after a short delay if cookies haven't been responded to
    if (cookiesAccepted === null) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [cookiesAccepted]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-[100] animate-slide-up"
    >
      <div className="bg-primary text-surface rounded-card p-5 shadow-2xl border border-white/10">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-headings font-semibold text-base mb-1">We value your privacy</h3>
            <p className="text-surface/70 text-sm leading-relaxed">
              We use local storage to remember your preferences and improve your experience. No data leaves your device.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-accent text-white py-2.5 rounded-pill font-semibold text-sm hover:brightness-110 transition-all active:scale-95"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="flex-1 bg-white/10 text-surface py-2.5 rounded-pill font-semibold text-sm hover:bg-white/20 transition-all active:scale-95 border border-white/10"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
