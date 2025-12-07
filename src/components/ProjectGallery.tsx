'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const categories = ["All", "AI & Engineering", "Content & Business", "Architecture & Design"];

const ProjectGallery = ({ initialItems = [] }: { initialItems?: any[] }) => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? initialItems
        : initialItems.filter(p => p.category === activeCategory);

    const getBorderColor = (category: string) => {
        switch (category) {
            case "AI & Engineering": return "group-hover:border-indigo-500/50";
            case "Content & Business": return "group-hover:border-pink-500/50";
            case "Architecture & Design": return "group-hover:border-orange-500/50";
            default: return "group-hover:border-white/30";
        }
    };

    return (
        <div className="w-full">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
              ${activeCategory === cat
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'}
            `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            key={project.title || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`
                group relative p-8 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md
                cursor-pointer transition-all duration-300 hover:scale-[1.02]
                ${getBorderColor(project.category)}
              `}
                        >
                            {/* Hover Icon */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="text-white" size={24} />
                            </div>

                            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View {project.title}</span>
                            </Link>

                            <div className="flex flex-col h-full justify-between pointer-events-none">
                                <div>
                                    <span className="text-xs font-mono text-neutral-500 mb-2 block uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-outfit)] leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs font-mono text-neutral-600">{project.year}</span>
                                    <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors">View Project</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ProjectGallery;
