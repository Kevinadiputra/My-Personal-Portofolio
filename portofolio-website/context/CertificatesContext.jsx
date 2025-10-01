"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { certificateService } from '@/lib/supabase';

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
    const [error, setError] = useState(null);

    // Load certificates from Supabase on mount
    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await certificateService.getAllCertificates();

            if (data && data.length > 0) {
                // Transform Supabase data to match expected format
                const transformedData = data.map(cert => ({
                    ...cert,
                    date: cert.date_issued || cert.dateIssued || cert.date,
                    dateIssued: cert.date_issued || cert.dateIssued || cert.date,
                    verifyUrl: cert.verify_url || cert.verifyUrl,
                    skills: Array.isArray(cert.skills)
                        ? cert.skills
                        : (cert.skills || '').split(',').map(s => s.trim()).filter(Boolean)
                }));
                setCertificates(transformedData);
            } else {
                // If no data in Supabase, use default certificates
                console.log('No certificates found in Supabase, using defaults');
                setCertificates(defaultCertificates);
            }
        } catch (err) {
            console.error('Error loading certificates from Supabase:', err);
            setError(err.message);

            // Fallback to localStorage if Supabase fails
            try {
                const storedCertificates = localStorage.getItem('portfolio-certificates');
                if (storedCertificates) {
                    setCertificates(JSON.parse(storedCertificates));
                } else {
                    setCertificates(defaultCertificates);
                }
            } catch (localError) {
                console.error('Error loading from localStorage:', localError);
                setCertificates(defaultCertificates);
            }
        } finally {
            setLoading(false);
        }
    };

    // CRUD Operations
    const addCertificate = async (certificateData) => {
        try {
            setError(null);

            // Add to Supabase
            const newCertificate = await certificateService.addCertificate({
                title: certificateData.title,
                organization: certificateData.organization,
                date_issued: certificateData.date || certificateData.dateIssued || certificateData.date_issued,
                skills: Array.isArray(certificateData.skills)
                    ? certificateData.skills
                    : certificateData.skills.split(',').map(s => s.trim()).filter(Boolean),
                badge_url: certificateData.badgeUrl || certificateData.badge_url,
                verify_url: certificateData.verifyUrl || certificateData.verify_url
            });

            if (newCertificate) {
                // Transform and add to state
                const transformed = {
                    ...newCertificate,
                    date: newCertificate.date_issued,
                    dateIssued: newCertificate.date_issued,
                    badgeUrl: newCertificate.badge_url,
                    verifyUrl: newCertificate.verify_url
                };
                setCertificates(prev => [...prev, transformed]);

                // Also save to localStorage as backup
                const updated = [...certificates, transformed];
                localStorage.setItem('portfolio-certificates', JSON.stringify(updated));

                return transformed;
            }
        } catch (err) {
            console.error('Error adding certificate:', err);
            setError(err.message);

            // Fallback to localStorage only
            const newCertificate = {
                ...certificateData,
                id: Date.now(),
                skills: Array.isArray(certificateData.skills)
                    ? certificateData.skills
                    : certificateData.skills.split(',').map(skill => skill.trim()),
            };
            setCertificates(prev => [...prev, newCertificate]);
            localStorage.setItem('portfolio-certificates', JSON.stringify([...certificates, newCertificate]));
            return newCertificate;
        }
    };

    const updateCertificate = async (id, certificateData) => {
        try {
            setError(null);

            // Update in Supabase
            const updated = await certificateService.updateCertificate(id, {
                title: certificateData.title,
                organization: certificateData.organization,
                date_issued: certificateData.date || certificateData.dateIssued || certificateData.date_issued,
                skills: Array.isArray(certificateData.skills)
                    ? certificateData.skills
                    : certificateData.skills.split(',').map(s => s.trim()).filter(Boolean),
                badge_url: certificateData.badgeUrl || certificateData.badge_url,
                verify_url: certificateData.verifyUrl || certificateData.verify_url
            });

            if (updated) {
                // Transform and update state
                const transformed = {
                    ...updated,
                    date: updated.date_issued,
                    dateIssued: updated.date_issued,
                    badgeUrl: updated.badge_url,
                    verifyUrl: updated.verify_url
                };
                setCertificates(prev =>
                    prev.map(cert => cert.id === id ? transformed : cert)
                );

                // Also update localStorage as backup
                const updatedList = certificates.map(cert =>
                    cert.id === id ? transformed : cert
                );
                localStorage.setItem('portfolio-certificates', JSON.stringify(updatedList));
            }
        } catch (err) {
            console.error('Error updating certificate:', err);
            setError(err.message);

            // Fallback to localStorage only
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
            const updatedList = certificates.map(certificate =>
                certificate.id === id
                    ? {
                        ...certificate,
                        ...certificateData,
                        skills: Array.isArray(certificateData.skills)
                            ? certificateData.skills
                            : certificateData.skills.split(',').map(skill => skill.trim())
                    }
                    : certificate
            );
            localStorage.setItem('portfolio-certificates', JSON.stringify(updatedList));
        }
    };

    const deleteCertificate = async (id) => {
        try {
            setError(null);

            // Delete from Supabase
            const success = await certificateService.deleteCertificate(id);

            if (success) {
                // Remove from state
                setCertificates(prev => prev.filter(cert => cert.id !== id));

                // Also remove from localStorage
                const updated = certificates.filter(cert => cert.id !== id);
                localStorage.setItem('portfolio-certificates', JSON.stringify(updated));
            }
        } catch (err) {
            console.error('Error deleting certificate:', err);
            setError(err.message);

            // Fallback to localStorage only
            setCertificates(prev => prev.filter(certificate => certificate.id !== id));
            const updated = certificates.filter(certificate => certificate.id !== id);
            localStorage.setItem('portfolio-certificates', JSON.stringify(updated));
        }
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

    const duplicateCertificate = async (id) => {
        const certificate = getCertificate(id);
        if (certificate) {
            const duplicatedCertificate = {
                ...certificate,
                title: `${certificate.title} (Copy)`,
            };
            // Use addCertificate which now handles Supabase
            return await addCertificate(duplicatedCertificate);
        }
    };

    // Upload certificate badge image
    const uploadCertificateBadge = async (file) => {
        try {
            setError(null);
            const url = await certificateService.uploadCertificateBadge(file);
            return url;
        } catch (err) {
            console.error('Error uploading certificate badge:', err);
            setError(err.message);
            throw err;
        }
    };

    // Refresh certificates from Supabase
    const refresh = () => {
        loadCertificates();
    };

    const value = {
        certificates,
        loading,
        error,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        getCertificate,
        toggleFeatured,
        duplicateCertificate,
        uploadCertificateBadge,
        refresh,
    };

    return (
        <CertificatesContext.Provider value={value}>
            {children}
        </CertificatesContext.Provider>
    );
};