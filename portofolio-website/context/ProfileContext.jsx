"use client";

import { createContext, useContext, useState, useEffect } from 'react';

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

    // Load profile from localStorage on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
            try {
                const parsedProfile = JSON.parse(savedProfile);
                setProfile(prev => ({ ...prev, ...parsedProfile }));
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        }

        // Load individual profile picture if saved separately
        const savedProfilePicture = localStorage.getItem('profile_picture');
        if (savedProfilePicture) {
            setProfile(prev => ({ ...prev, profilePicture: savedProfilePicture }));
        }

        setLoading(false);
    }, []);

    // Save profile to localStorage whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('user_profile', JSON.stringify(profile));
        }
    }, [profile, loading]);

    const updateProfile = (updates) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const updateProfilePicture = (imageUrl) => {
        setProfile(prev => ({ ...prev, profilePicture: imageUrl }));
        localStorage.setItem('profile_picture', imageUrl);
    };

    const updatePersonalInfo = (personalInfo) => {
        setProfile(prev => ({
            ...prev,
            ...personalInfo
        }));
    };

    const updateSkills = (skills) => {
        setProfile(prev => ({ ...prev, skills }));
    };

    const updateExperience = (experience) => {
        setProfile(prev => ({ ...prev, experience }));
    };

    const updateEducation = (education) => {
        setProfile(prev => ({ ...prev, education }));
    };

    const resetProfile = () => {
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

        setProfile(defaultProfile);
        localStorage.removeItem('user_profile');
        localStorage.removeItem('profile_picture');
    };

    const value = {
        profile,
        loading,
        updateProfile,
        updateProfilePicture,
        updatePersonalInfo,
        updateSkills,
        updateExperience,
        updateEducation,
        resetProfile
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContext;