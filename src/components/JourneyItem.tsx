'use client';

import { motion } from 'framer-motion';

interface JourneyItemProps {
    item: any;
    index: number;
    onClick: () => void;
    colorClass: string; // e.g., "indigo", "pink", "emerald"
}

export default function JourneyItem({ item, index, onClick, colorClass }: JourneyItemProps) {
    // Map color names to Tailwind classes dynamically or use a lookup object
    const colors: Record<string, { text: string; border: string; bg: string; bgHover: string }> = {
        indigo: { text: 'text-indigo-400', border: 'border-indigo-500/50', bg: 'bg-indigo-500', bgHover: 'group-hover:bg-indigo-500' },
        pink: { text: 'text-pink-400', border: 'border-pink-500/50', bg: 'bg-pink-500', bgHover: 'group-hover:bg-pink-500' },
        emerald: { text: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500', bgHover: 'group-hover:bg-emerald-500' },
        amber: { text: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500', bgHover: 'group-hover:bg-amber-500' },
        cyan: { text: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-500', bgHover: 'group-hover:bg-cyan-500' },
    };

    const c = colors[colorClass] || colors.indigo;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative z-20 mb-12 pointer-events-auto"
        >
            <button
                onClick={onClick}
                className="group w-full text-left cursor-pointer focus:outline-none"
            >
                {/* Timeline Dot */}
                <div className={`absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-[#050505] border-2 ${c.border} ${c.bgHover} transition-all duration-300 z-30 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />

                {/* Content */}
                <div className="p-6 -m-4 rounded-xl transition-all duration-300 border border-transparent group-hover:bg-white/5 group-hover:border-white/10 group-hover:translate-x-2">
                    <span className={`text-xs font-mono ${c.text} mb-2 block tracking-wider`}>{item.date_range}</span>
                    <h3 className={`text-xl font-bold text-white mb-1 group-hover:${c.text} transition-colors`}>{item.title}</h3>
                    <h4 className="text-neutral-400 font-medium mb-3">{item.subtitle}</h4>
                    {item.category === 'education' ? (
                        <span className="inline-block px-2 py-1 bg-white/5 rounded text-xs text-white/70 font-mono border border-white/5">{item.description}</span>
                    ) : (
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl group-hover:text-neutral-300 transition-colors">{item.description}</p>
                    )}
                </div>
            </button>
        </motion.div>
    );
}
