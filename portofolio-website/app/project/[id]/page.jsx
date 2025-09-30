"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    ExternalLink, 
    Github, 
    Calendar, 
    Tag, 
    Star,
    Eye,
    Code,
    Palette,
    Database,
    Globe
} from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { getProject, projects, loading } = useProjects();
    const [project, setProject] = useState(null);
    const [relatedProjects, setRelatedProjects] = useState([]);

    useEffect(() => {
        if (!loading && projects.length > 0) {
            const foundProject = getProject(parseInt(params.id));
            if (foundProject) {
                setProject(foundProject);
                
                // Find related projects (same category, exclude current)
                const related = projects
                    .filter(p => p.category === foundProject.category && p.id !== foundProject.id)
                    .slice(0, 3);
                setRelatedProjects(related);
            }
        }
    }, [params.id, projects, loading, getProject]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-white/70">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
                    <p className="text-white/70 mb-8">The project you're looking for doesn't exist.</p>
                    <motion.button
                        onClick={() => router.push('/')}
                        className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </motion.button>
                </div>
            </div>
        );
    }

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'frontend':
                return <Palette size={20} />;
            case 'backend':
                return <Database size={20} />;
            case 'fullstack':
                return <Globe size={20} />;
            case 'mobile':
                return <Code size={20} />;
            default:
                return <Code size={20} />;
        }
    };

    return (
        <div className="min-h-screen bg-primary">
            <Header />
            
            <main className="pt-20">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors mb-8"
                        whileHover={{ x: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Projects
                    </motion.button>
                </div>

                {/* Project Header */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Project Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-2xl overflow-hidden">
                                {project.image && project.image !== "/api/placeholder/400/250" ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                
                                {/* Fallback */}
                                <div className={`w-full h-full flex items-center justify-center text-8xl text-accent/30 ${project.image && project.image !== "/api/placeholder/400/250" ? 'hidden' : 'flex'}`}>
                                    <Eye />
                                </div>
                            </div>

                            {/* Featured Badge */}
                            {project.featured && (
                                <motion.div
                                    className="absolute top-4 right-4 bg-accent px-4 py-2 rounded-full flex items-center gap-2 text-white font-semibold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Star size={16} />
                                    Featured
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Project Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-accent">
                                        {getCategoryIcon(project.category)}
                                        <span className="text-sm font-medium capitalize">{project.category}</span>
                                    </div>
                                    {project.featured && (
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star size={16} />
                                            <span className="text-sm">Featured</span>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {project.title}
                                </h1>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Tag size={20} />
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-4 py-2 bg-tertiary rounded-full text-accent font-medium"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.liveUrl && project.liveUrl !== "#" && (
                                    <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink size={20} />
                                        View Live Demo
                                    </motion.a>
                                )}

                                {project.githubUrl && project.githubUrl !== "#" && (
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-tertiary hover:bg-tertiary-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github size={20} />
                                        View Source Code
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Project Details */}
                <section className="bg-secondary py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                                Project Overview
                            </h2>

                            <div className="bg-tertiary rounded-2xl p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">
                                            Key Features
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3 text-white/70">
                                                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                Responsive design that works on all devices
                                            </li>
                                            <li className="flex items-start gap-3 text-white/70">
                                                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                Modern UI/UX with smooth animations
                                            </li>
                                            <li className="flex items-start gap-3 text-white/70">
                                                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                Optimized performance and SEO
                                            </li>
                                            <li className="flex items-start gap-3 text-white/70">
                                                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                Cross-browser compatibility
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">
                                            Technical Details
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Category:</span>
                                                <span className="text-accent font-medium capitalize">{project.category}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Status:</span>
                                                <span className="text-green-400 font-medium">Completed</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/70">Technologies:</span>
                                                <span className="text-white font-medium">{project.technologies.length} used</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-bold text-white mb-4">Related Projects</h2>
                                <p className="text-white/70">
                                    Other projects in the {project.category} category
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map((relatedProject, index) => (
                                    <motion.div
                                        key={relatedProject.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-tertiary rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                        onClick={() => router.push(`/project/${relatedProject.id}`)}
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-hover/20">
                                            {relatedProject.image && relatedProject.image !== "/api/placeholder/400/250" ? (
                                                <img
                                                    src={relatedProject.image}
                                                    alt={relatedProject.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Eye size={32} className="text-accent/30" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                                {relatedProject.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {relatedProject.technologies.slice(0, 3).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 py-1 bg-primary rounded text-xs text-accent"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {relatedProject.technologies.length > 3 && (
                                                    <span className="px-2 py-1 bg-primary rounded text-xs text-white/50">
                                                        +{relatedProject.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetailPage;