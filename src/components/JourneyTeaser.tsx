'use client';

import { motion } from 'framer-motion';

const JourneyTeaser = () => {
    const milestones = [
        { year: '2019', title: 'Architect', desc: 'Graduated from Undip. Designing spaces.' },
        { year: '2021', title: 'Content Creator', desc: 'Started sharing knowledge. 140K+ Community.' },
        { year: '2024', title: 'Strategic Analyst', desc: 'Corporate Strategy at Caliana.' },
        { year: '2025', title: 'Tech Founder', desc: 'Building Spead AI & Future Tech.' },
    ];

    return (
        <section className="py-20 px-6 md:px-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 font-[family-name:var(--font-outfit)]">
                    From Architecture <br /> to Algorithms.
                </h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative z-10"
                            >
                                <div className="w-4 h-4 rounded-full bg-white mb-6 hidden md:block ring-4 ring-[#050505]" />
                                <div className="text-4xl font-bold text-white/20 mb-2 font-[family-name:var(--font-outfit)]">{item.year}</div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTeaser;
