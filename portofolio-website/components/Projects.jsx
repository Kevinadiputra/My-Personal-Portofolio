"use client";

import { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects = () => {
    const [filter, setFilter] = useState("all");
    const { projects, loading } = useProjects();

    const filters = [
        { key: "all", label: "All Projects" },
        { key: "featured", label: "Featured" },
        { key: "fullstack", label: "Full Stack" },
        { key: "frontend", label: "Frontend" },
        { key: "backend", label: "Backend" },
        { key: "mobile", label: "Mobile" },
    ];

    const filteredProjects = projects.filter(project => {
        if (filter === "all") return true;
        if (filter === "featured") return project.featured;
        return project.category === filter;
    });

    if (loading) {
        return (
            <section id="projects" className="py-20 bg-secondary relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
                        <p className="text-white/70 mt-4">Loading projects...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 bg-secondary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="h2 text-white mb-4">My Projects</h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on, showcasing different technologies and approaches
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filterOption) => (
                        <button
                            key={filterOption.key}
                            onClick={() => setFilter(filterOption.key)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === filterOption.key
                                ? "bg-accent text-white shadow-lg"
                                : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white"
                                }`}
                        >
                            {filterOption.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-tertiary flex items-center justify-center">
                            <Eye size={32} className="text-accent/50" />
                        </div>
                        <h3 className="text-xl text-white mb-2">No Projects Found</h3>
                        <p className="text-white/70">
                            {filter === "all"
                                ? "No projects available yet."
                                : `No projects found in the "${filter}" category.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-tertiary rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent-hover/20 overflow-hidden">
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

                                    {/* Fallback placeholder */}
                                    <div className={`w-full h-full flex items-center justify-center text-6xl text-accent/30 ${project.image && project.image !== "/api/placeholder/400/250" ? 'hidden' : 'flex'}`}>
                                        <Eye />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                        {project.githubUrl && project.githubUrl !== "#" && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-white hover:bg-white/90 text-primary rounded-full flex items-center justify-center transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-semibold">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Links */}
                                    <div className="flex justify-between items-center pt-4 border-t border-primary">
                                        <span className="text-xs text-white/50 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <div className="flex space-x-3">
                                            {project.liveUrl && project.liveUrl !== "#" && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:text-accent-hover transition-colors"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                            {project.githubUrl && project.githubUrl !== "#" && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/70 hover:text-white transition-colors"
                                                >
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

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-white/70 mb-6">
                        Want to see more projects or discuss a collaboration?
                    </p>
                    <button
                        onClick={() => {
                            const contactSection = document.querySelector("#contact");
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="btn btn-sm btn-accent"
                    >
                        Get In Touch
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;