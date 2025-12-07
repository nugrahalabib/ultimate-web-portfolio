'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'journey', label: 'Journey', href: '/journey' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'blog', label: 'Blog', href: '/blog' },
];

const Navbar = () => {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-1 p-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 px-2">
                <ul className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <Link
                                href={tab.href}
                                onMouseEnter={() => setHovered(tab.id)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative block cursor-pointer px-4 py-2 text-sm font-medium transition-colors"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {/* Layer 1: The Text (Top) */}
                                <motion.span
                                    className="relative z-10 block"
                                    animate={{ color: hovered === tab.id ? "#000000" : "#a3a3a3" }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                >
                                    {tab.label}
                                </motion.span>

                                {/* Layer 2: The Sliding Pill (Bottom) */}
                                {hovered === tab.id && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white rounded-full z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
