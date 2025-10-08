"use client";

import { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
};

// Projects data - Edit langsung di sini untuk menambah/mengubah projects
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A comprehensive e-commerce solution featuring modern design, secure payment processing, real-time inventory management, and an intuitive admin dashboard. Built with scalability and performance in mind, this platform handles thousands of concurrent users and integrates with multiple payment gateways.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Redux", "Express.js", "JWT"],
        category: "fullstack",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        highlight: true, // Tampilkan di section ReactBits/Highlight
        details: {
            duration: "3 months",
            status: "Completed",
            features: [
                "User authentication and authorization",
                "Product catalog with search and filtering",
                "Shopping cart and checkout process",
                "Payment integration with Stripe",
                "Admin dashboard for inventory management",
                "Order tracking and management",
                "Responsive design for all devices",
                "Email notifications and confirmations"
            ]
        },
        // 🆕 OVERVIEW - Detail lengkap untuk halaman detail project
        overview: {
            // Problem statement
            problem: "Many small businesses struggle to create an online presence and manage their e-commerce operations efficiently. They need a comprehensive platform that's easy to use yet powerful enough to handle growing demands.",

            // Solution yang diberikan
            solution: "Developed a full-stack e-commerce platform with modern UI/UX, secure payment processing, real-time inventory management, and an intuitive admin dashboard. The platform is built with scalability in mind and can handle thousands of concurrent users.",

            // Challenge yang dihadapi
            challenges: [
                {
                    title: "Payment Security",
                    description: "Implementing secure payment processing while maintaining user-friendly checkout flow",
                    solution: "Integrated Stripe with PCI compliance and implemented additional security layers"
                },
                {
                    title: "Real-time Inventory",
                    description: "Managing inventory across multiple warehouses in real-time",
                    solution: "Built WebSocket-based system for instant inventory updates"
                },
                {
                    title: "Scalability",
                    description: "Ensuring the platform can handle traffic spikes during sales events",
                    solution: "Implemented load balancing, caching, and database optimization"
                }
            ],

            // Screenshots/Images dengan deskripsi
            gallery: [
                {
                    image: "/api/placeholder/800/600",
                    title: "Homepage & Product Catalog",
                    description: "Modern, responsive homepage with featured products, categories, and search functionality"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Shopping Cart & Checkout",
                    description: "Streamlined checkout process with multiple payment options and order summary"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Admin Dashboard",
                    description: "Comprehensive admin panel for managing products, orders, and analytics"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Mobile Responsive",
                    description: "Fully responsive design optimized for mobile shopping experience"
                }
            ],

            // Metrics & Results
            metrics: [
                {
                    label: "Active Users",
                    value: "10K+",
                    description: "Monthly active users"
                },
                {
                    label: "Transactions",
                    value: "$500K+",
                    description: "Total transaction value"
                },
                {
                    label: "Performance",
                    value: "99.9%",
                    description: "Uptime reliability"
                },
                {
                    label: "Load Time",
                    value: "< 2s",
                    description: "Average page load time"
                }
            ],

            // Technical highlights
            technicalHighlights: [
                {
                    title: "Architecture",
                    description: "Microservices architecture with separate services for authentication, payment, inventory, and notifications",
                    tech: ["Node.js", "Express", "MongoDB", "Redis"]
                },
                {
                    title: "Frontend",
                    description: "React-based SPA with Redux for state management and Tailwind CSS for styling",
                    tech: ["React", "Redux", "Tailwind CSS", "React Router"]
                },
                {
                    title: "Payment Integration",
                    description: "Secure payment processing with Stripe, supporting multiple currencies and payment methods",
                    tech: ["Stripe API", "Webhooks", "PCI Compliance"]
                },
                {
                    title: "DevOps",
                    description: "CI/CD pipeline with automated testing and deployment to AWS",
                    tech: ["GitHub Actions", "Docker", "AWS EC2", "Nginx"]
                }
            ],

            // External Links
            links: {
                // Link ke live project
                live: "https://ecommerce-demo.example.com",

                // Link ke GitHub repository
                github: "https://github.com/username/ecommerce-platform",

                // Link ke dokumentasi
                documentation: "https://docs.example.com/ecommerce",

                // Link ke demo video (YouTube, Vimeo, dll)
                demo: "https://youtube.com/watch?v=demo123",

                // Link khusus (bisa custom)
                custom: [
                    {
                        label: "API Documentation",
                        url: "https://api.example.com/docs"
                    },
                    {
                        label: "Case Study",
                        url: "https://medium.com/@username/case-study"
                    }
                ]
            },

            // Team & Role
            team: {
                size: "Solo Project",
                role: "Full Stack Developer",
                responsibilities: [
                    "Designed and implemented entire application architecture",
                    "Developed frontend using React and Redux",
                    "Built RESTful APIs with Node.js and Express",
                    "Integrated Stripe payment gateway",
                    "Set up CI/CD pipeline and deployment"
                ]
            },

            // Technologies breakdown dengan detail
            techStack: {
                frontend: {
                    primary: ["React", "Redux", "Tailwind CSS"],
                    additional: ["React Router", "Axios", "Framer Motion"]
                },
                backend: {
                    primary: ["Node.js", "Express", "MongoDB"],
                    additional: ["JWT", "Bcrypt", "Mongoose", "Socket.io"]
                },
                tools: ["Git", "VS Code", "Postman", "MongoDB Compass"],
                deployment: ["AWS EC2", "Nginx", "Docker", "GitHub Actions"]
            },

            // Future improvements
            futureImprovements: [
                "Implement AI-powered product recommendations",
                "Add multi-language support",
                "Integrate with more payment gateways",
                "Add progressive web app (PWA) features"
            ]
        }
    },
    {
        id: 2,
        title: "AI Image Classification System",
        description: "Deep learning-powered image classification system for medical diagnosis. Uses convolutional neural networks (CNN) to analyze medical images with 95% accuracy. Built with TensorFlow and deployed on cloud infrastructure for scalability.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "TensorFlow", "Keras", "Flask", "Docker", "AWS", "OpenCV", "NumPy"],
        category: "ai-ml",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        highlight: true, // Tampilkan di section ReactBits/Highlight
        details: {
            duration: "4 months",
            status: "Completed",
            features: [
                "CNN-based image classification",
                "95% accuracy on test dataset",
                "REST API for model inference",
                "Web-based image upload interface",
                "Batch processing capability",
                "Model versioning and A/B testing",
                "Real-time prediction results",
                "Explainable AI visualizations"
            ]
        },
        // 🆕 OVERVIEW untuk ML/AI Project
        overview: {
            problem: "Medical diagnosis through image analysis is time-consuming and requires expert radiologists. There's a need for an automated system that can assist in preliminary diagnosis while maintaining high accuracy.",

            solution: "Developed a deep learning system using Convolutional Neural Networks (CNN) to classify medical images with 95% accuracy. The system can process images in real-time and provide probability scores for different conditions.",

            challenges: [
                {
                    title: "Data Imbalance",
                    description: "Dataset had uneven distribution of different medical conditions",
                    solution: "Applied data augmentation techniques and weighted loss functions to balance the training"
                },
                {
                    title: "Model Interpretability",
                    description: "Need to explain model predictions to medical professionals",
                    solution: "Implemented Grad-CAM visualizations to show which areas the model focused on"
                },
                {
                    title: "Deployment at Scale",
                    description: "Model inference needed to be fast and handle concurrent requests",
                    solution: "Optimized model with TensorFlow Lite and deployed on AWS with auto-scaling"
                }
            ],

            gallery: [
                {
                    image: "/api/placeholder/800/600",
                    title: "Model Architecture",
                    description: "Custom CNN architecture with 5 convolutional layers and attention mechanisms"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Training Dashboard",
                    description: "Real-time training metrics showing accuracy and loss over epochs"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Prediction Interface",
                    description: "User-friendly web interface for uploading and analyzing medical images"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Grad-CAM Visualization",
                    description: "Heatmap showing which regions of the image influenced the prediction"
                }
            ],

            metrics: [
                {
                    label: "Accuracy",
                    value: "95.3%",
                    description: "On test dataset"
                },
                {
                    label: "Images Processed",
                    value: "50K+",
                    description: "Training dataset size"
                },
                {
                    label: "Inference Time",
                    value: "< 0.5s",
                    description: "Per image prediction"
                },
                {
                    label: "F1 Score",
                    value: "0.94",
                    description: "Balanced performance metric"
                }
            ],

            technicalHighlights: [
                {
                    title: "Model Architecture",
                    description: "Custom CNN with residual connections and attention mechanisms for improved feature extraction",
                    tech: ["TensorFlow", "Keras", "ResNet", "Attention Layers"]
                },
                {
                    title: "Data Pipeline",
                    description: "Automated data preprocessing, augmentation, and validation pipeline",
                    tech: ["OpenCV", "NumPy", "Albumentations", "TensorFlow Data API"]
                },
                {
                    title: "Model Serving",
                    description: "Flask-based REST API with batch processing and result caching",
                    tech: ["Flask", "Redis", "Celery", "TensorFlow Serving"]
                },
                {
                    title: "MLOps",
                    description: "Complete ML pipeline with experiment tracking, model versioning, and monitoring",
                    tech: ["MLflow", "DVC", "Prometheus", "Grafana"]
                }
            ],

            links: {
                live: "https://ml-diagnosis-demo.example.com",
                github: "https://github.com/username/ml-image-classifier",

                // 🆕 Link ke Google Colab notebook
                colab: "https://colab.research.google.com/drive/your-notebook-id",

                // Link ke research paper atau artikel
                paper: "https://arxiv.org/abs/example-paper",

                documentation: "https://docs.example.com/ml-classifier",
                demo: "https://youtube.com/watch?v=ml-demo",

                custom: [
                    {
                        label: "Kaggle Dataset",
                        url: "https://kaggle.com/datasets/medical-images"
                    },
                    {
                        label: "Model Weights (HuggingFace)",
                        url: "https://huggingface.co/username/model"
                    },
                    {
                        label: "Blog Post",
                        url: "https://medium.com/@username/ml-project"
                    }
                ]
            },

            team: {
                size: "Solo Project",
                role: "ML Engineer & Full Stack Developer",
                responsibilities: [
                    "Collected and preprocessed 50K+ medical images",
                    "Designed and trained custom CNN architecture",
                    "Implemented data augmentation pipeline",
                    "Built REST API for model inference",
                    "Deployed model on AWS with auto-scaling",
                    "Created web interface for predictions"
                ]
            },

            techStack: {
                ml: {
                    primary: ["TensorFlow", "Keras", "Python"],
                    additional: ["OpenCV", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"]
                },
                backend: {
                    primary: ["Flask", "Redis", "Celery"],
                    additional: ["Gunicorn", "Nginx"]
                },
                frontend: {
                    primary: ["React", "Chart.js"],
                    additional: ["Axios", "Bootstrap"]
                },
                tools: ["Jupyter", "Google Colab", "TensorBoard", "MLflow", "DVC"],
                deployment: ["AWS EC2", "Docker", "AWS S3", "CloudWatch"]
            },

            // 🆕 Research & Experiments (khusus ML/AI projects)
            research: {
                experiments: [
                    {
                        name: "Baseline Model",
                        description: "Simple CNN with 3 layers",
                        accuracy: "87.5%",
                        notes: "Good starting point but underfitting"
                    },
                    {
                        name: "ResNet Transfer Learning",
                        description: "Pre-trained ResNet50 with fine-tuning",
                        accuracy: "92.3%",
                        notes: "Better but still room for improvement"
                    },
                    {
                        name: "Custom Architecture + Attention",
                        description: "Custom CNN with attention mechanisms",
                        accuracy: "95.3%",
                        notes: "Best performance achieved"
                    }
                ],

                // Link ke experiment notebooks
                notebooks: [
                    {
                        title: "Data Exploration & Preprocessing",
                        url: "https://colab.research.google.com/drive/notebook1",
                        description: "Initial data analysis and preprocessing pipeline"
                    },
                    {
                        title: "Model Training & Experiments",
                        url: "https://colab.research.google.com/drive/notebook2",
                        description: "Different model architectures and hyperparameter tuning"
                    },
                    {
                        title: "Model Evaluation & Visualization",
                        url: "https://colab.research.google.com/drive/notebook3",
                        description: "Performance metrics and result visualizations"
                    }
                ]
            },

            futureImprovements: [
                "Implement multi-class classification for more conditions",
                "Add support for 3D medical imaging (CT scans, MRI)",
                "Improve model interpretability with SHAP values",
                "Create mobile app for on-the-go diagnosis",
                "Integrate with hospital information systems"
            ]
        }
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "A beautiful weather dashboard with location-based forecasts and interactive charts.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Chart.js", "Weather API", "CSS3"],
        category: "frontend",
        date: "2023",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false, // Tidak tampil di ReactBits
    },
    {
        id: 4,
        title: "REST API Service",
        description: "A robust REST API with authentication, rate limiting, and comprehensive documentation.",
        image: "/api/placeholder/400/250",
        technologies: ["Node.js", "Express", "JWT", "Swagger", "Docker"],
        category: "backend",
        date: "2023",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false, // Tidak tampil di ReactBits
    },
    {
        id: 5,
        title: "Portfolio Website",
        description: "A responsive portfolio website with modern design and smooth animations.",
        image: "/api/placeholder/400/250",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        category: "frontend",
        date: "2023",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false, // Tidak tampil di ReactBits
    },
    {
        id: 6,
        title: "Blog CMS",
        description: "A content management system for bloggers with rich text editor and SEO optimization.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "Node.js", "MySQL", "TinyMCE"],
        category: "fullstack",
        date: "2023",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false, // Tidak tampil di ReactBits
    },
    // 🎯 CONTOH PROJECT LENGKAP dengan semua field overview
    {
        id: 7,
        title: "Smart Healthcare System",
        description: "AI-powered healthcare management system with predictive analytics, patient monitoring, and telemedicine capabilities. Integrates with medical devices and provides real-time health insights.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "FastAPI", "React", "PostgreSQL", "TensorFlow", "Docker", "Redis", "WebSocket"],
        category: "fullstack",
        date: "2024",
        liveUrl: "https://healthcare-demo.vercel.app",
        githubUrl: "https://github.com/username/smart-healthcare",
        featured: true,
        highlight: true, // Tampil di ReactBits

        details: {
            duration: "8 months",
            status: "Completed",
            features: [
                "Real-time patient vital signs monitoring",
                "AI-powered disease prediction",
                "Telemedicine video consultations",
                "Electronic Health Records (EHR) management",
                "Prescription and medication tracking",
                "Appointment scheduling system",
                "Integration with medical IoT devices",
                "HIPAA compliant data security"
            ]
        },

        // 🎯 OVERVIEW LENGKAP - Copy template ini untuk project baru
        overview: {
            // Masalah yang diselesaikan
            problem: "Healthcare facilities struggle with fragmented patient data, inefficient monitoring systems, and limited predictive capabilities. Patients often experience delays in diagnosis and treatment due to manual processes and lack of integrated systems.",

            // Solusi yang diberikan
            solution: "Developed an intelligent healthcare platform that integrates patient monitoring, predictive analytics, and telemedicine. The system uses AI to predict health risks, provides real-time alerts for critical conditions, and enables seamless communication between patients and healthcare providers.",

            // Tantangan dan solusinya
            challenges: [
                {
                    title: "Real-time Data Processing",
                    description: "Processing and analyzing vital signs data from multiple IoT devices in real-time while maintaining accuracy",
                    solution: "Implemented Redis for caching and WebSocket connections for real-time data streaming. Used background workers for processing heavy analytics tasks."
                },
                {
                    title: "Data Privacy & Security",
                    description: "Ensuring HIPAA compliance and protecting sensitive patient health information",
                    solution: "Implemented end-to-end encryption, role-based access control (RBAC), audit logging, and regular security audits. Used secure communication protocols (TLS/SSL)."
                },
                {
                    title: "AI Model Accuracy",
                    description: "Building reliable predictive models for disease risk assessment with limited training data",
                    solution: "Applied transfer learning from pre-trained medical models, data augmentation techniques, and ensemble methods to improve accuracy to 93%."
                },
                {
                    title: "System Scalability",
                    description: "Handling thousands of concurrent users and real-time monitoring sessions",
                    solution: "Designed microservices architecture with Docker, implemented load balancing, database sharding, and horizontal scaling on cloud infrastructure."
                }
            ],

            // Gallery dengan screenshots/images
            gallery: [
                {
                    image: "/api/placeholder/800/600",
                    title: "Patient Dashboard",
                    description: "Comprehensive view of patient health metrics, medication schedule, and upcoming appointments with real-time vital signs monitoring"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "AI Prediction Interface",
                    description: "Disease risk assessment dashboard showing probability scores, risk factors, and recommended preventive actions"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Telemedicine Console",
                    description: "Video consultation interface with integrated EHR, prescription writing, and real-time vital signs display"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Admin Analytics Panel",
                    description: "Hospital-wide statistics, patient flow analysis, resource utilization, and performance metrics"
                },
                {
                    image: "/api/placeholder/800/600",
                    title: "Mobile App Interface",
                    description: "Patient mobile app for booking appointments, viewing health records, and communicating with doctors"
                }
            ],

            // Metrics/Key Results
            metrics: [
                {
                    label: "Diagnosis Time",
                    value: "60% Faster",
                    description: "Reduced average time to diagnosis"
                },
                {
                    label: "Patient Satisfaction",
                    value: "4.8/5.0",
                    description: "Average user rating"
                },
                {
                    label: "Active Users",
                    value: "25,000+",
                    description: "Registered patients and doctors"
                },
                {
                    label: "Prediction Accuracy",
                    value: "93%",
                    description: "AI disease risk assessment"
                }
            ],

            // Technical Highlights
            technicalHighlights: [
                {
                    title: "Microservices Architecture",
                    description: "Separated concerns into patient management, analytics, telemedicine, and notification services for better scalability and maintenance",
                    tech: ["FastAPI", "Docker", "Kubernetes", "NGINX"]
                },
                {
                    title: "Real-time Monitoring System",
                    description: "WebSocket-based system for streaming vital signs data from IoT devices with sub-second latency",
                    tech: ["WebSocket", "Redis", "MQTT", "Socket.io"]
                },
                {
                    title: "AI Prediction Engine",
                    description: "Deep learning models for disease risk prediction, anomaly detection in vital signs, and treatment recommendation",
                    tech: ["TensorFlow", "Scikit-learn", "XGBoost", "LIME"]
                },
                {
                    title: "Secure Data Pipeline",
                    description: "HIPAA-compliant data handling with encryption at rest and in transit, audit logging, and access controls",
                    tech: ["PostgreSQL", "AES-256", "JWT", "OAuth 2.0"]
                }
            ],

            // Links & Resources (CONTOH LENGKAP SEMUA JENIS LINK)
            links: {
                // Link ke website/aplikasi live
                live: "https://healthcare-demo.vercel.app",

                // Link ke GitHub repository
                github: "https://github.com/username/smart-healthcare",

                // Link ke Google Colab notebook (untuk ML/AI projects)
                colab: "https://colab.research.google.com/drive/abc123",

                // Link ke dokumentasi teknis
                documentation: "https://docs.healthcare-system.com",

                // Link ke demo video/YouTube
                demo: "https://youtube.com/watch?v=abc123",

                // Link ke research paper (untuk research projects)
                paper: "https://arxiv.org/abs/2024.12345",

                // Custom links (bisa tambah link apapun)
                custom: [
                    {
                        label: "API Documentation",
                        url: "https://api.healthcare-system.com/docs"
                    },
                    {
                        label: "Case Study",
                        url: "https://medium.com/@username/healthcare-case-study"
                    },
                    {
                        label: "Figma Design",
                        url: "https://figma.com/file/abc123"
                    },
                    {
                        label: "Postman Collection",
                        url: "https://postman.com/collections/abc123"
                    }
                ]
            },

            // Research & Experiments (KHUSUS untuk ML/AI projects)
            research: {
                experiments: [
                    {
                        name: "Baseline Model",
                        accuracy: "85.2%",
                        improvements: [
                            "Simple CNN architecture",
                            "Limited preprocessing",
                            "Basic data augmentation"
                        ],
                        notes: "Initial model using ResNet-50"
                    },
                    {
                        name: "Improved Architecture",
                        accuracy: "90.5%",
                        improvements: [
                            "Added attention mechanisms",
                            "Enhanced feature extraction",
                            "Ensemble of 3 models"
                        ],
                        notes: "Significant improvement with EfficientNet"
                    },
                    {
                        name: "Final Optimized Model",
                        accuracy: "93.1%",
                        improvements: [
                            "Transfer learning from medical dataset",
                            "Advanced augmentation techniques",
                            "Model distillation for speed"
                        ],
                        notes: "Production-ready model"
                    }
                ],

                notebooks: [
                    {
                        title: "Data Analysis & Exploration",
                        url: "https://colab.research.google.com/drive/data-exploration",
                        description: "Exploratory data analysis, statistical tests, and data quality assessment for medical datasets"
                    },
                    {
                        title: "Model Training & Evaluation",
                        url: "https://colab.research.google.com/drive/model-training",
                        description: "Complete pipeline for training, validating, and testing disease prediction models with hyperparameter tuning"
                    },
                    {
                        title: "Model Deployment & Testing",
                        url: "https://colab.research.google.com/drive/deployment",
                        description: "Model optimization, quantization, and deployment testing with performance benchmarking"
                    }
                ]
            },

            // Team & Contributions
            team: {
                size: "5 members",
                role: "Full Stack Developer & ML Engineer",
                responsibilities: [
                    "Led backend API development using FastAPI and PostgreSQL",
                    "Developed and trained ML models for disease risk prediction",
                    "Implemented real-time monitoring system with WebSocket",
                    "Designed and implemented microservices architecture",
                    "Set up CI/CD pipeline and deployment infrastructure",
                    "Conducted code reviews and mentored junior developers"
                ]
            },

            // Complete Tech Stack (Detail per layer)
            techStack: {
                frontend: ["React 18", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query", "Chart.js", "Socket.io-client"],
                backend: ["FastAPI", "Python 3.11", "Celery", "PostgreSQL", "Redis", "MongoDB", "WebSocket"],
                ml: ["TensorFlow", "Scikit-learn", "XGBoost", "LIME", "Pandas", "NumPy"],
                tools: ["Docker", "Kubernetes", "Git", "Postman", "Figma", "Jira"],
                deployment: ["Vercel", "AWS EC2", "AWS S3", "AWS RDS", "Nginx", "GitHub Actions"]
            },

            // Future Improvements
            futureImprovements: [
                "Implement voice-controlled interface for accessibility",
                "Add support for wearable device integration (Apple Watch, Fitbit)",
                "Develop mobile apps for iOS and Android platforms",
                "Integrate with national electronic health record systems",
                "Add multi-language support for international expansion",
                "Implement blockchain for secure medical record sharing"
            ]
        }
    },
];

export const ProjectsProvider = ({ children }) => {
    const [projects] = useState(projectsData);
    const [loading] = useState(false);

    const getProject = (id) => {
        return projects.find(project => project.id === Number(id));
    };

    const value = {
        projects,
        loading,
        getProject,
    };

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};