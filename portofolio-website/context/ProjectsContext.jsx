"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

// Default projects data
const defaultProjects = [
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

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from localStorage on mount
  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = localStorage.getItem('portfolio-projects');
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects));
        } else {
          setProjects(defaultProjects);
          localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (!loading && projects.length >= 0) {
      localStorage.setItem('portfolio-projects', JSON.stringify(projects));
    }
  }, [projects, loading]);

  // CRUD Operations
  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
      technologies: Array.isArray(projectData.technologies) 
        ? projectData.technologies 
        : projectData.technologies.split(',').map(tech => tech.trim()),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, projectData) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { 
            ...project, 
            ...projectData,
            technologies: Array.isArray(projectData.technologies) 
              ? projectData.technologies 
              : projectData.technologies.split(',').map(tech => tech.trim())
          }
        : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProject = (id) => {
    return projects.find(project => project.id === id);
  };

  const resetProjects = () => {
    setProjects(defaultProjects);
    localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
  };

  const duplicateProject = (id) => {
    const project = getProject(id);
    if (project) {
      const duplicatedProject = {
        ...project,
        id: Date.now(),
        title: `${project.title} (Copy)`,
      };
      setProjects(prev => [...prev, duplicatedProject]);
      return duplicatedProject;
    }
  };

  const toggleFeatured = (id) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, featured: !project.featured }
        : project
    ));
  };

  const value = {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    resetProjects,
    duplicateProject,
    toggleFeatured,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};