'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building, GraduationCap, Award, Users, X, Calendar, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import JourneyItem from '@/components/JourneyItem';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface JourneyItemType {
    id: number;
    category: string;
    title: string;
    subtitle: string;
    date_range: string;
    description: string;
    highlight: boolean;
    details?: string;
    image?: string;
}

interface JourneyClientProps {
    items: JourneyItemType[];
    footerSettings?: any;
    footerSocials?: any[];
}

const sections = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'ventures', label: 'Ventures', icon: Building },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'organization', label: 'Organization', icon: Users },
];

export default function JourneyClient({ items, footerSettings, footerSocials }: JourneyClientProps) {
    const [activeSection, setActiveSection] = useState('experience');
    const [selectedItem, setSelectedItem] = useState<JourneyItemType | null>(null);

    // Filter items by category
    const experience = items.filter(i => i.category === 'experience');
    const ventures = items.filter(i => i.category === 'ventures');
    const education = items.filter(i => i.category === 'education');
    const certifications = items.filter(i => i.category === 'certifications');
    const organization = items.filter(i => i.category === 'organization');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Scroll Spy
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-indigo-500/30">

            {/* 1. Background Layer (Fixed, z-0) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ThreeBackground />
            </div>

            {/* 2. Content Layer (Relative, z-10) */}
            <div className="relative z-10 flex flex-col min-h-screen">

                {/* Navbar */}
                <div className="pointer-events-auto">
                    <Navbar />
                </div>

                {/* Main Content */}
                <main className="flex-grow pt-32 pb-20 px-6 md:px-20">
                    <div className="max-w-7xl mx-auto">

                        {/* Header */}
                        <div className="mb-20 text-center pointer-events-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-outfit)] tracking-tight">
                                The Blueprint.
                            </h1>
                            <p className="text-neutral-400 text-lg md:text-xl font-light">
                                A chronological archive of growth, pivots, and milestones.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                            {/* Sidebar / TOC (Desktop) */}
                            <aside className="hidden lg:block w-64 flex-shrink-0 pointer-events-auto">
                                <div className="sticky top-32">
                                    <h3 className="font-bold mb-6 font-[family-name:var(--font-outfit)] text-sm tracking-wider text-neutral-400 uppercase">
                                        Table of Contents
                                    </h3>
                                    <nav className="space-y-1 border-l border-white/10">
                                        {sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`
                                                    w-full text-left px-4 py-2 text-sm font-medium transition-all duration-200 border-l-2 -ml-[2px] flex items-center gap-3
                                                    ${activeSection === section.id
                                                        ? 'border-indigo-500 text-white bg-white/5'
                                                        : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:border-white/20'}
                                                `}
                                            >
                                                <section.icon size={16} />
                                                {section.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Timeline Content */}
                            <div className="flex-1 space-y-24 pointer-events-auto">

                                {/* Experience */}
                                <section id="experience" className="scroll-mt-32">
                                    <SectionHeader icon={Briefcase} title="Professional Experience" color="text-indigo-400" bg="bg-indigo-500/10" border="border-indigo-500/20" />
                                    <div className="border-l border-white/10 ml-6 pl-8 md:pl-12 space-y-2">
                                        {experience.map((item, index) => (
                                            <JourneyItem key={index} item={item} index={index} onClick={() => setSelectedItem(item)} colorClass="indigo" />
                                        ))}
                                    </div>
                                </section>

                                {/* Ventures */}
                                <section id="ventures" className="scroll-mt-32">
                                    <SectionHeader icon={Building} title="Entrepreneurial Ventures" color="text-pink-400" bg="bg-pink-500/10" border="border-pink-500/20" />
                                    <div className="border-l border-white/10 ml-6 pl-8 md:pl-12 space-y-2">
                                        {ventures.map((item, index) => (
                                            <JourneyItem key={index} item={item} index={index} onClick={() => setSelectedItem(item)} colorClass="pink" />
                                        ))}
                                    </div>
                                </section>

                                {/* Education */}
                                <section id="education" className="scroll-mt-32">
                                    <SectionHeader icon={GraduationCap} title="Education" color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/20" />
                                    <div className="border-l border-white/10 ml-6 pl-8 md:pl-12 space-y-2">
                                        {education.map((item, index) => (
                                            <JourneyItem key={index} item={item} index={index} onClick={() => setSelectedItem(item)} colorClass="emerald" />
                                        ))}
                                    </div>
                                </section>

                                {/* Certifications */}
                                <section id="certifications" className="scroll-mt-32">
                                    <SectionHeader icon={Award} title="Certifications & Awards" color="text-amber-400" bg="bg-amber-500/10" border="border-amber-500/20" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        {certifications.map((item, index) => (
                                            <JourneyItem key={index} item={item} index={index} onClick={() => setSelectedItem(item)} colorClass="amber" />
                                        ))}
                                    </div>
                                </section>

                                {/* Organization */}
                                <section id="organization" className="scroll-mt-32">
                                    <SectionHeader icon={Users} title="Organization & Volunteer" color="text-cyan-400" bg="bg-cyan-500/10" border="border-cyan-500/20" />
                                    <div className="border-l border-white/10 ml-6 pl-8 md:pl-12 space-y-2">
                                        {organization.map((item, index) => (
                                            <JourneyItem key={index} item={item} index={index} onClick={() => setSelectedItem(item)} colorClass="cyan" />
                                        ))}
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <div className="pointer-events-auto">
                    <Footer settings={footerSettings} socialLinks={footerSocials} />
                </div>
            </div>

            {/* 3. Modal Layer (Fixed, z-50) */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors z-20 backdrop-blur-sm border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto custom-scrollbar">
                                {/* Image Header */}
                                {selectedItem.image && (
                                    <div className="w-full h-64 relative bg-neutral-900">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${selectedItem.image}`}
                                            alt={selectedItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-6 font-mono">
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                            <Calendar size={14} /> {selectedItem.date_range}
                                        </span>
                                        {selectedItem.subtitle && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                                <MapPin size={14} /> {selectedItem.subtitle}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)] leading-tight">
                                        {selectedItem.title}
                                    </h2>

                                    <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent my-8" />

                                    {/* Body */}
                                    <div className="prose prose-invert prose-lg max-w-none text-neutral-300 leading-relaxed">
                                        {selectedItem.details ? (
                                            <MarkdownRenderer content={selectedItem.details} />
                                        ) : (
                                            <p>{selectedItem.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper Component for Section Headers
function SectionHeader({ icon: Icon, title, color, bg, border }: { icon: any, title: string, color: string, bg: string, border: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 rounded-xl ${bg} border ${border}`}>
                <Icon className={color} size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                {title}
            </h2>
        </div>
    );
}
