"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { profileService } from '@/lib/supabase';

const ProfileContext = createContext();

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: 'Kevin Adiputra',
        title: 'Machine Learning Operations Engineer',
        bio: 'Passionate Machine Learning Operations Engineer specializing in data processing, ETL, and modern data technologies. Experienced in building scalable data pipelines and implementing ML solutions in production environments.',
        profilePicture: '/api/placeholder/400/400',
        email: 'kevinadiputra1704@gmail.com',
        phone: '+62 859-3000-7017',
        location: 'Indonesia',
        linkedin: 'https://linkedin.com/in/kevin-adiputra',
        github: 'https://github.com/kevinadiputra',
        website: 'https://kevin-adiputra-portfolio.vercel.app',
        skills: [
            'Python', 'Machine Learning', 'Data Engineering', 'ETL', 'Apache Spark',
            'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS', 'GCP',
            'SQL', 'NoSQL', 'Data Visualization', 'MLOps'
        ],
        experience: [
            {
                title: 'Machine Learning Operations Engineer',
                company: 'Tech Company',
                period: '2022 - Present',
                description: 'Leading ML infrastructure and deployment strategies'
            }
        ],
        education: [
            {
                degree: 'Bachelor in Computer Science',
                institution: 'University',
                period: '2018 - 2022'
            }
        ]
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load profile from Supabase on mount
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await profileService.getProfile();

            if (data) {
                // Transform Supabase data to match expected format
                const transformedProfile = {
                    name: data.name || profile.name,
                    title: data.title || profile.title,
                    bio: data.bio || profile.bio,
                    profilePicture: data.profile_picture || data.profilePicture || profile.profilePicture,
                    email: data.email || profile.email,
                    phone: data.phone || profile.phone,
                    location: data.location || profile.location,
                    linkedin: data.linkedin || profile.linkedin,
                    github: data.github || profile.github,
                    website: data.website || profile.website,
                    skills: Array.isArray(data.skills)
                        ? data.skills
                        : profile.skills,
                    experience: Array.isArray(data.experience)
                        ? data.experience
                        : profile.experience,
                    education: Array.isArray(data.education)
                        ? data.education
                        : profile.education
                };
                setProfile(transformedProfile);

                // Also save to localStorage as backup
                localStorage.setItem('user_profile', JSON.stringify(transformedProfile));
            }
        } catch (err) {
            console.error('Error loading profile from Supabase:', err);
            setError(err.message);

            // Fallback to localStorage if Supabase fails
            try {
                const savedProfile = localStorage.getItem('user_profile');
                if (savedProfile) {
                    const parsedProfile = JSON.parse(savedProfile);
                    setProfile(prev => ({ ...prev, ...parsedProfile }));
                }

                const savedProfilePicture = localStorage.getItem('profile_picture');
                if (savedProfilePicture) {
                    setProfile(prev => ({ ...prev, profilePicture: savedProfilePicture }));
                }
            } catch (localError) {
                console.error('Error loading from localStorage:', localError);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updates) => {
        try {
            setError(null);

            // Update in Supabase
            const updated = await profileService.updateProfile({
                name: updates.name,
                title: updates.title,
                bio: updates.bio,
                profile_picture: updates.profilePicture || updates.profile_picture,
                email: updates.email,
                phone: updates.phone,
                location: updates.location,
                linkedin: updates.linkedin,
                github: updates.github,
                website: updates.website,
                skills: updates.skills,
                experience: updates.experience,
                education: updates.education
            });

            if (updated) {
                // Transform and update state
                const transformed = {
                    ...profile,
                    ...updates,
                    profilePicture: updated.profile_picture || updates.profilePicture || profile.profilePicture
                };
                setProfile(transformed);

                // Also save to localStorage as backup
                localStorage.setItem('user_profile', JSON.stringify(transformed));
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.message);

            // Fallback to localStorage only
            setProfile(prev => ({ ...prev, ...updates }));
            localStorage.setItem('user_profile', JSON.stringify({ ...profile, ...updates }));
        }
    };

    const updateProfilePicture = async (imageUrl) => {
        try {
            setError(null);

            // Update in Supabase
            const updated = await profileService.updateProfile({
                profile_picture: imageUrl
            });

            if (updated) {
                setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
                localStorage.setItem('profile_picture', imageUrl);
            }
        } catch (err) {
            console.error('Error updating profile picture:', err);
            setError(err.message);

            // Fallback to localStorage only
            setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
            localStorage.setItem('profile_picture', imageUrl);
        }
    };

    const uploadProfilePicture = async (file) => {
        try {
            setError(null);
            const url = await profileService.uploadProfilePicture(file);

            if (url) {
                // Update profile with new picture URL
                await updateProfilePicture(url);
                return url;
            }
        } catch (err) {
            console.error('Error uploading profile picture:', err);
            setError(err.message);
            throw err;
        }
    };

    const updatePersonalInfo = async (personalInfo) => {
        await updateProfile(personalInfo);
    };

    const updateSkills = async (skills) => {
        await updateProfile({ skills });
    };

    const updateExperience = async (experience) => {
        await updateProfile({ experience });
    };

    const updateEducation = async (education) => {
        await updateProfile({ education });
    };

    const resetProfile = async () => {
        const defaultProfile = {
            name: 'Kevin Adiputra',
            title: 'Machine Learning Operations Engineer',
            bio: 'Passionate Machine Learning Operations Engineer specializing in data processing, ETL, and modern data technologies.',
            profilePicture: '/api/placeholder/400/400',
            email: 'kevinadiputra1704@gmail.com',
            phone: '+62 859-3000-7017',
            location: 'Indonesia',
            linkedin: 'https://linkedin.com/in/kevin-adiputra',
            github: 'https://github.com/kevinadiputra',
            website: 'https://kevin-adiputra-portfolio.vercel.app',
            skills: [
                'Python', 'Machine Learning', 'Data Engineering', 'ETL', 'Apache Spark',
                'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS', 'GCP',
                'SQL', 'NoSQL', 'Data Visualization', 'MLOps'
            ],
            experience: [],
            education: []
        };

        try {
            setError(null);

            // Reset in Supabase
            await profileService.updateProfile({
                name: defaultProfile.name,
                title: defaultProfile.title,
                bio: defaultProfile.bio,
                profile_picture: defaultProfile.profilePicture,
                email: defaultProfile.email,
                phone: defaultProfile.phone,
                location: defaultProfile.location,
                linkedin: defaultProfile.linkedin,
                github: defaultProfile.github,
                website: defaultProfile.website,
                skills: defaultProfile.skills,
                experience: defaultProfile.experience,
                education: defaultProfile.education
            });

            setProfile(defaultProfile);
            localStorage.removeItem('user_profile');
            localStorage.removeItem('profile_picture');
        } catch (err) {
            console.error('Error resetting profile:', err);
            setError(err.message);

            // Fallback to localStorage only
            setProfile(defaultProfile);
            localStorage.removeItem('user_profile');
            localStorage.removeItem('profile_picture');
        }
    };

    // Refresh profile from Supabase
    const refresh = () => {
        loadProfile();
    };

    const value = {
        profile,
        loading,
        error,
        updateProfile,
        updateProfilePicture,
        uploadProfilePicture,
        updatePersonalInfo,
        updateSkills,
        updateExperience,
        updateEducation,
        resetProfile,
        refresh
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContext;