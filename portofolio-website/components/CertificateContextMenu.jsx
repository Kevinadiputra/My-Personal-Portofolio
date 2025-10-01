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
    CheckCircle,
    Info,
    Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CertificateContextMenu = ({
    certificate,
    position,
    isVisible,
    onClose,
    onEdit,
    onDelete,
    onDuplicate,
    onToggleFeatured,
    onView,
    onVerify
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
            action: () => handleAction(() => onView && onView(certificate)),
            color: 'text-white',
            show: true
        },
        {
            icon: certificate?.featured ? StarOff : Star,
            label: certificate?.featured ? 'Remove from Featured' : 'Mark as Featured',
            action: () => handleAction(() => onToggleFeatured && onToggleFeatured(certificate.id)),
            color: certificate?.featured ? 'text-yellow-400' : 'text-gray-400',
            show: isAuthenticated
        },
        {
            type: 'separator',
            show: isAuthenticated
        },
        {
            icon: Edit3,
            label: 'Edit Certificate',
            action: () => handleAction(() => onEdit && onEdit(certificate)),
            color: 'text-blue-400',
            show: isAuthenticated
        },
        {
            icon: Copy,
            label: 'Duplicate Certificate',
            action: () => handleAction(() => onDuplicate && onDuplicate(certificate.id)),
            color: 'text-green-400',
            show: isAuthenticated
        },
        {
            type: 'separator',
            show: isAuthenticated
        },
        {
            icon: CheckCircle,
            label: 'Verify Certificate',
            action: () => handleAction(() => {
                if (certificate?.verifyUrl && certificate.verifyUrl !== '#') {
                    window.open(certificate.verifyUrl, '_blank');
                } else if (onVerify) {
                    onVerify(certificate);
                }
            }),
            color: 'text-green-400',
            show: certificate?.verifyUrl && certificate.verifyUrl !== '#'
        },
        {
            icon: ExternalLink,
            label: 'View on Platform',
            action: () => handleAction(() => {
                if (certificate?.verifyUrl && certificate.verifyUrl !== '#') {
                    window.open(certificate.verifyUrl, '_blank');
                }
            }),
            color: 'text-white',
            show: certificate?.verifyUrl && certificate.verifyUrl !== '#'
        },
        {
            type: 'separator',
            show: isAuthenticated && certificate?.verifyUrl !== '#'
        },
        {
            icon: Info,
            label: 'Certificate Info',
            action: () => handleAction(() => {
                const skillsList = certificate?.skills?.join(', ') || 'No skills listed';
                alert(`Certificate: ${certificate?.title}\nIssuer: ${certificate?.issuer}\nPlatform: ${certificate?.platform}\nLevel: ${certificate?.level}\nSkills: ${skillsList}`);
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
            label: 'Delete Certificate',
            action: () => handleAction(() => {
                if (confirm(`Are you sure you want to delete "${certificate?.title}"?`)) {
                    onDelete && onDelete(certificate.id);
                }
            }),
            color: 'text-red-400',
            show: isAuthenticated
        }
    ];

    const visibleItems = menuItems.filter(item => item.show);

    if (!isVisible || !certificate) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[9999] bg-tertiary border border-tertiary-hover rounded-xl shadow-2xl py-2 min-w-[220px] backdrop-blur-xl"
                style={{
                    left: Math.min(position.x, window.innerWidth - 240),
                    top: Math.min(position.y, window.innerHeight - (visibleItems.length * 40 + 80))
                }}
            >
                {/* Header */}
                <div className="px-4 py-2 border-b border-tertiary-hover">
                    <div className="flex items-center gap-2 mb-1">
                        <Award size={16} className="text-accent" />
                        <p className="text-sm font-medium text-white truncate">
                            {certificate.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <span className="font-medium">{certificate.issuer}</span>
                        <span>•</span>
                        <span className="capitalize">{certificate.level}</span>
                    </div>
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

export default CertificateContextMenu;