import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BentoGridFull from '@/components/BentoGridFull';
import JourneyTimeline from '@/components/JourneyTimeline';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import directus, { DIRECTUS_URL } from '@/lib/directus';
import { readSingleton, readItems } from '@directus/sdk';
import { Metadata } from 'next';

// ...

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await directus.request(readSingleton('seo')).catch(() => null);

  return {
    title: seoData?.home_title || 'Nugraha Labib - Portfolio',
    description: seoData?.home_description || 'Personal portfolio of Nugraha Labib.',
    openGraph: {
      title: seoData?.home_title || 'Nugraha Labib - Portfolio',
      description: seoData?.home_description || 'Personal portfolio of Nugraha Labib.',
      images: seoData?.home_og_image ? [`${DIRECTUS_URL}/assets/${seoData.home_og_image}`] : [],
      type: 'website',
    },
    keywords: seoData?.home_keywords?.map((k: any) => k.keyword) || [],
  };
}

import BlogHighlights from '@/components/BlogHighlights';

export default async function Home() {
  // ... (data fetching logic)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoData?.home_title || 'Nugraha Labib',
    description: seoData?.home_description,
    url: 'https://nugrahalabib.com',
    author: {
      '@type': 'Person',
      name: 'Nugraha Labib',
      image: globalData?.website_logo ? `${DIRECTUS_URL}/assets/${globalData.website_logo}` : undefined,
    },
  };

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-[#050505] selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Layer (Subtle) */}
      <ThreeBackground />

      {/* Foreground Layer */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        <Hero
          headline={globalData?.hero_headline}
          subheadline={globalData?.hero_subheadline}
          socialLinks={footerSocials}
        />
        <div id="what-i-do" className="pointer-events-auto">
          {showcaseItems && showcaseItems.length > 0 && (
            <BentoGridFull
              items={showcaseItems}
              headline={globalData?.showcase_headline}
              subheadline={globalData?.showcase_subheadline}
            />
          )}
        </div>
        <div className="pointer-events-auto">
          {timelineEntries && timelineEntries.length > 0 && (
            <JourneyTimeline
              items={timelineEntries}
              headline={globalData?.journey_headline}
              subheadline={globalData?.journey_subheadline}
            />
          )}
        </div>
        <div className="pointer-events-auto">
          {testimonials && testimonials.length > 0 && (
            <Testimonials
              items={testimonials}
              headline={globalData?.testimonials_headline}
              subheadline={globalData?.testimonials_subheadline}
            />
          )}
        </div>

        {/* Blog Highlights Section */}
        <div className="pointer-events-auto">
          {blogHighlights && (
            <BlogHighlights
              headline={blogHighlights.headline}
              posts={blogHighlights.selected_posts}
            />
          )}
        </div>

        <div className="pointer-events-auto">
          <Footer settings={footerSettings} socialLinks={footerSocials} />
        </div>
      </div>
    </main>
  );
}