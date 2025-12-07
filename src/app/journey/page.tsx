import { Metadata } from 'next';
import JourneyPageClient from '@/components/JourneyPageClient';
import Footer from '@/components/Footer';

import directus from '@/lib/directus';
import { readSingleton, readItems } from '@directus/sdk';

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await directus.request(readSingleton('seo')).catch(() => null);
    return {
        title: seoData?.journey_title || 'Journey - Nugraha Labib',
        description: seoData?.journey_description || 'My professional journey, experience, and education.',
        keywords: seoData?.journey_keywords || [],
        openGraph: {
            title: seoData?.journey_title || 'Journey - Nugraha Labib',
            description: seoData?.journey_description || 'My professional journey, experience, and education.',
            images: seoData?.journey_og_image ? [`http://localhost:8055/assets/${seoData.journey_og_image}`] : [],
            type: 'website',
        },
    };
}

// --- DATA ---
const experience = [
    {
        role: "Strategic Initiative Analyst",
        company: "Caliana Indonesia (PT Data Nusantara Adhikarya)",
        date: "Jul 2024 - Present",
        desc: "Leading research for new business units (DNA Academy) and formulating 'Digital City' strategic proposals for regional governments directly under the CEO."
    },
    {
        role: "Contract & Claim Management Officer",
        company: "PT Waskita Karya (Persero) Tbk",
        date: "Aug 2022 - Jul 2024",
        desc: "Managed contracts for National Strategic Projects (UIII, Hang Nadim Airport). Restructured documentation for ISO compliance and conducted risk analysis for billion-rupiah contracts."
    },
    {
        role: "Exclusive Creator & Affiliate",
        company: "Shopee",
        date: "May 2022 - Jun 2024",
        desc: "Invited as a premium creator/affiliate based on high-performance metrics."
    },
    {
        role: "Content Creator (@cuanincuy)",
        company: "TikTok / Self-employed",
        date: "Nov 2021 - Present",
        desc: "Built a tech & lifestyle community of 140K+ followers with 2.5M+ monthly views."
    },
    {
        role: "Junior Architect Intern",
        company: "PT Airmas Asri",
        date: "Jan 2020 - Mar 2020",
        desc: "Designed concepts for School PIK 2 and conducted facade studies for major high-rise projects."
    }
];

const ventures = [
    {
        role: "Founder",
        company: "Joki Hidup",
        date: "Jan 2025 - Present",
        desc: "Academic assistance platform employing Master's degree professionals."
    },
    {
        role: "Owner",
        company: "Gultik & Soto Masnug",
        date: "Feb 2024 - Present",
        desc: "F&B Business elevating street food culture for the Gen Z market. 5-Star ratings on Google Maps."
    },
    {
        role: "Asset Manager",
        company: "Mutiara 27",
        date: "Jan 2021 - Present",
        desc: "Property management overseeing 100+ residential units/doors."
    },
    {
        role: "Owner & Visualizer",
        company: "LAB.in Studio",
        date: "Sep 2020 - Present",
        desc: "Creative studio providing end-to-end architectural design, build services, and visual rendering."
    }
];

const education = [
    {
        degree: "Magister Manajemen (MM) New Ventures Innovation",
        school: "Prasetiya Mulya University",
        date: "Oct 2024 - Present",
        gpa: "GPA: 3.50"
    },
    {
        degree: "Bachelor of Architecture",
        school: "Diponegoro University (UNDIP)",
        date: "Aug 2017 - Dec 2021",
        gpa: "GPA: 3.65 (Cumlaude)"
    }
];

const certifications = [
    {
        title: "Google for Startups Graduation",
        org: "Google Cloud",
        date: "Dec 2025",
        highlight: true
    },
    {
        title: "Understanding Int. Construction Contracts",
        org: "Waskita Toll Road",
        date: "Feb 2023",
        highlight: false
    },
    {
        title: "4th Winner Ecohouse Design Competition",
        org: "UGM",
        date: "Sep 2019",
        highlight: false
    },
    {
        title: "BIM Learning Basic Modeling",
        org: "WIKA",
        date: "Jun 2020",
        highlight: false
    },
    {
        title: "Financial Planning Trainer",
        org: "Undip",
        date: "Mar 2022",
        highlight: false
    }
];

const organization = [
    {
        role: "Trainer & Speaker: Financial Planning Training",
        org: "Undip",
        date: "2022"
    },
    {
        role: "Head of Architectural Videography",
        org: "Diponegoro University Club",
        date: "2018-2019"
    },
    {
        role: "Volunteer: BEKRAF",
        org: "Indonesia Creative Digital Architecture",
        date: "2018"
    }
];

export default async function Journey() {
    // Transform data to match JourneyItemType
    const allItems = [
        ...experience.map((item, i) => ({
            id: i + 100,
            category: 'experience',
            title: item.role,
            subtitle: item.company,
            date_range: item.date,
            description: item.desc,
            highlight: false
        })),
        ...ventures.map((item, i) => ({
            id: i + 200,
            category: 'ventures',
            title: item.role,
            subtitle: item.company,
            date_range: item.date,
            description: item.desc,
            highlight: false
        })),
        ...education.map((item, i) => ({
            id: i + 300,
            category: 'education',
            title: item.degree,
            subtitle: item.school,
            date_range: item.date,
            description: item.gpa, // Using GPA as description for now
            highlight: false
        })),
        ...certifications.map((item, i) => ({
            id: i + 400,
            category: 'certifications',
            title: item.title,
            subtitle: item.org,
            date_range: item.date,
            description: '',
            highlight: item.highlight
        })),
        ...organization.map((item, i) => ({
            id: i + 500,
            category: 'organization',
            title: item.role,
            subtitle: item.org,
            date_range: item.date,
            description: '',
            highlight: false
        }))
    ];

    const [footerSettings, footerSocials] = await Promise.all([
        directus.request(readSingleton('footer_settings')).catch(() => ({})),
        directus.request(readItems('footer_socials', { sort: ['sort'] })).catch(() => [])
    ]);

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <JourneyPageClient items={allItems} footerSettings={footerSettings} footerSocials={footerSocials} />
        </main>
    );
}
