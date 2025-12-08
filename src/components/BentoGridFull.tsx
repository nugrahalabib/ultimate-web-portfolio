'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Code,
    Briefcase,
    Bot,
    Smartphone,
    Utensils,
    Building,
    Palette,
    GraduationCap,
    ArrowUpRight,
    X,
    ArrowRight,
    Rocket,
    Globe,
    Database,
    Cloud
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

// Map string icon names to components
const iconMap: any = {
    Code, Briefcase, Bot, Smartphone, Utensils, Building, Palette, GraduationCap,
    Rocket, Globe, Database, Cloud
};

const BentoGridFull = ({ items = [], headline, subheadline }: { items?: any[], headline?: string, subheadline?: string }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Fallback if no items
    if (!items || items.length === 0) return null;

    return (
        <section className="px-6 md:px-20 py-20 z-10 relative">
            <div className="max-w-7xl mx-auto mb-12 border-b border-white/10 pb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-outfit)] mb-4 tracking-tight">{headline || 'What I Do.'}</h2>
                <p className="text-neutral-400 text-lg font-mono tracking-wide">{subheadline || 'THE COMPLETE ECOSYSTEM // 2024'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {items.map((card, index) => {
                    const Icon = iconMap[card.icon] || Code;

                    // Visual generator based on type
                    let visual = null;
                    if (card.visual_type === 'grid') {
                        visual = <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" /></div>;
                    } else if (card.visual_type === 'radial') {
                        visual = <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" /></div>;
                    } else if (card.visual_type === 'circles') {
                        visual = <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-[200px] h-[200px] border border-white/20 rounded-full translate-x-1/3 -translate-y-1/3" /><div className="absolute bottom-0 left-0 w-[150px] h-[150px] border border-white/20 rounded-full -translate-x-1/3 translate-y-1/3" /></div>;
                    } else if (card.visual_type === 'stripes') {
                        visual = <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ffffff_10px,#ffffff_11px)]" /></div>;
                    }

                    return (
                        <motion.div
                            key={card.id || index}
                            layoutId={`card-${card.id || index}`}
                            onClick={() => setSelectedItem(card)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className={`
              relative group overflow-hidden rounded-xl p-6 cursor-pointer
              bg-neutral-950/80 backdrop-blur-md
              border border-white/10 hover:border-white/30
              transition-all duration-300
              ${card.col_span || 'md:col-span-1'}
              min-h-[200px] flex flex-col justify-between
              shadow-[0_0_0_1px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
            `}
                        >
                            {/* Visual Background */}
                            {visual}

                            {/* Header */}
                            <div className="relative z-10 flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <Icon size={20} className="text-neutral-300" />
                                </div>
                                <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors" size={20} />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 mt-auto">
                                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)] tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-neutral-400 font-medium mb-1 leading-relaxed">
                                    {card.subtitle}
                                </p>
                                {card.description && (
                                    <p className="text-xs text-neutral-500 mt-2 font-mono border-t border-white/5 pt-2">
                                        {card.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
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
                                layoutId={`card-${selectedItem.id}`}
                                className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
                            >
                                {/* Modal Header */}
                                <div className="relative p-8 pb-0 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            {(() => {
                                                const Icon = iconMap[selectedItem.icon] || Code;
                                                return <Icon size={24} className="text-white" />;
                                            })()}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">
                                                {selectedItem.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm font-mono">
                                                {selectedItem.subtitle}
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

export default BentoGridFull;
