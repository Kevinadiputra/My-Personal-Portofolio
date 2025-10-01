"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera,
    Upload,
    X,
    User,
    Save,
    RotateCcw,
    Crop,
    Edit3,
    Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProfilePictureManager = ({
    isOpen,
    onClose,
    currentImage = '/api/placeholder/400/400',
    onSave
}) => {
    const { isAuthenticated } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(currentImage);
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    if (!isAuthenticated) return null;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = () => {
        if (imageUrl.trim()) {
            setPreviewUrl(imageUrl.trim());
            setSelectedImage(null);
        }
    };

    const handleSave = async () => {
        setIsUploading(true);
        try {
            // In a real app, you would upload the file to a server
            // For now, we'll just save the preview URL
            if (onSave) {
                await onSave(previewUrl);
            }

            // Save to localStorage for persistence
            localStorage.setItem('profile_picture', previewUrl);

            onClose();
        } catch (error) {
            console.error('Error saving profile picture:', error);
            alert('Error saving profile picture');
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setPreviewUrl(currentImage);
        setImageUrl('');
    };

    if (!isOpen) return null;

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
                    className="bg-tertiary border border-tertiary-hover rounded-2xl w-full max-w-md overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-tertiary-hover">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                                <Camera className="text-accent" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Profile Picture</h2>
                                <p className="text-white/60 text-sm">Update your profile photo</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                            <X className="text-white/60" size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Current Preview */}
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent/30 bg-tertiary-hover">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="text-white/40" size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full border-2 border-tertiary flex items-center justify-center">
                                    <Edit3 className="text-white" size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Upload Options */}
                        <div className="space-y-4">
                            {/* File Upload */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Upload from Device
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full p-4 border-2 border-dashed border-accent/30 rounded-lg hover:border-accent/50 transition-colors group spark-on-click"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="text-accent group-hover:scale-110 transition-transform" size={24} />
                                        <span className="text-white/70 text-sm">
                                            Click to browse files
                                        </span>
                                        <span className="text-white/50 text-xs">
                                            PNG, JPG, GIF up to 5MB
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {/* URL Input */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Or paste image URL
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-2 bg-tertiary-hover border border-tertiary-hover rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                                    />
                                    <button
                                        onClick={handleUrlSubmit}
                                        disabled={!imageUrl.trim()}
                                        className="px-4 py-2 bg-accent hover:bg-accent/80 disabled:bg-accent/30 disabled:cursor-not-allowed text-white rounded-lg transition-colors spark-on-click"
                                    >
                                        <ImageIcon size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* File Info */}
                        {selectedImage && (
                            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <ImageIcon size={16} className="text-accent" />
                                    <span>{selectedImage.name}</span>
                                    <span className="text-white/50">
                                        ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between gap-3 p-6 pt-0">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-tertiary-hover rounded-lg transition-colors"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>

                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-white/80 hover:text-white hover:bg-tertiary-hover rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isUploading || previewUrl === currentImage}
                                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/80 disabled:bg-accent/30 disabled:cursor-not-allowed text-white rounded-lg transition-colors spark-on-click"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProfilePictureManager;