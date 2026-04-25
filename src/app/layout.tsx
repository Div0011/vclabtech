import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { GlobalProviders } from "@/components/GlobalProviders";
import { CinematicPreloaderOverlay } from "@/components/CinematicPreloaderOverlay";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VC LAB TECH | ENGINEERING DIGITAL DOMINANCE",
  description: "Architecting high-performance web experiences that convert attention into authority. Custom WebGL, fluid typography, and elite-grade digital assets.",
  openGraph: {
    title: "VC LAB TECH | DIGITAL DOMINANCE",
    description: "Engineering digital assets for the elite.",
    images: ["/og-preview.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VC LAB TECH | DIGITAL DOMINANCE",
    description: "Architecting high-performance web experiences.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${manrope.variable} ${playfairDisplay.variable} font-sans antialiased bg-[#FAFAFA] text-navy overflow-x-hidden`}>
        {/* Global Pixelate Filter Definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="pixelate" x="0" y="0">
            <feFlood x="4" y="4" height="2" width="2"/>
            <feComposite width="12" height="12"/>
            <feTile result="a"/>
            <feComposite in="SourceGraphic" in2="a" operator="in"/>
          </filter>
        </svg>
        <GlobalProviders>
          <CinematicPreloaderOverlay />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
