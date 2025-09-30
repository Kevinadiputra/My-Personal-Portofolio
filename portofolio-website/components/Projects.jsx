"use client";

import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, payment integration, and admin dashboard.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts and interactive charts.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Chart.js", "Weather API", "CSS3"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "REST API Service",
      description: "A robust REST API with authentication, rate limiting, and comprehensive documentation.",
      image: "/api/placeholder/400/250",
      technologies: ["Node.js", "Express", "JWT", "Swagger", "Docker"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A responsive portfolio website with modern design and smooth animations.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Blog CMS",
      description: "A content management system for bloggers with rich text editor and SEO optimization.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MySQL", "TinyMCE"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "fullstack", label: "Full Stack" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    return project.category === filter;
  });

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
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? "bg-accent text-white shadow-lg"
                  : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-tertiary rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent-hover/20 overflow-hidden">
                {/* Placeholder for project image */}
                <div className="w-full h-full flex items-center justify-center text-6xl text-accent/30">
                  <Eye />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white hover:bg-white/90 text-primary rounded-full flex items-center justify-center transition-colors"
                  >
                    <Github size={20} />
                  </a>
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
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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