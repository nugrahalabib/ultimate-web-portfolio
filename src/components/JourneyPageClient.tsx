'use client';

import JourneyClient from '@/components/JourneyClient';

interface JourneyPageClientProps {
    items: any[];
    footerSettings?: any;
    footerSocials?: any[];
}

export default function JourneyPageClient({ items, footerSettings, footerSocials }: JourneyPageClientProps) {
    return <JourneyClient items={items} footerSettings={footerSettings} footerSocials={footerSocials} />;
}
