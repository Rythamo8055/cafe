"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/appStore";

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasOnboarded, hydrate } = useAppStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    // If not onboarded and not already on onboarding, redirect
    if (!hasOnboarded && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [hydrated, hasOnboarded, pathname, router]);

  // While hydrating, show nothing to avoid flash
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // If not onboarded and not on onboarding page, show nothing (redirect is happening)
  if (!hasOnboarded && pathname !== "/onboarding") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
