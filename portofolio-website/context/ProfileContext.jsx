"use client";

import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

// Profile data - Edit langsung di sini untuk mengubah profile
const profileData = {
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
};

export const ProfileProvider = ({ children }) => {
    const [profile] = useState(profileData);
    const [loading] = useState(false);

    const value = {
        profile,
        loading,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContext;
