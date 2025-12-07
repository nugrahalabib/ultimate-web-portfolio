'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, X, Github, Linkedin, Instagram, Music, Twitter, Youtube, Globe } from 'lucide-react';

// Map icon strings to components (Same as Footer)
const iconMap: any = {
    Linkedin, Github, Instagram, Music, Twitter, Youtube, Mail, Globe
};

interface HeroProps {
    headline?: string;
    subheadline?: string;
    socialLinks?: any[];
}

const Hero = ({ headline, subheadline, socialLinks = [] }: HeroProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const defaultHeadline = `Welcome to <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Nugraha Labib Mujaddid</span> <br /> Personal Hub.`;
    const defaultSubheadline = `This is where I document my journey, showcase my projects, and share the ideas that drive me.`;

    const handleExploreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('what-i-do');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center md:justify-start px-6 md:px-20 z-10 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl relative z-20 pointer-events-auto"
            >
                {/* Headline Group */}
                <h1
                    className="text-5xl md:text-7xl font-bold leading-tight text-white mb-8 tracking-tight font-[family-name:var(--font-outfit)] transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-default"
                    dangerouslySetInnerHTML={{ __html: headline || defaultHeadline }}
                />

                {/* Sub-headline */}
                <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light font-[family-name:var(--font-inter)]">
                    {subheadline || defaultSubheadline}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <motion.button
                        onClick={handleExploreClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        Explore My Journey <ArrowRight size={20} />
                    </motion.button>

                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                        Let's Connect <Mail size={20} />
                    </motion.button>
                </div>
            </motion.div>

            {/* Subtle Abstract Shape (Right Side) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none opacity-50" />

            {/* Social Media Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pointer-events-auto"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">Let's Connect</h3>
                            <p className="text-neutral-400 mb-8">Find me on these platforms:</p>

                            <div className="grid grid-cols-4 gap-4">
                                {socialLinks.length > 0 ? (
                                    socialLinks.map((link, index) => {
                                        const Icon = iconMap[link.icon] || Globe;
                                        return (
                                            <motion.a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-all gap-2"
                                            >
                                                <Icon size={24} />
                                                <span className="text-xs">{link.label}</span>
                                            </motion.a>
                                        )
                                    })
                                ) : (
                                    <p className="col-span-4 text-center text-neutral-500 italic">No links configured.</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
