"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectsContext";
import { ExternalLink, Github, Eye, ArrowRight } from "lucide-react";

const Projects = () => {
    const [filter, setFilter] = useState("all");
    const { projects, loading } = useProjects();
    const router = useRouter();

    const filters = [
        { key: "all", label: "All Projects" },
        { key: "highlight", label: "Highlights" },
        { key: "deep-learning", label: "Deep Learning" },
        { key: "nlp", label: "NLP" },
        { key: "data-science", label: "Data Science" },
        { key: "data-engineering", label: "Data Engineering" },
    ];

    const filteredProjects = projects.filter(project => {
        if (filter === "all") return true;
        if (filter === "highlight") return project.highlight;
        return project.category === filter;
    });

    if (loading) {
        return (
            <section id="projects" className="py-20 bg-secondary relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto"></div>
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
                        Machine learning and data science projects showcasing end-to-end ML pipelines,
                        from data exploration to model deployment
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filterOption) => (
                        <button
                            key={filterOption.key}
                            onClick={() => setFilter(filterOption.key)}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm ${filter === filterOption.key
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
                            No projects found in this category.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-tertiary rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                                onClick={() => router.push(`/project/${project.id}`)}
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-gradient-to-br from-accent/20 to-purple-700/20 overflow-hidden">
                                    {project.image && project.image !== "/api/placeholder/400/250" ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl text-accent/30">
                                            <Eye />
                                        </div>
                                    )}

                                    {project.featured && (
                                        <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-semibold">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 4).map((tech, index) => (
                                            <span key={index} className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent">
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
                                        <span className="text-xs text-white/50 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <div className="flex items-center gap-2 text-accent text-sm font-medium">
                                            View Details <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-16 space-y-6">
                    <button
                        onClick={() => router.push('/projects')}
                        className="bg-accent hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-105"
                    >
                        <Eye size={20} />
                        View All Projects
                        <ArrowRight size={20} />
                    </button>

                    <div>
                        <p className="text-white/70 mb-4">
                            Interested in collaborating on a data science project?
                        </p>
                        <button
                            onClick={() => {
                                const contactSection = document.querySelector("#contact");
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="btn btn-sm btn-tertiary"
                        >
                            Get In Touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
