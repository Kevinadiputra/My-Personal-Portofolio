"use client";

import { useState, useEffect, useRef } from 'react';
import { Edit, Trash, Copy, Star, ExternalLink, Github, Eye } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, options }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleScroll = () => {
            onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll, true);
        document.addEventListener('contextmenu', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('contextmenu', handleClickOutside);
        };
    }, [onClose]);

    // Adjust position if menu goes off screen
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (rect.right > windowWidth) {
                menuRef.current.style.left = `${windowWidth - rect.width - 10}px`;
            }
            if (rect.bottom > windowHeight) {
                menuRef.current.style.top = `${windowHeight - rect.height - 10}px`;
            }
        }
    }, [x, y]);

    const getIcon = (type) => {
        switch (type) {
            case 'view': return <Eye size={14} />;
            case 'edit': return <Edit size={14} />;
            case 'delete': return <Trash size={14} />;
            case 'duplicate': return <Copy size={14} />;
            case 'star': return <Star size={14} />;
            case 'live': return <ExternalLink size={14} />;
            case 'github': return <Github size={14} />;
            default: return null;
        }
    };

    const getColorClass = (type) => {
        switch (type) {
            case 'view': return 'hover:bg-blue-500/20 text-blue-400';
            case 'edit': return 'hover:bg-green-500/20 text-green-400';
            case 'delete': return 'hover:bg-red-500/20 text-red-400';
            case 'duplicate': return 'hover:bg-cyan-500/20 text-cyan-400';
            case 'star': return 'hover:bg-yellow-500/20 text-yellow-400';
            case 'live': return 'hover:bg-purple-500/20 text-purple-400';
            case 'github': return 'hover:bg-gray-500/20 text-gray-400';
            default: return 'hover:bg-white/10 text-white';
        }
    };

    return (
        <div
            ref={menuRef}
            className="fixed z-[9999] min-w-[180px] bg-secondary border border-tertiary rounded-lg shadow-2xl py-2 backdrop-blur-xl"
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            {options.map((option, index) => (
                <div key={index}>
                    {option.divider ? (
                        <div className="my-1 border-t border-tertiary" />
                    ) : (
                        <button
                            onClick={() => {
                                option.onClick();
                                onClose();
                            }}
                            disabled={option.disabled}
                            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${option.disabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : getColorClass(option.type)
                                }`}
                        >
                            {getIcon(option.type)}
                            <span className="flex-1">{option.label}</span>
                            {option.shortcut && (
                                <span className="text-xs text-white/40">{option.shortcut}</span>
                            )}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ContextMenu;
