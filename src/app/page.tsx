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
import BlogHighlights from '@/components/BlogHighlights';

// Disable caching for real-time updates during development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export default async function Home() {
  // Fetch all data in parallel
  const [globalData, seoData, showcaseItems, timelineEntries, testimonials, footerSettings, footerSocials, blogHighlights] = await Promise.all([
    directus.request(readSingleton('global')).catch(() => null),
    directus.request(readSingleton('seo')).catch(() => null),
    directus.request(readItems('showcase_items', {
      sort: ['sort'],
      fields: ['*', { related_post: ['slug'], related_project: ['slug'] }]
    })).catch(() => []),
    directus.request(readItems('timeline_entries', {
      sort: ['sort'],
      fields: ['*', { related_post: ['slug'], related_project: ['slug'] }]
    })).catch(() => []),
    directus.request(readItems('testimonials')).catch(() => []),
    directus.request(readSingleton('footer_settings')).catch(() => ({})),
    directus.request(readItems('footer_socials', { sort: ['sort'] })).catch(() => []),
    // Fetch Blog Highlights with Deep Expansion
    directus.request(readSingleton('blog_highlights', {
      fields: ['headline', {
        selected_posts: [
          'id',
          {
            posts_id: ['id', 'title', 'slug', 'published_date', 'image', 'category', 'seo_description']
          }
        ]
      }] as any
    })).catch(() => null)
  ]);

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