import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const dynamic = 'force-dynamic';

export async function GET() {
    let categories: any[] = [];
    let error = null;

    try {
        const result = await directus.request(readItems('blog_categories'));
        categories = result;
    } catch (e: any) {
        error = {
            message: e.message,
            code: e.code,
            errors: e.errors
        };
    }

    return NextResponse.json({
        app_status: 'online',
        version: 'v2.0',
        env_check: {
            NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL || '(empty - using default)',
            NODE_ENV: process.env.NODE_ENV
        },
        data_check: {
            blog_categories_count: categories.length,
            blog_categories_sample: categories.map((c: any) => c.name),
            fetch_error: error
        },
        timestamp: new Date().toISOString()
    });
}
