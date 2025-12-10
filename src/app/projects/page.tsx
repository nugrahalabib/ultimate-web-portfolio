import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import ProjectGallery from '@/components/ProjectGallery';
import directus, { DIRECTUS_URL } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await directus.request(readSingleton('seo')).catch(() => null);
    return {
        title: seoData?.projects_title || 'Projects - Nugraha Labib',
        description: seoData?.projects_description || 'Selected works in Architecture, Business, and Technology.',
        keywords: seoData?.projects_keywords?.map((k: any) => k.keyword) || [],
        openGraph: {
            title: seoData?.projects_title || 'Projects - Nugraha Labib',
            description: seoData?.projects_description || 'Selected works in Architecture, Business, and Technology.',
            images: seoData?.projects_og_image ? [`${DIRECTUS_URL}/assets/${seoData.projects_og_image}`] : [],
            type: 'website',
        },
    };
}

export default async function Projects() {
    const [projects, categories, globalData, footerSettings, footerSocials] = await Promise.all([
        directus.request(readItems('projects', {
            sort: ['sort'],
            limit: -1,
            fields: ['*', { category_id: ['*'] }] as any
        })).catch(() => []),
        directus.request(readItems('project_categories', {
            sort: ['sort']
        })).catch(() => []),
        directus.request(readSingleton('global')).catch(() => null),
        directus.request(readSingleton('footer_settings')).catch(() => ({})),
        directus.request(readItems('footer_socials', { sort: ['sort'] })).catch(() => [])
    ]);

    return (
        <main className="relative w-full min-h-screen bg-[#050505] selection:bg-white/20">

            {/* Background Layer */}
            <ThreeBackground />

            <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
                <div className="pointer-events-auto">
                    <Navbar />
                </div>

                <div className="flex-grow pt-32 pb-20 px-6 md:px-20 pointer-events-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-16 text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-[family-name:var(--font-outfit)] tracking-tight">
                                Selected Works.
                            </h1>
                            <p className="text-neutral-400 text-lg md:text-xl font-light">
                                A collection of systems, spaces, and stories.
                            </p>
                        </div>

                        {/* Gallery */}
                        <ProjectGallery initialItems={projects} categories={categories} />
                    </div>
                </div>

                <div className="pointer-events-auto">
                    <Footer settings={footerSettings} socialLinks={footerSocials} />
                </div>
            </div>
        </main>
    );
}
