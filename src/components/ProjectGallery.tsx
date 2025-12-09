'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const categories = ["All", "AI & Engineering", "Content & Business", "Architecture & Design"];

const ProjectGallery = ({ initialItems = [], categories = [] }: { initialItems?: any[]; categories?: any[] }) => {
    // State
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");

    // Derived Data
    const years = ["All", ...Array.from(new Set(initialItems.map(p => p.year).filter(Boolean))).sort().reverse()];

    // Filter Logic
    const filteredProjects = initialItems.filter(p => {
        // 1. Category Filter
        const catName = p.category_id?.name || p.category;
        const matchCategory = activeCategory === "All" || catName === activeCategory;

        // 2. Search Filter
        const query = searchQuery.toLowerCase();
        const matchSearch = (
            p.title?.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query)
        );

        // 3. Year Filter
        const matchYear = selectedYear === "All" || p.year === selectedYear;

        return matchCategory && matchSearch && matchYear;
    });

    return (
        <div className="w-full">
            {/* Filters & Search - Matching BlogList.tsx */}
            <div className="mb-16 space-y-6">
                {/* Search Bar - Centered */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500">
                        <svg className="w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm shadow-lg"
                    />
                </div>

                {/* Filter Controls - Centered */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setActiveCategory("All")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === "All"
                                ? 'bg-white text-black border-white'
                                : 'bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            All Types
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat.name
                                    ? 'bg-white text-black border-white'
                                    : 'bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Year Filter */}
                    <div className="relative group">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="appearance-none bg-black/40 border border-white/10 text-neutral-400 rounded-full px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:border-white/30 hover:border-white/30 transition-all cursor-pointer"
                        >
                            {years.map(year => (
                                <option key={year} value={year} className="bg-neutral-900 text-white">
                                    {year === "All" ? "All Years" : year}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => {
                            const catObject = typeof project.category_id === 'object' ? project.category_id : null;
                            const borderColor = catObject?.color || "#ffffff";

                            return (
                                <motion.div
                                    layout
                                    key={project.id || index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative p-8 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        ['--hover-border' as any]: borderColor
                                    }}
                                >
                                    {/* Dynamic Hover Border */}
                                    <div
                                        className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none group-hover:border-[var(--hover-border)]"
                                    />

                                    {/* Hover Icon */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowUpRight className="text-white" size={24} />
                                    </div>

                                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                                        <span className="sr-only">View {project.title}</span>
                                    </Link>

                                    <div className="flex flex-col h-full justify-between pointer-events-none">
                                        <div>
                                            <span
                                                className="text-xs font-mono mb-2 block uppercase tracking-wider"
                                                style={{ color: catObject?.color || '#737373' }}
                                            >
                                                {catObject?.name || project.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-outfit)] leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-xs font-mono text-neutral-600">{project.year}</span>
                                            <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors">View Project</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-neutral-500">No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedYear("All"); setActiveCategory("All"); }}
                                className="mt-4 text-white underline underline-offset-4 hover:text-neutral-300"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ProjectGallery;
