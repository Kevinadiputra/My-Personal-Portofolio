"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Tag,
    Users,
    Award,
    Code,
    Lightbulb,
    TrendingUp,
    CheckCircle2,
    ChevronDown,
    FileCode,
    Book,
    Play,
    FileText,
    Globe,
    Briefcase,
    Eye,
    Star,
} from "lucide-react";
import { useProjects, ProjectsProvider } from "@/context/ProjectsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectDetailPageContent = () => {
    const params = useParams();
    const router = useRouter();
    const { getProject, projects, loading } = useProjects();
    const [project, setProject] = useState(null);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => {
        if (!loading && projects.length > 0) {
            const foundProject = getProject(parseInt(params.id));
            if (foundProject) {
                setProject(foundProject);

                // Find related projects (same category, exclude current)
                const related = projects
                    .filter(
                        (p) =>
                            p.category === foundProject.category && p.id !== foundProject.id
                    )
                    .slice(0, 3);
                setRelatedProjects(related);
            }
        }
    }, [params.id, projects, loading, getProject]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-white/70">Loading project...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Project Not Found
                    </h1>
                    <p className="text-white/70 mb-8">
                        The project you're looking for doesn't exist.
                    </p>
                    <motion.button
                        onClick={() => router.push("/")}
                        className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <Header />

            <main className="pt-20">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.button
                        onClick={() => router.push("/projects")}
                        className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors mb-8"
                        whileHover={{ x: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Projects
                    </motion.button>
                </div>

                {/* Project Header */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Project Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-2xl overflow-hidden">
                                {project.image && project.image !== "/api/placeholder/400/250" ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextSibling.style.display = "flex";
                                        }}
                                    />
                                ) : null}

                                {/* Fallback */}
                                <div
                                    className={`w-full h-full flex items-center justify-center text-8xl text-accent/30 ${project.image && project.image !== "/api/placeholder/400/250"
                                        ? "hidden"
                                        : "flex"
                                        }`}
                                >
                                    <Eye />
                                </div>
                            </div>

                            {/* Featured Badge */}
                            {project.featured && (
                                <motion.div
                                    className="absolute top-4 right-4 bg-accent px-4 py-2 rounded-full flex items-center gap-2 text-white font-semibold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Star size={16} />
                                    Featured
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Project Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-accent">
                                        <Tag size={16} />
                                        <span className="text-sm font-medium capitalize">
                                            {project.category}
                                        </span>
                                    </div>
                                    {project.featured && (
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star size={16} />
                                            <span className="text-sm">Featured</span>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {project.title}
                                </h1>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Tag size={20} />
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-4 py-2 bg-tertiary rounded-full text-accent font-medium"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.liveUrl && project.liveUrl !== "#" && (
                                    <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink size={20} />
                                        View Live Demo
                                    </motion.a>
                                )}

                                {project.githubUrl && project.githubUrl !== "#" && (
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-tertiary hover:bg-tertiary-hover text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github size={20} />
                                        View Source Code
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info Bar - Shown if overview exists */}
                {project.overview && project.overview.team && (
                    <section className="bg-secondary border-y border-white/10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-white/50">Date</p>
                                        <p className="font-semibold text-white">{project.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Tag className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-white/50">Category</p>
                                        <p className="font-semibold text-white capitalize">
                                            {project.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-white/50">Team Size</p>
                                        <p className="font-semibold text-white">
                                            {project.overview.team.size}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-white/50">Role</p>
                                        <p className="font-semibold text-white">
                                            {project.overview.team.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Comprehensive Overview Section */}
                {project.overview && (
                    <div className="space-y-16 py-16">
                        {/* Problem & Solution */}
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-white mb-4">
                                        Project Overview
                                    </h2>
                                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Problem Card */}
                                    {project.overview.problem && (
                                        <div className="bg-tertiary rounded-2xl p-8 border border-red-500/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                                    <Lightbulb className="w-6 h-6 text-red-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    The Problem
                                                </h3>
                                            </div>
                                            <p className="text-white/70 leading-relaxed">
                                                {project.overview.problem}
                                            </p>
                                        </div>
                                    )}

                                    {/* Solution Card */}
                                    {project.overview.solution && (
                                        <div className="bg-tertiary rounded-2xl p-8 border border-green-500/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    The Solution
                                                </h3>
                                            </div>
                                            <p className="text-white/70 leading-relaxed">
                                                {project.overview.solution}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </section>

                        {/* Key Metrics */}
                        {project.overview.metrics && project.overview.metrics.length > 0 && (
                            <section className="bg-secondary py-16">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="text-center mb-12">
                                            <h2 className="text-4xl font-bold text-white mb-4">
                                                Key Results
                                            </h2>
                                            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {project.overview.metrics.map((metric, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="bg-gradient-to-br from-accent to-accent-hover rounded-2xl p-6 text-white"
                                                >
                                                    <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
                                                    <div className="text-4xl font-bold mb-2">
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-lg font-semibold mb-1">
                                                        {metric.label}
                                                    </div>
                                                    {metric.description && (
                                                        <p className="text-sm opacity-90">
                                                            {metric.description}
                                                        </p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        )}

                        {/* Project Gallery */}
                        {project.overview.gallery && project.overview.gallery.length > 0 && (
                            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-center mb-12">
                                        <h2 className="text-4xl font-bold text-white mb-4">
                                            Project Gallery
                                        </h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        {project.overview.gallery.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="bg-tertiary rounded-2xl overflow-hidden"
                                            >
                                                <div className="relative h-64">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-white mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-white/70">{item.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Challenges & Solutions */}
                        {project.overview.challenges &&
                            project.overview.challenges.length > 0 && (
                                <section className="bg-secondary py-16">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="text-center mb-12">
                                                <h2 className="text-4xl font-bold text-white mb-4">
                                                    Challenges & Solutions
                                                </h2>
                                                <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                            </div>

                                            <div className="space-y-4 max-w-4xl mx-auto">
                                                {project.overview.challenges.map((challenge, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        viewport={{ once: true }}
                                                        className="bg-tertiary rounded-xl overflow-hidden"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                setActiveChallenge(
                                                                    activeChallenge === index ? null : index
                                                                )
                                                            }
                                                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                                                                    <Code className="w-5 h-5 text-accent" />
                                                                </div>
                                                                <span className="font-semibold text-lg text-white">
                                                                    {challenge.title}
                                                                </span>
                                                            </div>
                                                            <ChevronDown
                                                                className={`w-5 h-5 text-white/50 transition-transform ${activeChallenge === index ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        </button>

                                                        {activeChallenge === index && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="px-6 pb-6 space-y-4"
                                                            >
                                                                <div className="pl-14">
                                                                    <div className="mb-4">
                                                                        <h4 className="text-sm font-semibold text-white/50 uppercase mb-2">
                                                                            Challenge
                                                                        </h4>
                                                                        <p className="text-white/70">
                                                                            {challenge.description}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-sm font-semibold text-white/50 uppercase mb-2">
                                                                            Solution
                                                                        </h4>
                                                                        <p className="text-white/70">
                                                                            {challenge.solution}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </section>
                            )}

                        {/* Technical Highlights */}
                        {project.overview.technicalHighlights &&
                            project.overview.technicalHighlights.length > 0 && (
                                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="text-center mb-12">
                                            <h2 className="text-4xl font-bold text-white mb-4">
                                                Technical Highlights
                                            </h2>
                                            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {project.overview.technicalHighlights.map(
                                                (highlight, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        viewport={{ once: true }}
                                                        className="bg-tertiary rounded-xl p-6 border border-white/5"
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <Award className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-xl font-bold text-white mb-2">
                                                                    {highlight.title}
                                                                </h3>
                                                                <p className="text-white/70 mb-4">
                                                                    {highlight.description}
                                                                </p>
                                                                {highlight.tech && highlight.tech.length > 0 && (
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {highlight.tech.map((tech, techIndex) => (
                                                                            <span
                                                                                key={techIndex}
                                                                                className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                                                                            >
                                                                                {tech}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                </section>
                            )}

                        {/* Research & Experiments (ML/AI Projects) */}
                        {project.overview.research && (
                            <section className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 py-16">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="text-center mb-12">
                                            <h2 className="text-4xl font-bold text-white mb-4">
                                                Research & Experiments
                                            </h2>
                                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                                        </div>

                                        {/* Experiments */}
                                        {project.overview.research.experiments &&
                                            project.overview.research.experiments.length > 0 && (
                                                <div className="mb-12">
                                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                                        <FileCode className="w-6 h-6 text-purple-400" />
                                                        Experiments
                                                    </h3>
                                                    <div className="grid md:grid-cols-3 gap-6">
                                                        {project.overview.research.experiments.map(
                                                            (exp, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="bg-tertiary rounded-xl p-6"
                                                                >
                                                                    <div className="text-sm font-semibold text-purple-400 mb-2">
                                                                        {exp.name}
                                                                    </div>
                                                                    <div className="text-3xl font-bold text-white mb-4">
                                                                        {exp.accuracy}
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {exp.improvements.map((improvement, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className="flex items-start gap-2 text-sm text-white/70"
                                                                            >
                                                                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                                                <span>{improvement}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Notebooks */}
                                        {project.overview.research.notebooks &&
                                            project.overview.research.notebooks.length > 0 && (
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                                        <Book className="w-6 h-6 text-blue-400" />
                                                        Google Colab Notebooks
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {project.overview.research.notebooks.map(
                                                            (notebook, index) => (
                                                                <a
                                                                    key={index}
                                                                    href={notebook.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="block bg-tertiary rounded-xl p-6 hover:bg-white/5 transition-all border border-white/5 hover:border-blue-500/50"
                                                                >
                                                                    <div className="flex items-start justify-between gap-4">
                                                                        <div className="flex-1">
                                                                            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                                                                {notebook.title}
                                                                                <ExternalLink className="w-4 h-4 text-blue-400" />
                                                                            </h4>
                                                                            <p className="text-white/70">
                                                                                {notebook.description}
                                                                            </p>
                                                                        </div>
                                                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                            <FileCode className="w-6 h-6 text-blue-400" />
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </motion.div>
                                </div>
                            </section>
                        )}

                        {/* Links & Resources */}
                        {project.overview.links && (
                            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-center mb-12">
                                        <h2 className="text-4xl font-bold text-white mb-4">
                                            Links & Resources
                                        </h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {project.overview.links.live && (
                                            <a
                                                href={project.overview.links.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <Globe className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">Live Demo</h3>
                                                <p className="text-sm opacity-90">
                                                    View the live project
                                                </p>
                                            </a>
                                        )}

                                        {project.overview.links.github && (
                                            <a
                                                href={project.overview.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <Github className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">Source Code</h3>
                                                <p className="text-sm opacity-90">View on GitHub</p>
                                            </a>
                                        )}

                                        {project.overview.links.colab && (
                                            <a
                                                href={project.overview.links.colab}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <FileCode className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">Google Colab</h3>
                                                <p className="text-sm opacity-90">Open in Colab</p>
                                            </a>
                                        )}

                                        {project.overview.links.documentation && (
                                            <a
                                                href={project.overview.links.documentation}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <Book className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">
                                                    Documentation
                                                </h3>
                                                <p className="text-sm opacity-90">Read the docs</p>
                                            </a>
                                        )}

                                        {project.overview.links.demo && (
                                            <a
                                                href={project.overview.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <Play className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">Demo Video</h3>
                                                <p className="text-sm opacity-90">Watch demo</p>
                                            </a>
                                        )}

                                        {project.overview.links.paper && (
                                            <a
                                                href={project.overview.links.paper}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                            >
                                                <FileText className="w-8 h-8 mb-3" />
                                                <h3 className="text-lg font-bold mb-1">
                                                    Research Paper
                                                </h3>
                                                <p className="text-sm opacity-90">Read the paper</p>
                                            </a>
                                        )}

                                        {project.overview.links.custom &&
                                            project.overview.links.custom.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 hover:scale-105 transition-all"
                                                >
                                                    <ExternalLink className="w-8 h-8 mb-3" />
                                                    <h3 className="text-lg font-bold mb-1">
                                                        {link.label}
                                                    </h3>
                                                    <p className="text-sm opacity-90">View resource</p>
                                                </a>
                                            ))}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Team & Contributions */}
                        {project.overview.team && (
                            <section className="bg-secondary py-16">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="text-center mb-12">
                                            <h2 className="text-4xl font-bold text-white mb-4">
                                                Team & Contributions
                                            </h2>
                                            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                        </div>

                                        <div className="max-w-3xl mx-auto">
                                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                <div className="text-center p-6 bg-tertiary rounded-xl">
                                                    <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                                                    <div className="text-3xl font-bold text-white mb-1">
                                                        {project.overview.team.size}
                                                    </div>
                                                    <div className="text-white/70">Team Members</div>
                                                </div>
                                                <div className="text-center p-6 bg-tertiary rounded-xl">
                                                    <Briefcase className="w-12 h-12 text-accent mx-auto mb-3" />
                                                    <div className="text-2xl font-bold text-white mb-1">
                                                        {project.overview.team.role}
                                                    </div>
                                                    <div className="text-white/70">My Role</div>
                                                </div>
                                            </div>

                                            <div className="bg-tertiary rounded-xl p-8">
                                                <h3 className="text-xl font-bold text-white mb-4">
                                                    Key Responsibilities
                                                </h3>
                                                <div className="space-y-3">
                                                    {project.overview.team.responsibilities.map(
                                                        (responsibility, index) => (
                                                            <div key={index} className="flex items-start gap-3">
                                                                <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                                                <span className="text-white/70">
                                                                    {responsibility}
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        )}

                        {/* Complete Tech Stack */}
                        {project.overview.techStack && (
                            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-center mb-12">
                                        <h2 className="text-4xl font-bold text-white mb-4">
                                            Complete Tech Stack
                                        </h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {project.overview.techStack.frontend && (
                                            <div className="bg-tertiary rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-blue-400" />
                                                    Frontend
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.overview.techStack.frontend.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {project.overview.techStack.backend && (
                                            <div className="bg-tertiary rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-green-400" />
                                                    Backend
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.overview.techStack.backend.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {project.overview.techStack.ml && (
                                            <div className="bg-tertiary rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-purple-400" />
                                                    ML/AI
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.overview.techStack.ml.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {project.overview.techStack.tools && (
                                            <div className="bg-tertiary rounded-xl p-6">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-orange-400" />
                                                    Tools
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.overview.techStack.tools.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {project.overview.techStack.deployment && (
                                            <div className="bg-tertiary rounded-xl p-6 md:col-span-2">
                                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-red-400" />
                                                    Deployment
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.overview.techStack.deployment.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Future Improvements */}
                        {project.overview.futureImprovements &&
                            project.overview.futureImprovements.length > 0 && (
                                <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 py-16">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="text-center mb-12">
                                                <h2 className="text-4xl font-bold text-white mb-4">
                                                    Future Improvements
                                                </h2>
                                                <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full" />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                                                {project.overview.futureImprovements.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 p-4 bg-tertiary rounded-lg"
                                                        >
                                                            <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                <span className="text-white text-xs font-bold">
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                            <span className="text-white/70">{item}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                </section>
                            )}
                    </div>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <section className="py-16 bg-secondary">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Related Projects
                                </h2>
                                <p className="text-white/70">
                                    Other projects in the {project.category} category
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map((relatedProject, index) => (
                                    <motion.div
                                        key={relatedProject.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-tertiary rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                        onClick={() => router.push(`/project/${relatedProject.id}`)}
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-hover/20">
                                            {relatedProject.image &&
                                                relatedProject.image !== "/api/placeholder/400/250" ? (
                                                <img
                                                    src={relatedProject.image}
                                                    alt={relatedProject.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Eye size={32} className="text-accent/30" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                                {relatedProject.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {relatedProject.technologies
                                                    .slice(0, 3)
                                                    .map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-2 py-1 bg-primary rounded text-xs text-accent"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                {relatedProject.technologies.length > 3 && (
                                                    <span className="px-2 py-1 bg-primary rounded text-xs text-white/50">
                                                        +{relatedProject.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center bg-gradient-to-r from-accent to-accent-hover rounded-2xl p-12"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Interested in this project?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Let's discuss how we can work together
                            </p>
                            <button
                                onClick={() => router.push("/#contact")}
                                className="px-8 py-4 bg-white text-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Get in Touch
                            </button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const ProjectDetailPage = () => {
    return (
        <ProjectsProvider>
            <ProjectDetailPageContent />
        </ProjectsProvider>
    );
};

export default ProjectDetailPage;