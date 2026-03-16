"use client";

import CurvedLoop from "@/components/ui/CurvedLoop";
import CircularGallery from "@/components/ui/CircularGallery";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const galleryItems = [
    { image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", text: "Coffee" },
    { image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop", text: "Espresso" },
    { image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400&h=400&fit=crop", text: "Pastries" },
    { image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop", text: "Latte" },
    { image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop", text: "Cold Brew" },
  ];

  const handleGetStarted = () => {
    // Mark this session as onboarded
    sessionStorage.setItem("cafe_session_onboarded", "true");
    router.replace("/");
  };

  return (
    <main className="min-h-[100dvh] bg-primary relative overflow-hidden flex flex-col items-center justify-between pb-safe w-full max-w-md mx-auto">
      {/* Curved Loop Background Text */}
      <div className="absolute inset-x-0 w-full top-1/2 -translate-y-[60%] opacity-10 pointer-events-none scale-150">
        <CurvedLoop
          marqueeText="CLASSIC CAFE ✦ QUALITY BREWS ✦"
          speed={1.5}
          curveAmount={300}
          className="text-surface fill-current text-white font-headings"
        />
      </div>

      <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center pt-12 gap-2">
        <div className="w-full h-[280px] sm:h-[320px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
           <CircularGallery 
             items={galleryItems}
             bend={1}
             textColor="#FFFFFF"
             borderRadius={0.05}
             scrollSpeed={2}
             scrollEase={0.05}
           />
        </div>
        
        <div className="mt-2 px-6 text-center">
          <h1 className="font-headings text-[36px] sm:text-[44px] font-bold text-surface leading-tight mb-3">
            Coffee<br />Made Easy
          </h1>
          <p className="text-surface/80 text-base sm:text-lg max-w-xs mx-auto font-medium leading-relaxed">
            Order your favorite coffee in seconds for maximum efficiency and taste.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full px-6 mt-8 pb-8">
        <button 
          onClick={handleGetStarted}
          className="w-full bg-[#E5E0D8] text-primary py-4 sm:py-[18px] rounded-pill font-bold tracking-wide text-base sm:text-lg hover:bg-surface transition-all shadow-xl active:scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
