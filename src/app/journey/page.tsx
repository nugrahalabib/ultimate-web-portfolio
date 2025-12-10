import { Metadata } from 'next';
import JourneyPageClient from '@/components/JourneyPageClient';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import directus, { DIRECTUS_URL } from '@/lib/directus';
import { readSingleton, readItems } from '@directus/sdk';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await directus.request(readSingleton('seo')).catch(() => null);
    return {
        title: seoData?.journey_title || 'Journey - Nugraha Labib',
        description: seoData?.journey_description || 'My professional journey, experience, and education.',
        keywords: seoData?.journey_keywords?.map((k: any) => k.keyword) || [],
        openGraph: {
            title: seoData?.journey_title || 'Journey - Nugraha Labib',
            description: seoData?.journey_description || 'My professional journey, experience, and education.',
            images: seoData?.journey_og_image ? [`${DIRECTUS_URL}/assets/${seoData.journey_og_image}`] : [],
            type: 'website',
        },
    };
}

export default async function Journey() {
    // Fetch data from Directus
    const [journeyItems, globalData, footerSettings, footerSocials] = await Promise.all([
        directus.request(readItems('timeline_entries', {
            sort: ['sort'], // Sort by sort field
            fields: ['*', 'related_post.slug', 'related_project.slug'] as any // Fetch relations
        })).catch(() => []),
        directus.request(readSingleton('global')).catch(() => null),
        directus.request(readSingleton('footer_settings')).catch(() => ({})),
        directus.request(readItems('footer_socials', { sort: ['sort'] })).catch(() => [])
    ]);

    // Map Directus items to the format expected by Client Component
    const allItems = journeyItems.map((item: any) => ({
        ...item,
    }));

    // JSON-LD for ProfilePage
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Nugraha Labib',
            jobTitle: 'Strategic Initiative Analyst',
            worksFor: {
                '@type': 'Organization',
                name: 'Caliana Indonesia'
            },
            sameAs: footerSocials.map((s: any) => s.url)
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <JsonLd data={jsonLd} />
            <div className="pointer-events-auto relative z-50">
                <Navbar />
            </div>
            <JourneyPageClient items={allItems} footerSettings={footerSettings} footerSocials={footerSocials} />
        </main>
    );
}
