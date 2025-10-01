"use client";

import { useState, useEffect } from 'react';
import { projectService, certificateService, profileService } from '@/lib/supabase';

// ============= useProjects Hook =============
export function useSupabaseProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getAllProjects();
            setProjects(data || []);
            setError(null);
        } catch (err) {
            console.error('Error loading projects:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addProject = async (projectData) => {
        try {
            const newProject = await projectService.addProject(projectData);
            setProjects(prev => [newProject, ...prev]);
            return newProject;
        } catch (err) {
            console.error('Error adding project:', err);
            throw err;
        }
    };

    const updateProject = async (id, projectData) => {
        try {
            const updatedProject = await projectService.updateProject(id, projectData);
            setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
            return updatedProject;
        } catch (err) {
            console.error('Error updating project:', err);
            throw err;
        }
    };

    const deleteProject = async (id) => {
        try {
            await projectService.deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting project:', err);
            throw err;
        }
    };

    const uploadProjectImage = async (file) => {
        try {
            const imageUrl = await projectService.uploadProjectImage(file);
            return imageUrl;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };

    return {
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        uploadProjectImage,
        refresh: loadProjects
    };
}

// ============= useCertificates Hook =============
export function useSupabaseCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            setLoading(true);
            const data = await certificateService.getAllCertificates();
            setCertificates(data || []);
            setError(null);
        } catch (err) {
            console.error('Error loading certificates:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addCertificate = async (certificateData) => {
        try {
            const newCertificate = await certificateService.addCertificate(certificateData);
            setCertificates(prev => [newCertificate, ...prev]);
            return newCertificate;
        } catch (err) {
            console.error('Error adding certificate:', err);
            throw err;
        }
    };

    const updateCertificate = async (id, certificateData) => {
        try {
            const updatedCertificate = await certificateService.updateCertificate(id, certificateData);
            setCertificates(prev => prev.map(c => c.id === id ? updatedCertificate : c));
            return updatedCertificate;
        } catch (err) {
            console.error('Error updating certificate:', err);
            throw err;
        }
    };

    const deleteCertificate = async (id) => {
        try {
            await certificateService.deleteCertificate(id);
            setCertificates(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error deleting certificate:', err);
            throw err;
        }
    };

    const uploadCertificateBadge = async (file) => {
        try {
            const badgeUrl = await certificateService.uploadCertificateBadge(file);
            return badgeUrl;
        } catch (err) {
            console.error('Error uploading badge:', err);
            throw err;
        }
    };

    return {
        certificates,
        loading,
        error,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        uploadCertificateBadge,
        refresh: loadCertificates
    };
}

// ============= useProfile Hook =============
export function useSupabaseProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getProfile();
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error('Error loading profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const updatedProfile = await profileService.updateProfile(profileData);
            setProfile(updatedProfile);
            return updatedProfile;
        } catch (err) {
            console.error('Error updating profile:', err);
            throw err;
        }
    };

    const uploadProfilePicture = async (file) => {
        try {
            const imageUrl = await profileService.uploadProfilePicture(file);
            return imageUrl;
        } catch (err) {
            console.error('Error uploading profile picture:', err);
            throw err;
        }
    };

    return {
        profile,
        loading,
        error,
        updateProfile,
        uploadProfilePicture,
        refresh: loadProfile
    };
}

// ============= File Upload Helper =============
export function useFileUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadFile = async (file, uploadFunction) => {
        try {
            setUploading(true);
            setProgress(0);

            // Simulate progress
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 100);

            const url = await uploadFunction(file);

            clearInterval(interval);
            setProgress(100);

            setTimeout(() => {
                setProgress(0);
                setUploading(false);
            }, 500);

            return url;
        } catch (err) {
            setProgress(0);
            setUploading(false);
            throw err;
        }
    };

    return { uploading, progress, uploadFile };
}