import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Manit Sarkar — Multidisciplinary Engineer (AI/ML · Astrophysics · Mechanical)",
  description:
    "Portfolio of Manit Sarkar: a multidisciplinary engineer working at the intersection of AI/ML, astrophysics & astrodynamics, and mechanical engineering.",
  metadataBase: new URL("https://manitsarkar.dev"),
  openGraph: {
    title: "Manit Sarkar — Multidisciplinary Engineer",
    description:
      "AI/ML · Astrophysics · Mechanical Engineering. Research, projects, and a rare cross-disciplinary approach.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#05070f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-950 text-slate-200 antialiased overflow-x-hidden">
        {/* Fixed, soothing background: starfield + discipline-tinted orbs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 starfield opacity-[0.35]" />
          <div className="absolute left-[-20rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-ai/20 blur-[120px] lg:left-[-40rem]" />
          <div className="absolute right-[-20rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-astro/20 blur-[120px] lg:right-[-40rem]" />
          <div className="absolute bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-mech/10 blur-[120px]" />
          <div
            className="absolute inset-0 bg-grid-faint opacity-[0.15]"
            style={{ backgroundSize: "64px 64px" }}
          />
        </div>

        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
