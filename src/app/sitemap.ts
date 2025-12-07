import { MetadataRoute } from 'next';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nugrahalabib.com';

    // 1. Static Routes
    const routes = [
        '',
        '/projects',
        '/journey',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Blog Posts & Projects
    let blogRoutes: MetadataRoute.Sitemap = [];
    let projectRoutes: MetadataRoute.Sitemap = [];

    try {
        const [posts, projects] = await Promise.all([
            directus.request(readItems('posts', {
                filter: { status: { _eq: 'published' } },
                fields: ['slug', 'published_date'],
            })),
            directus.request(readItems('projects', {
                fields: ['slug'],
            }))
        ]);

        blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.published_date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        projectRoutes = projects.map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    } catch (error) {
        console.error('Error fetching data for sitemap:', error);
    }

    return [...routes, ...blogRoutes, ...projectRoutes];
}
