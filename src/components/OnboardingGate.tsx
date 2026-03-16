"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function OnboardingGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check sessionStorage — fresh tab/window always sees onboarding
    const hasSeenOnboarding = sessionStorage.getItem("cafe_session_onboarded");

    if (!hasSeenOnboarding && pathname !== "/onboarding") {
      router.replace("/onboarding");
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  // On onboarding page, always render it
  if (pathname === "/onboarding") return <>{children}</>;

  // Loading state while checking
  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
