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

const profileData = {
    name: 'Kevin Adiputra',
    title: 'Machine Learning Engineer & Data Scientist',
    bio: 'Passionate Machine Learning Engineer and Data Scientist specializing in deep learning, NLP, computer vision, and predictive analytics. Experienced in building end-to-end ML pipelines and deploying models in production environments.',
    profilePicture: '/api/placeholder/400/400',
    email: 'kevinadiputra1704@gmail.com',
    phone: '+62 859-3000-7017',
    location: 'Indonesia',
    linkedin: 'https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/',
    github: 'https://github.com/Kevinadiputra',
    website: 'https://kevin-adiputra-portfolio.vercel.app',
    skills: [
        'Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
        'Scikit-learn', 'Pandas', 'NumPy', 'SQL', 'Data Visualization',
        'NLP', 'Computer Vision', 'Docker', 'AWS', 'MLflow'
    ],
    experience: [
        {
            title: 'Machine Learning Engineer',
            company: 'Tech Company',
            period: '2024 - Present',
            description: 'Building and deploying ML models for production systems'
        }
    ],
    education: [
        {
            degree: 'Bachelor in Computer Science',
            institution: 'University',
            period: '2020 - 2024'
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
