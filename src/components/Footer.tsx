'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Music, ArrowUpRight, Twitter, Youtube, Mail, Globe } from 'lucide-react';

// Map icon strings to components
const iconMap: any = {
    Linkedin, Github, Instagram, Music, Twitter, Youtube, Mail, Globe
};

const Footer = ({ settings, socialLinks = [] }: { settings?: any, socialLinks?: any[] }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            };
            setTime(now.toLocaleTimeString('en-US', options) + ' UTC+7');
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative border-t border-white/10 bg-[#050505] pt-20 pb-10 z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-20">

                {/* Top Layer: Big CTA */}
                <div className="flex flex-col items-center justify-center mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-[family-name:var(--font-outfit)] tracking-tight">
                        {settings?.cta_headline ? (
                            <span dangerouslySetInnerHTML={{ __html: settings.cta_headline }} />
                        ) : (
                            <>
                                Have a crazy idea? <br />
                                Let's build it.
                            </>
                        )}
                    </h2>
                    <motion.a
                        href={settings?.cta_link || "mailto:nugrahalabib@gmail.com"}
                        whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-mono text-lg transition-all duration-300 flex items-center gap-2 group"
                    >
                        {settings?.cta_button_text || 'Initiate Protocol'} <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </motion.a>
                </div>

                {/* Middle Layer: Social Links (Dynamic) */}
                <div className="flex justify-center gap-6 mb-20 flex-wrap">
                    {socialLinks.length > 0 ? (
                        socialLinks.map((link, index) => {
                            const Icon = iconMap[link.icon] || Globe;
                            return (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    className="p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
                                    aria-label={link.label}
                                >
                                    <Icon size={24} />
                                </motion.a>
                            )
                        })
                    ) : (
                        // Fallback if no social links fetched
                        <p className="text-neutral-500 font-mono text-sm">No social links configured.</p>
                    )}
                </div>

                {/* Bottom Layer: System Status Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-4 md:gap-0">

                    {/* Left: System Status */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs text-neutral-500 tracking-wider">
                                {settings?.status_text || 'ALL SYSTEMS OPERATIONAL'}
                            </span>
                        </div>

                        <div className="hidden md:block w-[1px] h-4 bg-white/10" />

                        <span className="font-mono text-xs text-neutral-500 tracking-wider">
                            {settings?.location_text || 'JAKARTA, ID'}
                        </span>

                        <div className="hidden md:block w-[1px] h-4 bg-white/10" />

                        <span className="font-mono text-xs text-neutral-500 tracking-wider">LOCAL TIME: {time}</span>
                    </div>

                    {/* Right: Copyright */}
                    <div className="text-right">
                        <span className="font-mono text-xs text-neutral-600 tracking-wider">
                            {settings?.copyright_text || '© 2025 NUGRAHA LABIB MUJADDID'}
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
