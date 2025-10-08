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

// Certificates data - Edit langsung di sini untuk menambah/mengubah certificates
const certificatesData = [
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
        verifyUrl: "https://www.coursera.org/account/accomplishments/certificate/ABC123XYZ",
        featured: true,
        category: "development",
        level: "Professional",
        duration: "6 months",
        // 🆕 Related Projects - Bisa pakai ID projects yang sudah ada ATAU input manual
        relatedProjects: [1], // Array of project IDs from ProjectsContext (e.g., [1, 2, 3])
        // Overview section - Projects/portfolios related to this certificate
        overview: {
            summary: "This certification equipped me with comprehensive full-stack development skills. I've successfully applied these skills in multiple production-ready projects, building scalable web applications with modern tech stacks.",
            projects: [
                {
                    title: "E-Commerce Platform",
                    description: "A complete e-commerce solution with shopping cart, payment integration, and admin dashboard. Built using React, Node.js, and MongoDB.",
                    image: "/api/placeholder/600/400",
                    tech: ["React", "Node.js", "MongoDB", "Stripe"],
                    highlights: [
                        "Built RESTful API with Express.js",
                        "Implemented secure payment with Stripe",
                        "Real-time inventory management",
                        "Responsive design with Tailwind CSS"
                    ]
                },
                {
                    title: "Social Media Dashboard",
                    description: "Analytics dashboard for social media management with real-time data visualization and reporting features.",
                    image: "/api/placeholder/600/400",
                    tech: ["React", "Chart.js", "Express", "PostgreSQL"],
                    highlights: [
                        "Real-time data visualization",
                        "Multi-platform integration",
                        "Custom reporting system",
                        "Role-based access control"
                    ]
                }
            ],
            achievements: [
                "Successfully deployed 5+ full-stack applications",
                "Managed databases with 100K+ records",
                "Implemented CI/CD pipelines",
                "Optimized app performance by 40%"
            ]
        }
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
        duration: "4 months",
        overview: {
            summary: "Deep dive into machine learning algorithms and neural networks. Applied these concepts to build AI-powered applications with real-world impact.",
            projects: [
                {
                    title: "Image Classification System",
                    description: "CNN-based image classifier for medical diagnosis with 95% accuracy. Trained on 50K+ medical images using TensorFlow.",
                    image: "/api/placeholder/600/400",
                    tech: ["TensorFlow", "Python", "Keras", "OpenCV"],
                    highlights: [
                        "Achieved 95% accuracy on test set",
                        "Processed 50K+ training images",
                        "Implemented data augmentation",
                        "Deployed on AWS SageMaker"
                    ]
                },
                {
                    title: "Recommendation Engine",
                    description: "Collaborative filtering system for product recommendations with personalized user experience.",
                    image: "/api/placeholder/600/400",
                    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
                    highlights: [
                        "Collaborative filtering algorithm",
                        "20% increase in user engagement",
                        "Real-time recommendations",
                        "A/B testing implementation"
                    ]
                }
            ],
            achievements: [
                "Published research paper on ML optimization",
                "Built 3+ production ML models",
                "Reduced model training time by 60%",
                "Mentored 5 junior developers on ML"
            ]
        }
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