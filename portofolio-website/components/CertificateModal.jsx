"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, ExternalLink, Star, Tag, Sparkles } from 'lucide-react';

const CertificateModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    certificate, 
    mode = 'add' // 'add', 'edit', 'view'
}) => {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        platform: '',
        dateIssued: '',
        verifyUrl: '',
        level: 'beginner',
        skills: [],
        featured: false,
        badge: '',
        description: ''
    });

    const [newSkill, setNewSkill] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (certificate && mode !== 'add') {
            setFormData({
                title: certificate.title || '',
                issuer: certificate.issuer || '',
                platform: certificate.platform || '',
                dateIssued: certificate.dateIssued || '',
                verifyUrl: certificate.verifyUrl || '',
                level: certificate.level || 'beginner',
                skills: certificate.skills || [],
                featured: certificate.featured || false,
                badge: certificate.badge || '',
                description: certificate.description || ''
            });
        } else {
            setFormData({
                title: '',
                issuer: '',
                platform: '',
                dateIssued: '',
                verifyUrl: '',
                level: 'beginner',
                skills: [],
                featured: false,
                badge: '',
                description: ''
            });
        }
        setErrors({});
        setNewSkill('');
    }, [certificate, mode, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.name === 'newSkill') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Certificate title is required';
        }
        
        if (!formData.issuer.trim()) {
            newErrors.issuer = 'Issuer is required';
        }
        
        if (!formData.platform.trim()) {
            newErrors.platform = 'Platform is required';
        }
        
        if (!formData.dateIssued) {
            newErrors.dateIssued = 'Date issued is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const certificateData = {
            ...formData,
            id: certificate?.id || Date.now().toString(),
            skills: formData.skills.filter(skill => skill.trim())
        };

        onSave(certificateData);
        onClose();
    };

    const levelOptions = [
        { value: 'beginner', label: 'Beginner', color: 'text-green-400' },
        { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-400' },
        { value: 'advanced', label: 'Advanced', color: 'text-orange-400' },
        { value: 'expert', label: 'Expert', color: 'text-red-400' },
        { value: 'professional', label: 'Professional', color: 'text-purple-400' }
    ];

    if (!isOpen) return null;

    const isViewMode = mode === 'view';
    const modalTitle = mode === 'add' ? 'Add New Certificate' : 
                     mode === 'edit' ? 'Edit Certificate' : 'Certificate Details';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-tertiary border border-tertiary-hover rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-tertiary-hover">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                                <Award className="text-accent" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{modalTitle}</h2>
                                <p className="text-white/60 text-sm">
                                    {isViewMode ? 'Certificate information' : 'Fill in the certificate details'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                            <X className="text-white/60" size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Award size={20} className="text-accent" />
                                Basic Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Certificate Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                                            errors.title ? 'border-red-500' : 'border-tertiary-hover focus:border-accent'
                                        } ${isViewMode ? 'cursor-not-allowed opacity-60' : ''}`}
                                        placeholder="e.g., React Developer Certification"
                                    />
                                    {errors.title && (
                                        <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Issuer *
                                    </label>
                                    <input
                                        type="text"
                                        name="issuer"
                                        value={formData.issuer}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                                            errors.issuer ? 'border-red-500' : 'border-tertiary-hover focus:border-accent'
                                        } ${isViewMode ? 'cursor-not-allowed opacity-60' : ''}`}
                                        placeholder="e.g., Meta, Google, Microsoft"
                                    />
                                    {errors.issuer && (
                                        <p className="text-red-400 text-sm mt-1">{errors.issuer}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Platform *
                                    </label>
                                    <input
                                        type="text"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                                            errors.platform ? 'border-red-500' : 'border-tertiary-hover focus:border-accent'
                                        } ${isViewMode ? 'cursor-not-allowed opacity-60' : ''}`}
                                        placeholder="e.g., Coursera, Udemy"
                                    />
                                    {errors.platform && (
                                        <p className="text-red-400 text-sm mt-1">{errors.platform}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Level
                                    </label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                                            isViewMode ? 'cursor-not-allowed opacity-60' : ''
                                        }`}
                                    >
                                        {levelOptions.map(option => (
                                            <option key={option.value} value={option.value} className="bg-tertiary">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Date Issued *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateIssued"
                                        value={formData.dateIssued}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                                            errors.dateIssued ? 'border-red-500' : 'border-tertiary-hover focus:border-accent'
                                        } ${isViewMode ? 'cursor-not-allowed opacity-60' : ''}`}
                                    />
                                    {errors.dateIssued && (
                                        <p className="text-red-400 text-sm mt-1">{errors.dateIssued}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* URLs and Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <ExternalLink size={20} className="text-accent" />
                                Links & Verification
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Verification URL
                                    </label>
                                    <input
                                        type="url"
                                        name="verifyUrl"
                                        value={formData.verifyUrl}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                                            isViewMode ? 'cursor-not-allowed opacity-60' : ''
                                        }`}
                                        placeholder="https://verify.example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Badge Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="badge"
                                        value={formData.badge}
                                        onChange={handleInputChange}
                                        disabled={isViewMode}
                                        className={`w-full px-4 py-3 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                                            isViewMode ? 'cursor-not-allowed opacity-60' : ''
                                        }`}
                                        placeholder="https://images.example.com/badge.png"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Tag size={20} className="text-accent" />
                                Skills Covered
                            </h3>
                            
                            {!isViewMode && (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="newSkill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 px-4 py-2 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                                        placeholder="Add a skill (e.g., React, JavaScript)"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30"
                                    >
                                        {skill}
                                        {!isViewMode && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="hover:text-red-400 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </span>
                                ))}
                                
                                {formData.skills.length === 0 && (
                                    <p className="text-white/50 text-sm">No skills added yet</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Sparkles size={20} className="text-accent" />
                                Description
                            </h3>
                            
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                disabled={isViewMode}
                                rows={3}
                                className={`w-full px-4 py-3 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none ${
                                    isViewMode ? 'cursor-not-allowed opacity-60' : ''
                                }`}
                                placeholder="Brief description about what this certificate covers..."
                            />
                        </div>

                        {/* Options */}
                        {!isViewMode && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Star size={20} className="text-accent" />
                                    Options
                                </h3>
                                
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-accent bg-tertiary-hover border-tertiary-hover rounded focus:ring-accent focus:ring-2"
                                    />
                                    <span className="text-white">Mark as featured certificate</span>
                                </label>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-tertiary-hover">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-white/80 hover:text-white hover:bg-tertiary-hover rounded-lg transition-colors"
                            >
                                {isViewMode ? 'Close' : 'Cancel'}
                            </button>
                            
                            {!isViewMode && (
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors"
                                >
                                    {mode === 'add' ? 'Add Certificate' : 'Save Changes'}
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificateModal;