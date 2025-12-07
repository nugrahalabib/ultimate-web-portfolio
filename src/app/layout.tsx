import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await directus.request(readSingleton('seo')).catch(() => null);

  return {
    title: seo?.home_title || "Nugraha Labib | CPO at Spead AI",
    description: seo?.home_description || "Building Logic Beyond AI.",
    openGraph: {
      title: seo?.home_title || "Nugraha Labib | CPO at Spead AI",
      description: seo?.home_description || "Building Logic Beyond AI.",
      images: seo?.home_og_image ? [`http://localhost:8055/assets/${seo.home_og_image}`] : [],
      type: 'website',
    },
    keywords: seo?.home_keywords || [],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
