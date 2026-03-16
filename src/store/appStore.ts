import { create } from "zustand";

interface AppState {
  hasOnboarded: boolean;
  cookiesAccepted: boolean | null; // null = not yet responded
  setOnboarded: () => void;
  acceptCookies: () => void;
  declineCookies: () => void;
  hydrate: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasOnboarded: false,
  cookiesAccepted: null,
  setOnboarded: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cafe_onboarded", "true");
    }
    set({ hasOnboarded: true });
  },
  acceptCookies: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cafe_cookies", "accepted");
    }
    set({ cookiesAccepted: true });
  },
  declineCookies: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cafe_cookies", "declined");
    }
    set({ cookiesAccepted: false });
  },
  hydrate: () => {
    if (typeof window === "undefined") return;
    const onboarded = localStorage.getItem("cafe_onboarded") === "true";
    const cookies = localStorage.getItem("cafe_cookies");
    set({
      hasOnboarded: onboarded,
      cookiesAccepted: cookies === "accepted" ? true : cookies === "declined" ? false : null,
    });
  },
}));
