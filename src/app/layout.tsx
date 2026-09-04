import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Sora, IBM_Plex_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";
import { SmoothScroll } from "@/components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Káro Coffee Bar — Sector F, DHA Phase 1, Rawalpindi",
  description:
    "Minimal space. Maximum flavour. Specialty arabica coffee and ceremonial matcha in Sector F, DHA Phase 1, Rawalpindi. Open daily until 1am.",
  openGraph: {
    title: "Káro Coffee Bar",
    description:
      "Specialty arabica coffee and ceremonial matcha in Sector F, DHA Phase 1, Rawalpindi.",
    images: ["/images/gallery-storefront.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#15110c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${sora.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <PageLoader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
