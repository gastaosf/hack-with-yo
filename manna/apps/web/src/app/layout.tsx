import React from "react";
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Manna — B2B Euro Savings",
  description: "Put your company's idle cash to work. Earn returns on your EUR treasury.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0d1321",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
