"use client";

import { createContext, useContext, useState } from 'react';

const CertificatesContext = createContext();

export const useCertificates = () => {
    const context = useContext(CertificatesContext);
    if (!context) {
        throw new Error('useCertificates must be used within a CertificatesProvider');
    }
    return context;
};

const certificatesData = [
    {
        id: 1,
        title: "Machine Learning Specialization",
        issuer: "Stanford University",
        platform: "Coursera",
        date: "2025",
        image: "/api/placeholder/400/300",
        credentialId: "ML2025-001",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Deep Learning", "Neural Networks", "Regression", "Classification"],
        description: "Comprehensive machine learning program covering supervised learning, unsupervised learning, recommender systems, and reinforcement learning by Andrew Ng.",
        verifyUrl: "#",
        featured: true,
        category: "ai-ml",
        level: "Advanced",
        duration: "4 months",
        relatedProjects: [1],
        overview: {
            summary: "Deep dive into machine learning algorithms and neural networks. Applied these concepts to build AI-powered applications with real-world impact.",
            projects: [
                {
                    title: "Image Classification System",
                    description: "CNN-based image classifier for medical diagnosis with 95% accuracy using TensorFlow.",
                    image: "/api/placeholder/600/400",
                    tech: ["TensorFlow", "Python", "Keras", "OpenCV"],
                    highlights: ["95% test accuracy", "50K+ training images", "Grad-CAM visualization", "AWS deployment"]
                }
            ],
            achievements: [
                "Built 3+ production ML models",
                "Achieved 95%+ accuracy on classification tasks",
                "Completed all hands-on labs and assignments",
                "Applied concepts in real-world projects"
            ]
        }
    },
    {
        id: 2,
        title: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        platform: "Coursera",
        date: "2025",
        image: "/api/placeholder/400/300",
        credentialId: "DL2025-002",
        skills: ["Deep Learning", "CNN", "RNN", "Transformers", "TensorFlow", "NLP", "Computer Vision"],
        description: "Advanced deep learning concepts including CNNs, RNNs, LSTMs, Transformers, and their applications in computer vision and NLP.",
        verifyUrl: "#",
        featured: true,
        category: "ai-ml",
        level: "Advanced",
        duration: "5 months",
        relatedProjects: [1, 2],
        overview: {
            summary: "Mastered deep learning architectures from basic neural networks to advanced transformer models. Applied to both computer vision and natural language processing tasks.",
            projects: [
                {
                    title: "NLP Sentiment Analysis",
                    description: "Transformer-based sentiment analysis system with multi-language support.",
                    image: "/api/placeholder/600/400",
                    tech: ["PyTorch", "Hugging Face", "BERT"],
                    highlights: ["92% accuracy", "Multi-language support", "Real-time processing", "Fine-tuned BERT"]
                }
            ],
            achievements: [
                "Implemented neural networks from scratch",
                "Built sequence models for NLP tasks",
                "Applied transfer learning techniques",
                "Completed capstone project on transformer architectures"
            ]
        }
    },
    {
        id: 3,
        title: "Google Data Analytics Certificate",
        issuer: "Google",
        platform: "Coursera",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "GDA-2024-003",
        skills: ["SQL", "R", "Tableau", "Data Visualization", "Statistics", "Excel", "Data Cleaning"],
        description: "Comprehensive data analytics program covering data collection, processing, analysis, and visualization techniques used by data professionals.",
        verifyUrl: "#",
        featured: true,
        category: "data",
        level: "Professional",
        duration: "6 months"
    },
    {
        id: 4,
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        platform: "AWS Training",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "AWS-CP-004",
        skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda", "SageMaker"],
        description: "Foundational understanding of AWS cloud services including compute, storage, and machine learning services like SageMaker.",
        verifyUrl: "#",
        featured: false,
        category: "cloud",
        level: "Foundation",
        duration: "2 months"
    },
    {
        id: 5,
        title: "TensorFlow Developer Certificate",
        issuer: "Google",
        platform: "TensorFlow",
        date: "2024",
        image: "/api/placeholder/400/300",
        credentialId: "TF-DEV-005",
        skills: ["TensorFlow", "Keras", "CNN", "NLP", "Time Series", "Transfer Learning"],
        description: "Professional certification demonstrating proficiency in using TensorFlow to build and train neural networks for various ML tasks.",
        verifyUrl: "#",
        featured: false,
        category: "ai-ml",
        level: "Professional",
        duration: "3 months"
    },
];

export const CertificatesProvider = ({ children }) => {
    const [certificates] = useState(certificatesData);
    const [loading] = useState(false);

    const getCertificate = (id) => {
        return certificates.find(certificate => certificate.id === Number(id));
    };

    const value = {
        certificates,
        loading,
        getCertificate,
    };

    return (
        <CertificatesContext.Provider value={value}>
            {children}
        </CertificatesContext.Provider>
    );
};
