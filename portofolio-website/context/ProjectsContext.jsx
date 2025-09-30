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
        description: "A comprehensive e-commerce solution featuring modern design, secure payment processing, real-time inventory management, and an intuitive admin dashboard. Built with scalability and performance in mind, this platform handles thousands of concurrent users and integrates with multiple payment gateways.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Redux", "Express.js", "JWT"],
        category: "fullstack",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        details: {
            duration: "3 months",
            status: "Completed",
            features: [
                "User authentication and authorization",
                "Product catalog with search and filtering",
                "Shopping cart and checkout process",
                "Payment integration with Stripe",
                "Admin dashboard for inventory management",
                "Order tracking and management",
                "Responsive design for all devices",
                "Email notifications and confirmations"
            ]
        }
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A modern collaborative task management application designed for teams. Features real-time synchronization, drag-and-drop interface, project timelines, and advanced reporting. Perfect for agile teams and project managers who need to track progress and maintain productivity.",
        image: "/api/placeholder/400/250",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Prisma", "Tailwind CSS", "Zustand"],
        category: "fullstack",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        details: {
            duration: "2 months",
            status: "Completed",
            features: [
                "Real-time task updates and notifications",
                "Drag-and-drop kanban board interface",
                "Team collaboration and comments",
                "Project timelines and milestones",
                "Advanced filtering and search",
                "Time tracking and reporting",
                "File attachments and document sharing",
                "Mobile-responsive design"
            ]
        }
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