import { readItems, readSingleton } from '@directus/sdk';
import directus, { DIRECTUS_URL } from '@/lib/directus';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.content.substring(0, 160),
        keywords: post.tags || [], // Use tags as keywords
        openGraph: {
            title: post.seo_title || post.title,
            description: post.seo_description || post.content.substring(0, 160),
            images: post.image ? [`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${post.image}`] : [],
            type: 'article',
            publishedTime: post.published_date,
        },
    };
}

async function getPost(slug: string) {
    try {
        const posts = await directus.request(
            readItems('posts', {
                filter: {
                    slug: { _eq: slug },
                },
                limit: 1,
                fields: [
                    'id',
                    'title',
                    'content',
                    'published_date',
                    'image',
                    'seo_title',
                    'seo_description',
                    { category_id: ['name', 'slug', 'color'] },
                    'category',
                    'slug',
                    'key_takeaways',
                    'tags' // Fetch tags instead of seo_keywords
                ],
            })
        );
        return posts[0] as any; // Cast to any to bypass strict ID-only inference for now, or define interface
    } catch (error: any) {
        console.error('Error fetching post:', error?.errors || error);
        return null;
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Fetch post and global settings in parallel
    const [post, globalData] = await Promise.all([
        getPost(decodedSlug),
        directus.request(readSingleton('global')).catch(() => null)
    ]);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seo_title || post.title,
        description: post.seo_description || post.content.substring(0, 160),
        image: post.image ? [`${DIRECTUS_URL}/assets/${post.image}`] : [],
        datePublished: post.published_date,
        author: {
            '@type': 'Person',
            name: 'Nugraha Labib',
        },
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-[family-name:var(--font-outfit)]">
            <JsonLd data={jsonLd} />

            <Navbar />

            <main className="pt-32 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 mb-6 font-mono">
                        <Calendar size={14} />
                        {new Date(post.published_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {post.image && (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                            <img
                                src={`${DIRECTUS_URL}/assets/${post.image}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                {/* AI-Readiness: Key Takeaways */}
                {post.key_takeaways && (
                    <div className="mb-12 p-6 md:p-8 bg-white/5 border-l-4 border-indigo-500 rounded-r-xl">
                        <h3 className="text-lg font-bold text-indigo-400 mb-4 uppercase tracking-wider font-mono">
                            // Executive Summary
                        </h3>
                        <div className="text-neutral-300">
                            <MarkdownRenderer content={post.key_takeaways} />
                        </div>
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-xl text-neutral-300">
                    <MarkdownRenderer content={post.content} />
                </article>
            </main>

            <Footer />
        </div>
    );
}
