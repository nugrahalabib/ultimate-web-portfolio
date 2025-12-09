import { readItems, readSingleton } from '@directus/sdk';
import directus from '@/lib/directus';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import BlogList from '@/components/BlogList';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await directus.request(readSingleton('seo')).catch(() => null);
    return {
        title: seoData?.blog_title || 'Blog - Nugraha Labib',
        description: seoData?.blog_description || 'Thoughts, insights, and articles about Architecture, Business, and Technology.',
        keywords: seoData?.blog_keywords?.map((k: any) => k.keyword) || [],
        openGraph: {
            title: seoData?.blog_title || 'Blog - Nugraha Labib',
            description: seoData?.blog_description || 'Thoughts, insights, and articles about Architecture, Business, and Technology.',
            images: seoData?.blog_og_image ? [`http://localhost:8055/assets/${seoData.blog_og_image}`] : [],
            type: 'website',
        },
    };
}

async function getPosts() {
    try {
        const posts = await directus.request(
            readItems('posts', {
                // filter: { status: { _eq: 'published' } }, // Removed filter to show all posts
                sort: ['-published_date'],
                fields: [
                    'id',
                    'title',
                    'slug',
                    'published_date',
                    'image',
                    'seo_description',
                    'seo_title',
                    'category', // Keep legacy for fallback
                    { category_id: ['name', 'slug', 'color'] }, // Expand new relation
                    'tags'
                ],
            })
        );
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function BlogPage() {
    const [posts, categories, globalData, footerSettings, footerSocials] = await Promise.all([
        getPosts(),
        directus.request(readItems('blog_categories', { sort: ['sort'] })).catch(() => []),
        directus.request(readSingleton('global')).catch(() => null),
        directus.request(readSingleton('footer_settings')).catch(() => ({})),
        directus.request(readItems('footer_socials', { sort: ['sort'] })).catch(() => [])
    ]);

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-indigo-500/30 font-[family-name:var(--font-outfit)]">

            {/* Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ThreeBackground />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-20 px-6 md:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-16 text-center pointer-events-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Thoughts & Insights.
                            </h1>
                            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                                Exploring the intersection of Architecture, Business, and Technology.
                            </p>
                        </div>

                        {/* Interactive Blog List */}
                        <BlogList initialPosts={posts} categories={categories} />
                    </div>
                </main>

                <Footer settings={footerSettings} socialLinks={footerSocials} />
            </div>
        </div>
    );
}
