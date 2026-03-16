"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import BounceCards from "@/components/ui/BounceCards";

// Dynamically import Grainient (WebGL) to avoid SSR issues
const Grainient = dynamic(() => import("@/components/ui/Grainient"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen p-6 max-w-md mx-auto relative pb-32">
      {/* Loyalty Card with Grainient Background */}
      <section className="text-surface rounded-card p-6 shadow-md mb-8 relative overflow-hidden">
        {/* Animated Grainient Background */}
        <div className="absolute inset-0 z-0">
          <Grainient
            color1="#C86A42"
            color2="#3C2415"
            color3="#795325"
            timeSpeed={0.15}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={4}
            warpSpeed={1.5}
            warpAmplitude={60}
            blendAngle={0}
            blendSoftness={0.1}
            rotationAmount={400}
            noiseScale={2}
            grainAmount={0.08}
            grainScale={2}
            grainAnimated={false}
            contrast={1.3}
            gamma={1}
            saturation={1.1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>

        {/* Content on top of Grainient */}
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90 mb-1">Welcome back,</p>
          <h1 className="font-headings text-[32px] font-semibold leading-tight mb-6">
            Ready for your<br />morning brew?
          </h1>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-medium">
              <StarIcon className="w-5 h-5 text-accent" />
              <span>42 Stars</span>
            </div>
            <span className="text-sm opacity-80">50 to next reward</span>
          </div>
          
          {/* Pill Progress Bar */}
          <div className="w-full h-2.5 bg-white/20 rounded-pill overflow-hidden">
            <div className="h-full bg-accent rounded-pill w-[84%]"></div>
          </div>
        </div>
      </section>

      {/* Most Recommended */}
      <section className="mb-10 overflow-hidden relative">
        <div className="flex justify-between items-end mb-4 px-6">
          <h2 className="font-headings text-2xl font-semibold text-primary">Most Recommended</h2>
        </div>
        
        <div className="flex justify-center flex-col items-center">
          <BounceCards
            className="scale-[0.85] sm:scale-100 origin-top"
            images={[
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop"
            ]}
            containerWidth={340}
            containerHeight={220}
            animationDelay={0.5}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.8)"
            transformStyles={[
              "rotate(12deg) translate(-130px)",
              "rotate(5deg) translate(-65px)",
              "rotate(-2deg)",
              "rotate(-8deg) translate(65px)",
              "rotate(4deg) translate(130px)"
            ]}
            enableHover={true}
          />
          <p className="text-center text-sm text-muted -mt-4 mb-4 z-10 font-medium tracking-wide">Tap to spread cards</p>
        </div>
      </section>

      {/* Seasonal Specials */}
      <section>
        <h2 className="font-headings text-2xl font-semibold text-primary mb-4">Seasonal Specials</h2>
        
        <div className="flex flex-col gap-4">
          {[
            { id: "s1", name: "Spiced Pumpkin Draft", desc: "Cold brew topped with creamy spiced cold foam.", price: "$5.75", badge: "NEW", img: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=500&h=300&fit=crop" },
            { id: "s2", name: "Maple Pecan Croissant", desc: "Flaky butter pastry baked with maple glaze.", price: "$4.50", badge: "POPULAR", img: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=500&h=300&fit=crop" },
            { id: "s3", name: "Caramel Macchiato", desc: "Vanilla-infused milk with espresso and caramel drizzle.", price: "$5.95", badge: "SEASONAL", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&h=300&fit=crop" },
          ].map((item) => (
            <Link href={`/menu`} key={item.id} className="block group">
              <div className="bg-surface rounded-card p-4 shadow-sm flex gap-4 items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0">
                  <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-primary text-lg">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted mb-2 line-clamp-2 leading-snug">{item.desc}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-semibold text-primary">{item.price}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-pill">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
