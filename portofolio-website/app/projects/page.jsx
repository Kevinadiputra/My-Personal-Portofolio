"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProjects, ProjectsProvider } from "@/context/ProjectsContext";
import {
    ExternalLink,
    Github,
    Eye,
    ArrowRight,
    Filter,
    Search,
    Star,
    Calendar,
    Code,
    Palette,
    Database,
    Globe,
    Smartphone
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsBento from "@/components/ProjectsBento";
import ProjectContextMenu from "@/components/ProjectContextMenu";
import { useAuth } from "@/context/AuthContext";

const ProjectsPageContent = () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [contextMenu, setContextMenu] = useState({ visible: false, position: { x: 0, y: 0 }, project: null });
    const { projects, loading, updateProject, deleteProject, duplicateProject, toggleFeatured } = useProjects();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const filters = [
        { key: "all", label: "All Projects", icon: Globe },
        { key: "featured", label: "Featured", icon: Star },
        { key: "fullstack", label: "Full Stack", icon: Globe },
        { key: "frontend", label: "Frontend", icon: Palette },
        { key: "backend", label: "Backend", icon: Database },
        { key: "mobile", label: "Mobile", icon: Smartphone },
    ];

    const sortOptions = [
        { key: "newest", label: "Newest First" },
        { key: "oldest", label: "Oldest First" },
        { key: "featured", label: "Featured First" },
        { key: "alphabetical", label: "A-Z" },
    ];

    // Filter and search projects
    const filteredProjects = projects
        .filter(project => {
            // Filter by category
            const categoryMatch = filter === "all" ||
                (filter === "featured" && project.featured) ||
                project.category === filter;

            // Filter by search term
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
                case "newest":
                    return b.id - a.id;
                case "oldest":
                    return a.id - b.id;
                case "featured":
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'frontend':
                return <Palette size={16} />;
            case 'backend':
                return <Database size={16} />;
            case 'fullstack':
                return <Globe size={16} />;
            case 'mobile':
                return <Smartphone size={16} />;
            default:
                return <Code size={16} />;
        }
    };

    // Context menu handlers
    const handleContextMenu = (e, project) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            position: { x: e.clientX, y: e.clientY },
            project
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false, position: { x: 0, y: 0 }, project: null });
    };

    const handleEditProject = (project) => {
        // For now, just show an alert. In a real app, you'd open an edit modal
        alert(`Edit project: ${project.title}\n\nIn a real implementation, this would open an edit form.`);
    };

    const handleDeleteProject = (projectId) => {
        deleteProject(projectId);
    };

    const handleDuplicateProject = (projectId) => {
        duplicateProject(projectId);
    };

    const handleToggleFeatured = (projectId) => {
        toggleFeatured(projectId);
    };

    const handleViewProject = (project, newTab = false) => {
        if (newTab) {
            window.open(`/project/${project.id}`, '_blank', 'noopener,noreferrer');
        } else {
            router.push(`/project/${project.id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                        <p className="text-white/70">Loading projects...</p>
                    </div>
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
                <section className="py-16 bg-gradient-to-br from-primary via-secondary to-tertiary relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.h1
                                className="text-4xl md:text-6xl font-bold text-white mb-6"
                                whileHover={{
                                    scale: 1.02,
                                    textShadow: "0 0 20px rgba(88, 16, 255, 0.5)"
                                }}
                            >
                                My Projects
                            </motion.h1>
                            <motion.div
                                className="w-32 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: 128 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            <motion.p
                                className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Explore my portfolio of web applications, mobile apps, and full-stack solutions.
                                Each project represents a unique challenge solved with modern technologies and innovative approaches.
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-hover rounded-full blur-3xl"></div>
                    </div>
                </section>

                {/* Magic Bento Showcase */}
                <section className="py-16 bg-primary/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Interactive Showcase
                            </h2>
                            <p className="text-white/70 text-lg max-w-2xl mx-auto">
                                Experience the magic of interactive design with animated cards that respond to your every move
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <ProjectsBento
                                projects={projects}
                                enableStars={true}
                                enableSpotlight={true}
                                enableBorderGlow={true}
                                enableTilt={true}
                                enableMagnetism={true}
                                clickEffect={true}
                                spotlightRadius={250}
                                particleCount={8}
                                glowColor="88, 16, 255"
                                disableAnimations={false}
                                onContextMenu={handleContextMenu}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Filters and Search */}
                <section className="py-12 bg-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
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
                            <div className="flex flex-wrap justify-center gap-4">
                                {filters.map((filterOption) => {
                                    const IconComponent = filterOption.icon;
                                    return (
                                        <motion.button
                                            key={filterOption.key}
                                            onClick={() => setFilter(filterOption.key)}
                                            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 spark-on-click ${filter === filterOption.key
                                                ? "bg-accent text-white shadow-lg scale-105"
                                                : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white hover:scale-105"
                                                }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconComponent size={18} />
                                            {filterOption.label}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Sort and Results Count */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <motion.div
                                    className="flex items-center gap-2 text-white/70"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Filter size={18} />
                                    <span>
                                        {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                                    </span>
                                </motion.div>

                                <motion.select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-tertiary border border-tertiary-hover rounded-xl text-white focus:outline-none focus:border-accent"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.key} value={option.key}>
                                            {option.label}
                                        </option>
                                    ))}
                                </motion.select>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredProjects.length === 0 ? (
                            <motion.div
                                className="text-center py-20"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-tertiary flex items-center justify-center">
                                    <Eye size={48} className="text-accent/50" />
                                </div>
                                <h3 className="text-2xl text-white mb-4">No Projects Found</h3>
                                <p className="text-white/70 mb-8">
                                    {searchTerm
                                        ? `No projects match "${searchTerm}". Try adjusting your search or filters.`
                                        : `No projects found in the "${filter}" category.`
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter("all");
                                        setSearchTerm("");
                                    }}
                                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-tertiary rounded-2xl overflow-hidden group cursor-pointer"
                                        onClick={(e) => handleViewProject(project, e.ctrlKey || e.metaKey)}
                                        onAuxClick={(e) => e.button === 1 && handleViewProject(project, true)}
                                        onContextMenu={(e) => handleContextMenu(e, project)}
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Project Image */}
                                        <div className="relative h-56 bg-gradient-to-br from-accent/20 to-accent-hover/20 overflow-hidden">
                                            {project.image && project.image !== "/api/placeholder/400/250" ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Eye size={48} className="text-accent/30" />
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileHover={{ scale: 1 }}
                                                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold"
                                                >
                                                    <Eye size={18} />
                                                    View Details
                                                    <ArrowRight size={18} />
                                                </motion.div>
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                                                    {getCategoryIcon(project.category)}
                                                    <span className="capitalize">{project.category}</span>
                                                </div>
                                                {project.featured && (
                                                    <div className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                                                        <Star size={12} />
                                                        Featured
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Project Content */}
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="px-3 py-1 bg-primary rounded-full text-xs text-white/50">
                                                        +{project.technologies.length - 4} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Links */}
                                            <div className="flex justify-between items-center pt-4 border-t border-primary">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewProject(project, e.ctrlKey || e.metaKey);
                                                    }}
                                                    onAuxClick={(e) => {
                                                        e.stopPropagation();
                                                        e.button === 1 && handleViewProject(project, true);
                                                    }}
                                                    className="text-accent hover:text-accent-hover font-medium flex items-center gap-2 transition-colors"
                                                    title="View Project Details (Ctrl+Click for new tab)"
                                                >
                                                    View Details
                                                    <ArrowRight size={16} />
                                                </button>

                                                <div className="flex space-x-3">
                                                    {project.liveUrl && project.liveUrl !== "#" && (
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-white/70 hover:text-accent transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink size={18} />
                                                        </a>
                                                    )}
                                                    {project.githubUrl && project.githubUrl !== "#" && (
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-white/70 hover:text-white transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Github size={18} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-secondary">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Interested in Working Together?
                            </h2>
                            <p className="text-white/70 mb-8 text-lg">
                                I'm always open to discussing new opportunities and exciting projects.
                                Let's create something amazing together!
                            </p>
                            <motion.button
                                onClick={() => router.push('/#contact')}
                                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors spark-on-click"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Context Menu */}
            <ProjectContextMenu
                project={contextMenu.project}
                position={contextMenu.position}
                isVisible={contextMenu.visible}
                onClose={handleCloseContextMenu}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onDuplicate={handleDuplicateProject}
                onToggleFeatured={handleToggleFeatured}
                onView={handleViewProject}
            />
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