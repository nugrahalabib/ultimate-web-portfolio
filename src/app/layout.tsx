import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import directus, { DIRECTUS_URL } from "@/lib/directus";
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
  const [seo, global] = await Promise.all([
    directus.request(readSingleton('seo')).catch(() => null),
    directus.request(readSingleton('global')).catch(() => null)
  ]);

  // Combine SEO and Global data for easier access
  const data = { ...seo, ...global };

  return {
    title: data?.home_title || "Nugraha Labib | CPO at Spead AI",
    description: data?.home_description || "Building Logic Beyond AI.",
    openGraph: {
      title: data?.home_title || "Nugraha Labib | CPO at Spead AI",
      description: data?.home_description || "Building Logic Beyond AI.",
      images: data?.home_og_image ? [`${DIRECTUS_URL}/assets/${data.home_og_image}`] : [],
      type: 'website',
    },
    keywords: data?.home_keywords?.map((k: any) => k.keyword) || [],
    icons: data?.website_logo ? {
      icon: `${DIRECTUS_URL}/assets/${data.website_logo}?width=192&height=192`,
      apple: `${DIRECTUS_URL}/assets/${data.website_logo}?width=180&height=180`,
      shortcut: `${DIRECTUS_URL}/assets/${data.website_logo}?width=64&height=64`
    } : undefined,
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
