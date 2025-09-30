"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Edit3, 
    Trash2, 
    Copy, 
    Star, 
    StarOff, 
    Eye, 
    ExternalLink, 
    Github,
    Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProjectContextMenu = ({ 
    project, 
    position, 
    isVisible, 
    onClose, 
    onEdit, 
    onDelete, 
    onDuplicate, 
    onToggleFeatured, 
    onView 
}) => {
    const { isAuthenticated } = useAuth();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleScroll = () => {
            onClose();
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [isVisible, onClose]);

    const handleAction = (action) => {
        action();
        onClose();
    };

    const menuItems = [
        {
            icon: Eye,
            label: 'View Details',
            action: () => handleAction(() => onView(project)),
            color: 'text-white',
            show: true
        },
        {
            icon: project?.featured ? StarOff : Star,
            label: project?.featured ? 'Remove from Featured' : 'Mark as Featured',
            action: () => handleAction(() => onToggleFeatured(project.id)),
            color: project?.featured ? 'text-yellow-400' : 'text-gray-400',
            show: isAuthenticated
        },
        {
            type: 'separator',
            show: isAuthenticated
        },
        {
            icon: Edit3,
            label: 'Edit Project',
            action: () => handleAction(() => onEdit(project)),
            color: 'text-blue-400',
            show: isAuthenticated
        },
        {
            icon: Copy,
            label: 'Duplicate Project',
            action: () => handleAction(() => onDuplicate(project.id)),
            color: 'text-green-400',
            show: isAuthenticated
        },
        {
            type: 'separator',
            show: isAuthenticated
        },
        {
            icon: ExternalLink,
            label: 'Open Live Site',
            action: () => handleAction(() => {
                if (project?.liveUrl && project.liveUrl !== '#') {
                    window.open(project.liveUrl, '_blank');
                }
            }),
            color: 'text-white',
            show: project?.liveUrl && project.liveUrl !== '#'
        },
        {
            icon: Github,
            label: 'View on GitHub',
            action: () => handleAction(() => {
                if (project?.githubUrl && project.githubUrl !== '#') {
                    window.open(project.githubUrl, '_blank');
                }
            }),
            color: 'text-white',
            show: project?.githubUrl && project.githubUrl !== '#'
        },
        {
            type: 'separator',
            show: isAuthenticated && (project?.liveUrl !== '#' || project?.githubUrl !== '#')
        },
        {
            icon: Info,
            label: 'Project Info',
            action: () => handleAction(() => {
                alert(`Project: ${project?.title}\nCategory: ${project?.category}\nTechnologies: ${project?.technologies?.join(', ')}`);
            }),
            color: 'text-gray-400',
            show: true
        },
        {
            type: 'separator',
            show: isAuthenticated
        },
        {
            icon: Trash2,
            label: 'Delete Project',
            action: () => handleAction(() => {
                if (confirm(`Are you sure you want to delete "${project?.title}"?`)) {
                    onDelete(project.id);
                }
            }),
            color: 'text-red-400',
            show: isAuthenticated
        }
    ];

    const visibleItems = menuItems.filter(item => item.show);

    if (!isVisible || !project) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] bg-tertiary border border-tertiary-hover rounded-xl shadow-2xl py-2 min-w-[200px] backdrop-blur-xl"
                style={{
                    left: Math.min(position.x, window.innerWidth - 220),
                    top: Math.min(position.y, window.innerHeight - (visibleItems.length * 40 + 20))
                }}
            >
                {/* Header */}
                <div className="px-4 py-2 border-b border-tertiary-hover">
                    <p className="text-sm font-medium text-white truncate">
                        {project.title}
                    </p>
                    <p className="text-xs text-white/60 capitalize">
                        {project.category} Project
                    </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                    {visibleItems.map((item, index) => {
                        if (item.type === 'separator') {
                            return (
                                <div 
                                    key={`separator-${index}`} 
                                    className="h-px bg-tertiary-hover mx-2 my-1" 
                                />
                            );
                        }

                        const IconComponent = item.icon;
                        return (
                            <motion.button
                                key={index}
                                onClick={item.action}
                                className="w-full px-4 py-2 text-left hover:bg-primary/50 transition-colors flex items-center gap-3 text-sm"
                                whileHover={{ backgroundColor: 'rgba(88, 16, 255, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <IconComponent size={16} className={item.color} />
                                <span className="text-white">{item.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Footer */}
                {!isAuthenticated && (
                    <div className="px-4 py-2 border-t border-tertiary-hover">
                        <p className="text-xs text-white/50">
                            Login as admin for edit options
                        </p>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectContextMenu;