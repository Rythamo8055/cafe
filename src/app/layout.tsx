import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import ClickSpark from "@/components/ui/ClickSpark";
import CartFAB from "@/components/CartFAB";
import CookieBanner from "@/components/CookieBanner";
import OnboardingGate from "@/components/OnboardingGate";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classic Cafe App",
  description: "Premium coffee ordering experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${outfit.variable} antialiased`}>
        <ClickSpark
          sparkColor='#795325'
          sparkSize={12}
          sparkRadius={15}
          sparkCount={6}
          duration={500}
        >
          <OnboardingGate>
            <div className="pb-24">
              {children}
              <BottomNav />
              <CartFAB />
              <CookieBanner />
            </div>
          </OnboardingGate>
        </ClickSpark>
      </body>
    </html>
  );
}
