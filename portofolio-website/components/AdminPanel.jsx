"use client";

import { useState, useEffect } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { useAuth } from '@/context/AuthContext';
import {
    Settings, Plus, X, Edit, Trash, Save, RefreshCw, Star, Copy,
    ExternalLink, Github, Eye, EyeOff
} from 'lucide-react';

const AdminPanel = () => {
    const {
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        duplicateProject,
        toggleFeatured
    } = useProjects();
    const { isAuthenticated } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        category: 'frontend',
        liveUrl: '',
        githubUrl: '',
        featured: false
    });

    // Check admin panel state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('admin-panel-open');
        if (savedState) {
            setIsOpen(savedState === 'true');
        }
    }, []);

    // Save admin panel state
    useEffect(() => {
        localStorage.setItem('admin-panel-open', isOpen.toString());
    }, [isOpen]);

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            technologies: '',
            category: 'frontend',
            liveUrl: '',
            githubUrl: '',
            featured: false
        });
        setEditingProject(null);
        setShowForm(false);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingProject) {
            updateProject(editingProject.id, formData);
            showNotification(`Project "${formData.title}" updated successfully!`);
        } else {
            addProject(formData);
            showNotification(`Project "${formData.title}" added successfully!`);
        }

        resetForm();
    };

    // Handle edit
    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image || '',
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : project.technologies,
            category: project.category,
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            featured: project.featured || false
        });
        setEditingProject(project);
        setShowForm(true);
    };

    // Handle delete with confirmation
    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteProject(id);
            showNotification(`Project "${title}" deleted successfully!`, 'error');
        }
    };

    // Handle duplicate
    const handleDuplicate = (id, title) => {
        duplicateProject(id);
        showNotification(`Project "${title}" duplicated successfully!`);
    };

    // Handle toggle featured
    const handleToggleFeatured = (id, title, featured) => {
        toggleFeatured(id);
        showNotification(
            `Project "${title}" ${!featured ? 'added to' : 'removed from'} featured!`
        );
    };

    // Handle reset to defaults
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all projects to default? This action cannot be undone.')) {
            resetProjects();
            showNotification('All projects have been reset to default!', 'error');
        }
    };

    // Only show admin panel if user is authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-24 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                    {notification.message}
                </div>
            )}

            {/* Admin Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:bg-accent-hover'
                    } text-white flex items-center justify-center`}
                title={isOpen ? 'Close Admin Panel' : 'Open Admin Panel'}
            >
                {isOpen ? <EyeOff size={20} /> : <Settings size={20} />}
            </button>

            {/* Admin Panel */}
            {isOpen && (
                <div className="fixed inset-0 z-40 flex">
                    {/* Backdrop */}
                    <div
                        className="bg-black/50 absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 bg-primary shadow-xl overflow-y-auto">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Settings size={20} className="text-accent" />
                                    Projects Admin
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(!showForm);
                                    }}
                                    className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium"
                                >
                                    <Plus size={16} />
                                    Add Project
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="py-2.5 px-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    title="Reset to default projects"
                                >
                                    <RefreshCw size={16} />
                                </button>
                            </div>

                            {/* Add/Edit Form */}
                            {showForm && (
                                <div className="bg-secondary rounded-xl p-5 mb-6 border border-tertiary">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-white">
                                            {editingProject ? 'Edit Project' : 'Add New Project'}
                                        </h3>
                                        <button
                                            onClick={resetForm}
                                            className="text-white/70 hover:text-white transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Project Title *
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Description *
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Image URL
                                            </label>
                                            <input
                                                type="text"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Technologies * <span className="text-xs text-white/60">(comma separated)</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="technologies"
                                                value={formData.technologies}
                                                onChange={handleInputChange}
                                                placeholder="React, Node.js, MongoDB"
                                                className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                            >
                                                <option value="frontend">Frontend</option>
                                                <option value="backend">Backend</option>
                                                <option value="fullstack">Full Stack</option>
                                                <option value="mobile">Mobile</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white/80 mb-2">
                                                    Live URL
                                                </label>
                                                <input
                                                    type="text"
                                                    name="liveUrl"
                                                    value={formData.liveUrl}
                                                    onChange={handleInputChange}
                                                    placeholder="https://..."
                                                    className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-white/80 mb-2">
                                                    GitHub URL
                                                </label>
                                                <input
                                                    type="text"
                                                    name="githubUrl"
                                                    value={formData.githubUrl}
                                                    onChange={handleInputChange}
                                                    placeholder="https://github.com/..."
                                                    className="w-full px-3 py-2 bg-tertiary border border-tertiary-hover text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-accent rounded border-tertiary-hover focus:ring-accent bg-tertiary"
                                            />
                                            <label htmlFor="featured" className="ml-2 text-sm font-medium text-white">
                                                Featured Project
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                                        >
                                            <Save size={16} />
                                            {editingProject ? 'Update Project' : 'Save Project'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Projects List */}
                            <div>
                                <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
                                    Manage Projects ({projects.length})
                                </h3>

                                {projects.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                            <Eye size={24} className="text-accent/50" />
                                        </div>
                                        <p className="text-white/50">No projects found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {projects.map(project => (
                                            <div key={project.id} className="bg-secondary border border-tertiary p-4 rounded-xl">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-white font-semibold truncate">{project.title}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-white/60 bg-tertiary px-2 py-1 rounded-full">
                                                                {project.category}
                                                            </span>
                                                            {project.featured && (
                                                                <span className="text-xs text-accent bg-accent/20 px-2 py-1 rounded-full flex items-center gap-1">
                                                                    <Star size={10} />
                                                                    Featured
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex space-x-1">
                                                        {project.liveUrl && project.liveUrl !== '#' && (
                                                            <a
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors"
                                                                title="View Live"
                                                            >
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                        {project.githubUrl && project.githubUrl !== '#' && (
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1.5 text-white/70 hover:bg-white/10 rounded-md transition-colors"
                                                                title="View Code"
                                                            >
                                                                <Github size={14} />
                                                            </a>
                                                        )}
                                                    </div>

                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() => handleToggleFeatured(project.id, project.title, project.featured)}
                                                            className={`p-1.5 rounded-md transition-colors ${project.featured
                                                                ? 'text-yellow-400 hover:bg-yellow-500/20'
                                                                : 'text-white/40 hover:bg-white/10'
                                                                }`}
                                                            title={project.featured ? 'Remove from featured' : 'Add to featured'}
                                                        >
                                                            <Star size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDuplicate(project.id, project.title)}
                                                            className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded-md transition-colors"
                                                            title="Duplicate project"
                                                        >
                                                            <Copy size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(project)}
                                                            className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors"
                                                            title="Edit project"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(project.id, project.title)}
                                                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
                                                            title="Delete project"
                                                        >
                                                            <Trash size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPanel;