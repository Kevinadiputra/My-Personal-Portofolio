"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { projectService } from '@/lib/supabase';

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
    const [error, setError] = useState(null);

    // Load projects from Supabase on mount
    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getAllProjects();

            if (data && data.length > 0) {
                // Transform Supabase data to match expected format
                const transformedData = data.map(project => ({
                    ...project,
                    technologies: Array.isArray(project.technologies)
                        ? project.technologies
                        : (project.technologies || '').split(',').map(t => t.trim()).filter(Boolean)
                }));
                setProjects(transformedData);
            } else {
                // If no data in Supabase, use default projects
                console.log('No projects found in Supabase, using defaults');
                setProjects(defaultProjects);
            }
        } catch (err) {
            console.error('Error loading projects from Supabase:', err);
            setError(err.message);

            // Fallback to localStorage if Supabase fails
            try {
                const storedProjects = localStorage.getItem('portfolio-projects');
                if (storedProjects) {
                    setProjects(JSON.parse(storedProjects));
                } else {
                    setProjects(defaultProjects);
                }
            } catch (localError) {
                console.error('Error loading from localStorage:', localError);
                setProjects(defaultProjects);
            }
        } finally {
            setLoading(false);
        }
    };

    // CRUD Operations with Supabase
    const addProject = async (projectData) => {
        try {
            const newProject = {
                ...projectData,
                technologies: Array.isArray(projectData.technologies)
                    ? projectData.technologies
                    : projectData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
                category: projectData.category || 'web',
                featured: projectData.featured || false
            };

            const savedProject = await projectService.addProject(newProject);
            setProjects(prev => [savedProject, ...prev]);

            // Also save to localStorage as backup
            localStorage.setItem('portfolio-projects', JSON.stringify([savedProject, ...projects]));

            return savedProject;
        } catch (err) {
            console.error('Error adding project:', err);
            setError(err.message);
            throw err;
        }
    };

    const updateProject = async (id, projectData) => {
        try {
            const updatedData = {
                ...projectData,
                technologies: Array.isArray(projectData.technologies)
                    ? projectData.technologies
                    : projectData.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
            };

            const updatedProject = await projectService.updateProject(id, updatedData);
            setProjects(prev => prev.map(project =>
                project.id === id ? updatedProject : project
            ));

            // Update localStorage backup
            const updatedProjects = projects.map(p => p.id === id ? updatedProject : p);
            localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));

            return updatedProject;
        } catch (err) {
            console.error('Error updating project:', err);
            setError(err.message);
            throw err;
        }
    };

    const deleteProject = async (id) => {
        try {
            await projectService.deleteProject(id);
            setProjects(prev => prev.filter(project => project.id !== id));

            // Update localStorage backup
            const remainingProjects = projects.filter(p => p.id !== id);
            localStorage.setItem('portfolio-projects', JSON.stringify(remainingProjects));
        } catch (err) {
            console.error('Error deleting project:', err);
            setError(err.message);
            throw err;
        }
    };

    const getProject = (id) => {
        return projects.find(project => project.id === id);
    };

    const resetProjects = () => {
        setProjects(defaultProjects);
        localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
    };

    const duplicateProject = async (id) => {
        try {
            const project = getProject(id);
            if (project) {
                const duplicatedProject = {
                    ...project,
                    id: undefined, // Let Supabase generate new ID
                    title: `${project.title} (Copy)`,
                };
                return await addProject(duplicatedProject);
            }
        } catch (err) {
            console.error('Error duplicating project:', err);
            setError(err.message);
            throw err;
        }
    };

    const toggleFeatured = async (id) => {
        try {
            const project = getProject(id);
            if (project) {
                await updateProject(id, { featured: !project.featured });
            }
        } catch (err) {
            console.error('Error toggling featured:', err);
            setError(err.message);
            throw err;
        }
    };

    // Upload project image
    const uploadProjectImage = async (file) => {
        try {
            const imageUrl = await projectService.uploadProjectImage(file);
            return imageUrl;
        } catch (err) {
            console.error('Error uploading image:', err);
            setError(err.message);
            throw err;
        }
    };

    const value = {
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        resetProjects,
        duplicateProject,
        toggleFeatured,
        uploadProjectImage,
        refresh: loadProjects,
    };

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};