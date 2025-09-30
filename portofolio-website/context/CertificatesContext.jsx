"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CertificatesContext = createContext();

export const useCertificates = () => {
    const context = useContext(CertificatesContext);
    if (!context) {
        throw new Error('useCertificates must be used within a CertificatesProvider');
    }
    return context;
};

// Default certificates data
const defaultCertificates = [
    {
        id: 1,
        title: "Full Stack Web Development",
        issuer: "Meta",
        platform: "Coursera",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "ABC123XYZ",
        skills: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "HTML5", "CSS3"],
        description: "Comprehensive full-stack development program covering modern web technologies and best practices.",
        verifyUrl: "#",
        featured: true,
        category: "development",
        level: "Professional",
        duration: "6 months"
    },
    {
        id: 2,
        title: "Machine Learning Specialization",
        issuer: "Stanford University",
        platform: "Coursera",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "ML2024-456",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Deep Learning", "Neural Networks"],
        description: "Advanced machine learning concepts including supervised and unsupervised learning, neural networks, and deep learning.",
        verifyUrl: "#",
        featured: true,
        category: "ai-ml",
        level: "Advanced",
        duration: "4 months"
    },
    {
        id: 3,
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        platform: "AWS Training",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "AWS-CP-789",
        skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda", "IAM"],
        description: "Foundational understanding of AWS cloud services and architecture best practices.",
        verifyUrl: "#",
        featured: false,
        category: "cloud",
        level: "Foundation",
        duration: "2 months"
    },
    {
        id: 4,
        title: "Google Data Analytics Certificate",
        issuer: "Google",
        platform: "Coursera",
        date: "2023",
        image: "/api/placeholder/400/300",
        credentialId: "GDA-2023-101",
        skills: ["SQL", "R", "Tableau", "Data Visualization", "Statistics", "Excel"],
        description: "Comprehensive data analytics program covering data collection, processing, analysis, and visualization.",
        verifyUrl: "#",
        featured: true,
        category: "data",
        level: "Professional",
        duration: "6 months"
    },
    {
        id: 5,
        title: "Certified Scrum Master",
        issuer: "Scrum Alliance",
        platform: "Scrum Alliance",
        date: "2023",
        image: "/api/placeholder/400/300",
        credentialId: "CSM-112233",
        skills: ["Scrum", "Agile", "Project Management", "Team Leadership", "Sprint Planning"],
        description: "Agile project management methodology and Scrum framework implementation.",
        verifyUrl: "#",
        featured: false,
        category: "management",
        level: "Professional",
        duration: "2 days"
    },
    {
        id: 6,
        title: "React Native Development",
        issuer: "React Native School",
        platform: "Online",
        date: "2023",
        image: "/api/placeholder/400/300",
        credentialId: "RN-456789",
        skills: ["React Native", "Mobile Development", "JavaScript", "iOS", "Android"],
        description: "Mobile app development using React Native for cross-platform applications.",
        verifyUrl: "#",
        featured: false,
        category: "mobile",
        level: "Intermediate",
        duration: "3 months"
    }
];

export const CertificatesProvider = ({ children }) => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load certificates from localStorage on mount
    useEffect(() => {
        const loadCertificates = () => {
            try {
                const storedCertificates = localStorage.getItem('portfolio-certificates');
                if (storedCertificates) {
                    setCertificates(JSON.parse(storedCertificates));
                } else {
                    setCertificates(defaultCertificates);
                    localStorage.setItem('portfolio-certificates', JSON.stringify(defaultCertificates));
                }
            } catch (error) {
                console.error('Error loading certificates:', error);
                setCertificates(defaultCertificates);
            } finally {
                setLoading(false);
            }
        };

        loadCertificates();
    }, []);

    // Save certificates to localStorage whenever they change
    useEffect(() => {
        if (!loading && certificates.length >= 0) {
            localStorage.setItem('portfolio-certificates', JSON.stringify(certificates));
        }
    }, [certificates, loading]);

    // CRUD Operations
    const addCertificate = (certificateData) => {
        const newCertificate = {
            ...certificateData,
            id: Date.now(),
            skills: Array.isArray(certificateData.skills)
                ? certificateData.skills
                : certificateData.skills.split(',').map(skill => skill.trim()),
        };
        setCertificates(prev => [...prev, newCertificate]);
        return newCertificate;
    };

    const updateCertificate = (id, certificateData) => {
        setCertificates(prev => prev.map(certificate =>
            certificate.id === id
                ? {
                    ...certificate,
                    ...certificateData,
                    skills: Array.isArray(certificateData.skills)
                        ? certificateData.skills
                        : certificateData.skills.split(',').map(skill => skill.trim())
                }
                : certificate
        ));
    };

    const deleteCertificate = (id) => {
        setCertificates(prev => prev.filter(certificate => certificate.id !== id));
    };

    const getCertificate = (id) => {
        return certificates.find(certificate => certificate.id === id);
    };

    const toggleFeatured = (id) => {
        setCertificates(prev => prev.map(certificate =>
            certificate.id === id
                ? { ...certificate, featured: !certificate.featured }
                : certificate
        ));
    };

    const duplicateCertificate = (id) => {
        const certificate = getCertificate(id);
        if (certificate) {
            const duplicatedCertificate = {
                ...certificate,
                id: Date.now(),
                title: `${certificate.title} (Copy)`,
            };
            setCertificates(prev => [...prev, duplicatedCertificate]);
            return duplicatedCertificate;
        }
    };

    const value = {
        certificates,
        loading,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        getCertificate,
        toggleFeatured,
        duplicateCertificate,
    };

    return (
        <CertificatesContext.Provider value={value}>
            {children}
        </CertificatesContext.Provider>
    );
};