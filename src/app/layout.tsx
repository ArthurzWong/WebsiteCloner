import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebsiteCloner — Clone any website into a Next.js codebase",
  description:
    "Open-source AI cloning pipeline: paste a URL, run one command, and get a clean Next.js 16 + Tailwind v4 rebuild — components, assets and pixel-aware QA included.",
  keywords: [
    "website cloner",
    "clone website",
    "nextjs",
    "tailwind css",
    "ai agent",
    "claude code",
  ],
  openGraph: {
    title: "WebsiteCloner — Clone any website into a Next.js codebase",
    description:
      "Paste a URL, run one command, get production-ready Next.js code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
