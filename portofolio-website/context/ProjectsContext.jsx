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

const projectsData = [
    {
        id: 1,
        title: "Medical Image Classification System",
        description: "Deep learning-powered image classification system for medical diagnosis. Uses convolutional neural networks (CNN) to analyze medical images with 95% accuracy. Built with TensorFlow and deployed on cloud infrastructure.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Docker", "AWS"],
        category: "deep-learning",
        date: "2025",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        highlight: true,
        details: {
            duration: "4 months",
            status: "Completed",
            features: [
                "CNN-based image classification with 95% accuracy",
                "Data augmentation pipeline for limited datasets",
                "Grad-CAM visualization for model interpretability",
                "REST API for real-time inference",
                "Batch processing for bulk predictions",
                "Model versioning with MLflow",
                "Responsive web interface for image upload",
                "Automated model retraining pipeline"
            ]
        },
        overview: {
            problem: "Medical diagnosis through image analysis is time-consuming and requires expert radiologists. There's a need for an automated system that can assist in preliminary diagnosis while maintaining high accuracy.",
            solution: "Developed a deep learning system using Convolutional Neural Networks (CNN) to classify medical images with 95% accuracy. The system processes images in real-time and provides probability scores for different conditions.",
            challenges: [
                {
                    title: "Data Imbalance",
                    description: "Dataset had uneven distribution of different medical conditions",
                    solution: "Applied data augmentation techniques and weighted loss functions"
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
                { image: "/api/placeholder/800/600", title: "Model Architecture", description: "Custom CNN architecture with attention mechanisms" },
                { image: "/api/placeholder/800/600", title: "Training Dashboard", description: "Real-time training metrics" },
                { image: "/api/placeholder/800/600", title: "Prediction Interface", description: "Web interface for image analysis" },
                { image: "/api/placeholder/800/600", title: "Grad-CAM Visualization", description: "Heatmap showing model attention" }
            ],
            metrics: [
                { label: "Accuracy", value: "95.3%", description: "On test dataset" },
                { label: "Images Processed", value: "50K+", description: "Training dataset size" },
                { label: "Inference Time", value: "< 0.5s", description: "Per image prediction" },
                { label: "F1 Score", value: "0.94", description: "Balanced performance" }
            ],
            technicalHighlights: [
                { title: "Model Architecture", description: "Custom CNN with residual connections and attention mechanisms", tech: ["TensorFlow", "Keras", "ResNet"] },
                { title: "Data Pipeline", description: "Automated data preprocessing and augmentation pipeline", tech: ["OpenCV", "NumPy", "Albumentations"] },
                { title: "Model Serving", description: "Flask-based REST API with batch processing", tech: ["Flask", "Redis", "TensorFlow Serving"] },
                { title: "MLOps", description: "Complete ML pipeline with experiment tracking", tech: ["MLflow", "DVC", "Docker"] }
            ],
            links: {
                live: "#",
                github: "#",
                colab: "#",
                documentation: "#",
                custom: []
            },
            team: {
                size: "Solo Project",
                role: "ML Engineer",
                responsibilities: [
                    "Collected and preprocessed 50K+ medical images",
                    "Designed and trained custom CNN architecture",
                    "Built REST API for model inference",
                    "Deployed model on AWS with auto-scaling"
                ]
            },
            techStack: {
                ml: { primary: ["TensorFlow", "Keras", "Python"], additional: ["OpenCV", "NumPy", "Scikit-learn"] },
                backend: { primary: ["Flask", "Redis"], additional: ["Gunicorn"] },
                tools: ["Jupyter", "Google Colab", "TensorBoard", "MLflow"],
                deployment: ["AWS EC2", "Docker", "AWS S3"]
            },
            research: {
                experiments: [
                    { name: "Baseline CNN", description: "Simple 3-layer CNN", accuracy: "87.5%", notes: "Good baseline" },
                    { name: "ResNet Transfer Learning", description: "Pre-trained ResNet50", accuracy: "92.3%", notes: "Better performance" },
                    { name: "Custom + Attention", description: "Custom architecture with attention", accuracy: "95.3%", notes: "Best result" }
                ],
                notebooks: [
                    { title: "Data Exploration", url: "#", description: "Initial data analysis" },
                    { title: "Model Training", url: "#", description: "Training experiments" }
                ]
            },
            futureImprovements: [
                "Multi-class classification for more conditions",
                "Support for 3D medical imaging (CT/MRI)",
                "Improve interpretability with SHAP values",
                "Mobile app for on-the-go diagnosis"
            ]
        }
    },
    {
        id: 2,
        title: "NLP Sentiment Analysis Engine",
        description: "Natural Language Processing system for real-time sentiment analysis of customer reviews and social media data. Uses transformer-based models for multi-language support with 92% accuracy.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "PyTorch", "Hugging Face", "FastAPI", "PostgreSQL", "Docker"],
        category: "nlp",
        date: "2025",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        highlight: true,
        details: {
            duration: "3 months",
            status: "Completed",
            features: [
                "Real-time sentiment classification",
                "Multi-language support (EN, ID)",
                "Fine-tuned BERT model",
                "REST API for batch processing",
                "Dashboard for analytics visualization",
                "Automated data labeling pipeline"
            ]
        },
        overview: {
            problem: "Businesses need to understand customer sentiment at scale from reviews, social media, and feedback forms, but manual analysis is slow and subjective.",
            solution: "Built a transformer-based NLP pipeline that classifies sentiment in real-time with 92% accuracy, supporting multiple languages and integrating with business dashboards.",
            challenges: [
                { title: "Multi-language Support", description: "Handling Indonesian and English text", solution: "Used multilingual BERT and language-specific preprocessing" },
                { title: "Real-time Processing", description: "Low latency requirements for live feeds", solution: "Optimized model with ONNX Runtime and async processing" }
            ],
            gallery: [
                { image: "/api/placeholder/800/600", title: "Sentiment Dashboard", description: "Real-time analytics dashboard" },
                { image: "/api/placeholder/800/600", title: "Model Performance", description: "Confusion matrix and metrics" }
            ],
            metrics: [
                { label: "Accuracy", value: "92%", description: "Multi-class sentiment" },
                { label: "Latency", value: "< 100ms", description: "Per prediction" },
                { label: "Reviews Analyzed", value: "100K+", description: "Total processed" },
                { label: "Languages", value: "2", description: "EN & ID support" }
            ],
            technicalHighlights: [
                { title: "Model", description: "Fine-tuned multilingual BERT for sentiment classification", tech: ["PyTorch", "Hugging Face", "BERT"] },
                { title: "API", description: "High-performance async API with batch support", tech: ["FastAPI", "ONNX Runtime", "Redis"] }
            ],
            links: { live: "#", github: "#", colab: "#", custom: [] },
            team: { size: "Solo Project", role: "NLP Engineer", responsibilities: ["Data collection & annotation", "Model fine-tuning", "API development", "Dashboard creation"] },
            techStack: {
                ml: { primary: ["PyTorch", "Hugging Face", "BERT"], additional: ["ONNX", "Scikit-learn"] },
                backend: { primary: ["FastAPI", "PostgreSQL"], additional: ["Redis", "Celery"] },
                tools: ["Jupyter", "Weights & Biases", "Git"],
                deployment: ["Docker", "AWS"]
            },
            futureImprovements: ["Add aspect-based sentiment analysis", "Support more languages", "Implement active learning pipeline"]
        }
    },
    {
        id: 3,
        title: "Predictive Analytics Dashboard",
        description: "End-to-end data science project for sales forecasting and customer churn prediction using ensemble methods and time series analysis.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Plotly", "Streamlit"],
        category: "data-science",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        highlight: true,
        details: {
            duration: "2 months",
            status: "Completed",
            features: [
                "Sales forecasting with time series models",
                "Customer churn prediction (89% accuracy)",
                "Interactive Streamlit dashboard",
                "Automated feature engineering",
                "A/B test analysis module",
                "Exportable reports"
            ]
        },
        overview: {
            problem: "A retail business needed to predict future sales trends and identify customers at risk of churning to optimize marketing spend and inventory management.",
            solution: "Built a predictive analytics platform combining time series forecasting (Prophet, ARIMA) with ML-based churn prediction (XGBoost) served through an interactive Streamlit dashboard.",
            challenges: [
                { title: "Feature Engineering", description: "Creating meaningful features from raw transaction data", solution: "Built automated feature engineering pipeline with domain-specific transformations" },
                { title: "Model Selection", description: "Choosing the right model for different prediction tasks", solution: "Implemented model comparison framework and used ensemble methods" }
            ],
            gallery: [
                { image: "/api/placeholder/800/600", title: "Sales Forecast", description: "Interactive time series forecast visualization" },
                { image: "/api/placeholder/800/600", title: "Churn Analysis", description: "Customer segmentation and risk scoring" }
            ],
            metrics: [
                { label: "Churn Accuracy", value: "89%", description: "Prediction accuracy" },
                { label: "Forecast MAPE", value: "8.2%", description: "Sales forecast error" },
                { label: "Data Processed", value: "1M+", description: "Transaction records" },
                { label: "ROI Impact", value: "25%", description: "Marketing spend optimization" }
            ],
            technicalHighlights: [
                { title: "Forecasting", description: "Ensemble of Prophet and ARIMA models for robust predictions", tech: ["Prophet", "statsmodels", "Pandas"] },
                { title: "Classification", description: "XGBoost with SHAP explanations for churn prediction", tech: ["XGBoost", "SHAP", "Scikit-learn"] }
            ],
            links: { live: "#", github: "#", colab: "#", custom: [] },
            team: { size: "Solo Project", role: "Data Scientist", responsibilities: ["Data analysis & cleaning", "Feature engineering", "Model training & evaluation", "Dashboard development"] },
            techStack: {
                ml: { primary: ["Scikit-learn", "XGBoost", "Prophet"], additional: ["SHAP", "statsmodels"] },
                backend: { primary: ["Streamlit", "Python"], additional: ["Plotly"] },
                tools: ["Jupyter", "Pandas", "NumPy"],
                deployment: ["Streamlit Cloud"]
            },
            futureImprovements: ["Add real-time data ingestion", "Implement causal inference methods", "Build automated alerting system"]
        }
    },
    {
        id: 4,
        title: "Computer Vision Object Detection",
        description: "Real-time object detection system for autonomous vehicle research using YOLOv8. Detects vehicles, pedestrians, and traffic signs in various weather conditions.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "PyTorch", "YOLOv8", "OpenCV", "CUDA", "Roboflow"],
        category: "deep-learning",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false,
        details: {
            duration: "3 months",
            status: "Completed",
            features: [
                "Real-time object detection at 30+ FPS",
                "Multi-class detection (vehicles, pedestrians, signs)",
                "Weather-robust performance",
                "Custom dataset with 10K+ annotated images",
                "Model optimization with TensorRT"
            ]
        }
    },
    {
        id: 5,
        title: "Recommendation System",
        description: "Collaborative filtering and content-based recommendation engine for an e-learning platform. Personalizes course suggestions based on user behavior and preferences.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "Scikit-learn", "Pandas", "FastAPI", "Redis"],
        category: "data-science",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false,
        details: {
            duration: "2 months",
            status: "Completed",
            features: [
                "Hybrid recommendation (collaborative + content-based)",
                "Cold-start handling for new users",
                "Real-time recommendations via API",
                "A/B testing framework"
            ]
        }
    },
    {
        id: 6,
        title: "ETL Data Pipeline",
        description: "Automated ETL pipeline for processing and transforming large-scale datasets from multiple sources into a unified data warehouse for analytics.",
        image: "/api/placeholder/400/250",
        technologies: ["Python", "Apache Spark", "Airflow", "PostgreSQL", "Docker", "AWS S3"],
        category: "data-engineering",
        date: "2024",
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        highlight: false,
        details: {
            duration: "2 months",
            status: "Completed",
            features: [
                "Automated daily ETL workflows",
                "Multi-source data ingestion",
                "Data quality validation checks",
                "Scalable Spark processing",
                "Monitoring and alerting"
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
