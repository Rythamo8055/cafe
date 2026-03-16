"use client";

import Image from "next/image";
import Lanyard from "@/components/ui/Lanyard";

export default function Rewards() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-8 px-6 pb-32 max-w-md mx-auto">
       <h1 className="font-headings text-[28px] font-semibold text-primary mb-2">Loyalty & Rewards</h1>
       
       {/* Lanyard Membership Card */}
       <div className="h-[280px] w-full mb-4 relative z-0">
         <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
       </div>
       
       {/* Stars Display */}
       <div className="bg-surface rounded-card p-8 shadow-sm text-center relative overflow-hidden flex flex-col items-center mb-6">
         <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-accent/10 to-transparent"></div>
         <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4 relative z-10">
           <svg className="w-8 h-8 font-bold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
         </div>
         <h2 className="font-headings text-[56px] text-primary font-bold leading-none mb-1 tracking-tight relative z-10">42</h2>
         <p className="font-medium text-muted uppercase tracking-[0.2em] text-[10px] relative z-10">Total Stars</p>
         
         <div className="w-full h-3 bg-muted/20 rounded-pill overflow-hidden mt-8 border border-muted/10 shadow-inner">
            <div className="h-full bg-accent rounded-pill w-[84%] relative shadow-md"></div>
         </div>
         <p className="text-sm font-medium text-primary mt-4 opacity-80">8 stars until your next free coffee</p>
       </div>

       {/* QR Code Section */}
       <div className="bg-primary text-surface rounded-card p-6 shadow-md mb-8 flex items-center justify-between gap-4">
         <div>
           <h3 className="font-headings text-xl font-semibold mb-1">Scan at Register</h3>
           <p className="text-surface/80 text-sm leading-relaxed">Earn stars instantly on all your in-store cafe purchases.</p>
         </div>
         <div className="w-[84px] h-[84px] bg-white rounded-xl p-1 shrink-0 flex items-center justify-center relative shadow-inner">
            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=classic-cafe-user-1234" alt="QR Code" fill className="object-cover rounded-lg p-2" unoptimized />
         </div>
       </div>

       {/* Available Rewards */}
       <h2 className="font-headings text-xl font-semibold text-primary mb-4">Redeem Stars</h2>
       <div className="grid grid-cols-2 gap-4">
         <div className="bg-surface border-[3px] border-accent/20 rounded-card p-5 shadow-sm flex flex-col relative overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent/5 rounded-full blur-xl"></div>
            <div className="flex items-center gap-1.5 font-bold text-accent mb-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              50
            </div>
            <h3 className="font-headings font-semibold text-primary text-base mb-1.5">Free Coffee</h3>
            <p className="text-[13px] text-muted leading-relaxed">Any hot or iced drip, any size.</p>
         </div>
         
         <div className="bg-surface opacity-60 border border-muted/20 rounded-card p-5 shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-1.5 font-bold text-muted mb-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              100
            </div>
            <h3 className="font-headings font-semibold text-primary text-base mb-1.5">Handcrafted</h3>
            <p className="text-[13px] text-muted leading-relaxed">Latte, mocha, or cold brew.</p>
         </div>
       </div>
    </main>
  );
}
