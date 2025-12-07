'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, Code, TrendingUp, Play, Zap } from 'lucide-react';

const BentoGrid = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const cardClass = "group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-8 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between min-h-[400px] shadow-2xl shadow-black/50";

    return (
        <section className="px-6 md:px-20 py-20 z-10 relative">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-outfit)]">The Trinity.</h2>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto"
            >
                {/* Card 1: The Strategist */}
                <motion.div
                    variants={itemVariants}
                    className={cardClass}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">The Strategist</h3>
                        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-6">Strategic Initiative Analyst</p>
                        <p className="text-gray-300 leading-relaxed">
                            Translating corporate vision into execution at <span className="text-white font-semibold">Caliana Indonesia</span>. Previously at <span className="text-white font-semibold">Waskita (BUMN)</span>.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center gap-2 text-blue-400 text-sm font-medium">
                        <TrendingUp size={16} /> Data-Driven Execution
                    </div>
                </motion.div>

                {/* Card 2: The Creator */}
                <motion.div
                    variants={itemVariants}
                    className={cardClass}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                            <Users size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">The Creator</h3>
                        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-6">Digital Influence</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="text-2xl font-bold text-white">140K+</div>
                                <div className="text-xs text-gray-500">Followers</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="text-2xl font-bold text-white">40M+</div>
                                <div className="text-xs text-gray-500">Views</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center gap-2 text-purple-400 text-sm font-medium">
                        <Play size={16} /> Building Community
                    </div>
                </motion.div>

                {/* Card 3: The Builder */}
                <motion.div
                    variants={itemVariants}
                    className={cardClass}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <Code size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">The Builder</h3>
                        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-6">Tech Innovation</p>
                        <p className="text-gray-300 leading-relaxed">
                            Building <span className="text-white font-semibold">Spead AI</span> (Google Cloud Funded) & <span className="text-white font-semibold">Shila Assistant</span>.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center gap-2 text-emerald-400 text-sm font-medium">
                        <Zap size={16} /> Solving Real Problems
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default BentoGrid;
