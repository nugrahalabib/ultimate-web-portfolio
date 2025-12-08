'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Building2, Smartphone, PenTool, X, ArrowRight, Code, GraduationCap, Rocket, Globe, Award, Users } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

// Map string icon names to components
const iconMap: any = {
    Briefcase, Building2, Smartphone, PenTool,
    Code, GraduationCap, Rocket, Globe, Award, Users
};

const JourneyTimeline = ({ items = [], headline, subheadline }: { items?: any[], headline?: string, subheadline?: string }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center']
    });

    const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    if (!items || items.length === 0) return null;

    return (
        <section ref={containerRef} className="relative px-6 md:px-20 py-20 z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center border-b border-white/10 pb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-outfit)] mb-4 tracking-tight">{headline || 'The Journey.'}</h2>
                    <p className="text-neutral-400 text-lg font-mono tracking-wide">{subheadline || 'CHRONOLOGY // 2019 - 2024'}</p>
                </div>

                <div className="relative">
                    {/* Central Line (Background - Dark Wire) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full" />

                    {/* Glowing Path (Animated - SUPER NEON) */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-4 md:left-1/2 top-0 w-[4px] bg-cyan-400 -translate-x-1/2 rounded-full z-0"
                    />
                    {/* Outer Glow Layer for Neon Effect */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-4 md:left-1/2 top-0 w-[8px] bg-cyan-500/50 blur-[4px] -translate-x-1/2 rounded-full z-0"
                    />
                    <motion.div
                        style={{ height }}
                        className="absolute left-4 md:left-1/2 top-0 w-[20px] bg-cyan-500/30 blur-[12px] -translate-x-1/2 rounded-full z-0"
                    />

                    <div className="space-y-8 md:space-y-12">
                        {items.map((item, index) => {
                            const Icon = iconMap[item.icon] || Briefcase;
                            return (
                                <motion.div
                                    key={index}
                                    layoutId={`journey-${item.id || index}`}
                                    onClick={() => setSelectedItem(item)}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10 cursor-pointer group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Content Card (Wire Aesthetic) */}
                                    <div className="flex-1 w-full pl-12 md:pl-0">
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className={`
                                p-6 rounded-xl border backdrop-blur-md transition-all duration-300
                                bg-neutral-950/30 border-white/10 hover:border-white/30
                                shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                                ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                             `}>
                                            <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                <span className="font-mono text-xs md:text-sm text-cyan-400 font-bold tracking-wider bg-cyan-950/30 px-3 py-1 rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">{item.year}</span>
                                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                                    <Icon size={18} className="text-neutral-300" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)] tracking-tight">{item.role}</h3>
                                            <p className="text-sm font-bold mb-3 uppercase tracking-wide text-neutral-400">{item.organization}</p>
                                            <p className="text-neutral-500 leading-relaxed text-sm md:text-base font-medium font-mono">{item.description}</p>
                                        </motion.div>
                                    </div>

                                    {/* Center Node (Neon) */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-4 h-4 rounded-full bg-[#050505] border-2 border-cyan-500 z-10 relative shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover:scale-125 transition-transform"
                                        >
                                            <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-50 blur-[2px]" />
                                        </motion.div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* View Full Journey Button */}
                    <div className="flex justify-center mt-16 relative z-10">
                        <Link
                            href="/journey"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-950 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                        >
                            <span className="text-white font-bold tracking-wider font-[family-name:var(--font-outfit)] group-hover:text-cyan-400 transition-colors">VIEW FULL JOURNEY</span>
                            <ArrowRight size={18} className="text-neutral-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                            <div className="absolute inset-0 rounded-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* POPUP MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                layoutId={`journey-${selectedItem.id}`}
                                className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
                            >
                                {/* Modal Header */}
                                <div className="relative p-8 pb-0 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            {(() => {
                                                const Icon = iconMap[selectedItem.icon] || Briefcase;
                                                return <Icon size={24} className="text-white" />;
                                            })()}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">
                                                {selectedItem.role}
                                            </h3>
                                            <p className="text-neutral-400 text-sm font-mono">
                                                {selectedItem.organization} • {selectedItem.year}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-8 overflow-y-auto">
                                    <div className="text-neutral-300 leading-relaxed">
                                        {selectedItem.detail_content ? (
                                            <MarkdownRenderer content={selectedItem.detail_content} />
                                        ) : (
                                            <p>{selectedItem.description || "No detailed description available."}</p>
                                        )}
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        {selectedItem.related_post?.slug && (
                                            <Link
                                                href={`/blog/${selectedItem.related_post.slug}`}
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                                            >
                                                Read Article <ArrowRight size={16} />
                                            </Link>
                                        )}

                                        {selectedItem.related_project?.slug && (
                                            <Link
                                                href={`/projects/${selectedItem.related_project.slug}`}
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-medium transition-colors"
                                            >
                                                View Project <ArrowRight size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default JourneyTimeline;
