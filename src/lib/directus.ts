import { createDirectus, rest, staticToken } from '@directus/sdk';

// Define the Schema interface based on what we created
interface Schema {
    global: {
        hero_headline: string;
        hero_subheadline: string;
        showcase_headline: string;
        showcase_subheadline: string;
        journey_headline: string;
        journey_subheadline: string;
        testimonials_headline: string;
        testimonials_subheadline: string;
    };
    footer_settings: {
        cta_headline: string;
        cta_button_text: string;
        cta_link: string;
        status_text: string;
        location_text: string;
        copyright_text: string;
    };
    footer_socials: {
        id: number;
        label: string;
        url: string;
        icon: string;
        sort: number;
    }[];
    seo: {
        home_title: string;
        home_description: string;
        home_keywords: string[];
        home_og_image: string;
        projects_title: string;
        projects_description: string;
        projects_keywords: string[];
        projects_og_image: string;
        journey_title: string;
        journey_description: string;
        journey_keywords: string[];
        journey_og_image: string;
        blog_title: string;
        blog_description: string;
        blog_keywords: string[];
        blog_og_image: string;
    };
    showcase_items: {
        id: number;
        title: string;
        subtitle: string;
        description: string;
        icon: string;
        col_span: string;
        visual_type: string;
        sort: number;
        detail_content?: string;
        related_post?: number | { slug: string }; // Relation
        related_project?: number | { slug: string }; // Relation
    }[];
    timeline_entries: {
        id: number;
        year: string;
        role: string;
        organization: string;
        description: string;
        icon: string;
        sort: number;
        detail_content?: string;
        related_post?: number | { slug: string }; // Relation
        related_project?: number | { slug: string }; // Relation
    }[];
    testimonials: {
        id: number;
        name: string;
        role: string;
        quote: string;
        detail_content?: string;
    }[];
    projects: {
        id: number;
        title: string;
        category: string;
        description: string;
        year: string;
        link: string;
        sort: number;
        slug: string;
        content: string;
        image: string; // Added image field
        // SEO
        seo_description: string;
    }[];
    journey_items: {
        id: number;
        category: 'experience' | 'ventures' | 'education' | 'certifications' | 'organization';
        title: string;
        subtitle: string;
        date_range: string;
        description: string;
        highlight: boolean;
        sort: number;
        details: string;
        image: string; // UUID of the file
    }[];
    posts: {
        id: number;
        title: string;
        slug: string;
        content: string;
        image: string;
        published_date: string;
        status: 'published' | 'draft' | 'archived';
        category?: string;
        tags?: string[];
        // SEO & AI
        seo_title: string;
        seo_description: string;
        canonical_url: string;
        is_featured: boolean;
        key_takeaways: string;
    }[];
    bio_links: {
        id: number;
        label: string;
        url: string;
        icon: string;
        is_active: boolean;
        sort: number;
        status: string;
        category: number | BioCategory; // Relation
        is_highlight: boolean;
        badge: string;
    }[];
    bio_categories: BioCategory[];
    bio_settings: {
        page_title: string;
        page_subtitle: string;
        running_text: string;
        profile_image: string;
    };
    blog_highlights: {
        headline: string;
        selected_posts: number[] | BlogHighlightPost[];
    };
    blog_highlights_posts: BlogHighlightPost[];
}

interface BlogHighlightPost {
    id: number;
    blog_highlights_id: number;
    posts_id: number | {
        id: number;
        title: string;
        slug: string;
        published_date: string;
        image: string;
        seo_description: string;
        category: string;
    };
}

interface BioCategory {
    id: number;
    title: string;
    sort: number;
}

// Initialize the client
const directus = createDirectus<Schema>(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055')
    .with(rest({
        onRequest: (options) => ({ ...options, cache: 'no-store' }),
    }));

export default directus;
