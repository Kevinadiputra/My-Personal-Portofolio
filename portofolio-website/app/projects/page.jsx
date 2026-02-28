"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects, ProjectsProvider } from "@/context/ProjectsContext";
import {
    ExternalLink, Github, Eye, ArrowRight, Filter, Search, Star, Code, Database, Brain, BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectsPageContent = () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const { projects, loading } = useProjects();
    const router = useRouter();

    const filters = [
        { key: "all", label: "All Projects", icon: Code },
        { key: "featured", label: "Featured", icon: Star },
        { key: "deep-learning", label: "Deep Learning", icon: Brain },
        { key: "nlp", label: "NLP", icon: Code },
        { key: "data-science", label: "Data Science", icon: BarChart3 },
        { key: "data-engineering", label: "Data Engineering", icon: Database },
    ];

    const sortOptions = [
        { key: "newest", label: "Newest First" },
        { key: "oldest", label: "Oldest First" },
        { key: "featured", label: "Featured First" },
        { key: "alphabetical", label: "A-Z" },
    ];

    const filteredProjects = projects
        .filter(project => {
            const categoryMatch = filter === "all" ||
                (filter === "featured" && project.featured) ||
                project.category === filter;

            const searchMatch = !searchTerm ||
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech =>
                    tech.toLowerCase().includes(searchTerm.toLowerCase())
                );

            return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest": return b.id - a.id;
                case "oldest": return a.id - b.id;
                case "featured": return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case "alphabetical": return a.title.localeCompare(b.title);
                default: return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-16 bg-gradient-to-br from-primary via-secondary to-tertiary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">My Projects</h1>
                        <div className="w-32 h-1 bg-accent mx-auto rounded-full mb-8"></div>
                        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                            Explore my portfolio of machine learning, data science, and AI projects.
                            Each project demonstrates end-to-end problem solving from data to deployment.
                        </p>
                    </div>
                </section>

                {/* Filters and Search */}
                <section className="py-12 bg-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search projects by name, description, or technology..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-tertiary border border-tertiary-hover rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {filters.map((filterOption) => {
                                const IconComponent = filterOption.icon;
                                return (
                                    <button
                                        key={filterOption.key}
                                        onClick={() => setFilter(filterOption.key)}
                                        className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm ${filter === filterOption.key
                                            ? "bg-accent text-white shadow-lg"
                                            : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white"
                                            }`}
                                    >
                                        <IconComponent size={16} />
                                        {filterOption.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Sort and Results */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 text-white/70">
                                <Filter size={18} />
                                <span>{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found</span>
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-tertiary border border-tertiary-hover rounded-xl text-white focus:outline-none focus:border-accent"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.key} value={option.key}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-tertiary flex items-center justify-center">
                                    <Eye size={32} className="text-accent/50" />
                                </div>
                                <h3 className="text-xl text-white mb-2">No Projects Found</h3>
                                <p className="text-white/70 mb-6">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                    className="bg-accent hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="bg-tertiary rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                                        onClick={(e) => {
                                            if (e.ctrlKey || e.metaKey) {
                                                window.open(`/project/${project.id}`, '_blank');
                                            } else {
                                                router.push(`/project/${project.id}`);
                                            }
                                        }}
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-accent/20 to-purple-700/20">
                                            {project.image && project.image !== "/api/placeholder/400/250" ? (
                                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Eye size={48} className="text-accent/30" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white capitalize">
                                                    {project.category}
                                                </span>
                                                {project.featured && (
                                                    <span className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                                                        <Star size={12} /> Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="px-3 py-1 bg-primary rounded-full text-xs text-white/50">
                                                        +{project.technologies.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-primary">
                                                <span className="text-accent text-sm font-medium flex items-center gap-2">
                                                    View Details <ArrowRight size={14} />
                                                </span>
                                                <div className="flex space-x-3">
                                                    {project.liveUrl && project.liveUrl !== "#" && (
                                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                            className="text-white/70 hover:text-accent transition-colors"
                                                            onClick={(e) => e.stopPropagation()}>
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    )}
                                                    {project.githubUrl && project.githubUrl !== "#" && (
                                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                            className="text-white/70 hover:text-white transition-colors"
                                                            onClick={(e) => e.stopPropagation()}>
                                                            <Github size={16} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-secondary">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Interested in Working Together?</h2>
                        <p className="text-white/70 mb-8 text-lg">
                            I'm always open to discussing new ML/DS opportunities and exciting projects.
                        </p>
                        <button
                            onClick={() => router.push('/#contact')}
                            className="bg-accent hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                        >
                            Get In Touch
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const ProjectsPage = () => {
    return (
        <ProjectsProvider>
            <ProjectsPageContent />
        </ProjectsProvider>
    );
};

export default ProjectsPage;
