import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import directus, { DIRECTUS_URL } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Helper to fetch project data
async function getProject(slug: string) {
    try {
        const projects = await directus.request(readItems('projects', {
            filter: { slug: { _eq: slug } },
            limit: 1,
            // Ensure all SEO fields and tags are fetched
            fields: ['*', 'seo_description', 'seo_title', 'tags']
        }));
        return projects[0];
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

// Dynamic Metadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) return {};

    // Parse tags safely (handle both string[] and object structures)
    const rawTags = project.tags || [];
    const keywords = rawTags.map((t: any) => typeof t === 'string' ? t : t.tag || t.keyword || '').filter((t: string) => t);

    return {
        title: project.seo_title || project.title,
        description: project.seo_description || project.description,
        keywords: keywords,
        openGraph: {
            title: project.seo_title || project.title,
            description: project.seo_description || project.description,
            images: project.image ? [`${DIRECTUS_URL}/assets/${project.image}`] : [],
            type: 'website',
        },
    };
}

export default async function ProjectDetail(props: PageProps) {
    const params = await props.params;
    const project = await getProject(params.slug);

    if (!project) {
        notFound();
    }

    // Parse tags safely (handle both string[] and object structures) - Reused for consistency
    const rawTags = project.tags || [];
    const keywords = rawTags.map((t: any) => typeof t === 'string' ? t : t.tag || t.keyword || '').filter((t: string) => t);

    // JSON-LD for Project (CreativeWork)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.seo_title || project.title,
        description: project.seo_description || project.description,
        keywords: keywords.join(', '),
        image: project.image ? [`${DIRECTUS_URL}/assets/${project.image}`] : [],
        author: {
            '@type': 'Person',
            name: 'Nugraha Labib',
        },
        dateCreated: project.date,
        url: `https://nugrahalabib.com/projects/${project.slug}`,
        genre: project.category,
    };

    return (
        <main className="relative w-full min-h-screen bg-[#050505] selection:bg-white/20">
            <JsonLd data={jsonLd} />
            <ThreeBackground />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow pt-32 pb-20 px-6 md:px-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>

                        {/* Header */}
                        <div className="mb-12">
                            <div className="flex flex-wrap gap-4 mb-6">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium flex items-center gap-2">
                                    <Tag size={14} /> {project.category}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-neutral-400 text-sm font-mono flex items-center gap-2">
                                    <Calendar size={14} /> {new Date(project.date).getFullYear()}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)] leading-tight">
                                {project.title}
                            </h1>

                            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-invert prose-lg max-w-none mb-16 prose-headings:font-bold prose-headings:text-white prose-a:text-indigo-400 text-neutral-300">
                            <MarkdownRenderer content={project.content} />
                        </div>

                        {/* Links */}
                        {project.url && project.url !== '#' && (
                            <div className="border-t border-white/10 pt-8">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Visit Project <ExternalLink size={18} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
