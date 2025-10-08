"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Award,
    Calendar,
    ExternalLink,
    CheckCircle,
    Clock,
    BookOpen,
    Building,
    ArrowLeft,
    Share2,
    Star,
    Lightbulb,
    Code,
    Trophy,
    Target
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CertificatesProvider, useCertificates } from "@/context/CertificatesContext";
import { ProjectsProvider, useProjects } from "@/context/ProjectsContext";

const CertificateDetailContent = () => {
    const params = useParams();
    const router = useRouter();
    const { getCertificate, loading } = useCertificates();
    const { getProject, projects } = useProjects();

    const certificate = getCertificate(params.id);

    // Get related projects by IDs
    const relatedProjectsData = certificate?.relatedProjects
        ? certificate.relatedProjects.map(id => getProject(id)).filter(Boolean)
        : [];

    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'text-green-400 bg-green-400/20 border-green-400/30';
            case 'intermediate':
                return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
            case 'advanced':
                return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
            case 'expert':
                return 'text-red-400 bg-red-400/20 border-red-400/30';
            case 'professional':
                return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
            default:
                return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: certificate.title,
                text: `Check out my ${certificate.title} certificate from ${certificate.issuer}`,
                url: window.location.href,
            }).catch((error) => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                        <p className="text-white/70">Loading certificate...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!certificate) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Award size={64} className="text-accent/50 mx-auto mb-4" />
                        <h2 className="text-2xl text-white mb-4">Certificate Not Found</h2>
                        <p className="text-white/70 mb-8">The certificate you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.push('/certificates')}
                            className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl transition-colors"
                        >
                            Back to Certificates
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <Header />

            <main className="pt-20 pb-16">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
                        whileHover={{ x: -5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Certificates
                    </motion.button>
                </div>

                {/* Certificate Detail */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Certificate Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent-hover/20 aspect-video">
                                {certificate.image && certificate.image !== "/api/placeholder/400/300" ? (
                                    <img
                                        src={certificate.image}
                                        alt={certificate.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Award size={64} className="text-accent/30" />
                                    </div>
                                )}

                                {/* Badges Overlay */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {certificate.featured && (
                                        <div className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm">
                                            <Star size={12} />
                                            Featured
                                        </div>
                                    )}
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getLevelColor(certificate.level)}`}>
                                        {certificate.level}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                {certificate.verifyUrl && certificate.verifyUrl !== '#' && (
                                    <motion.a
                                        href={certificate.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <CheckCircle size={20} />
                                        Verify Certificate
                                    </motion.a>
                                )}
                                <motion.button
                                    onClick={handleShare}
                                    className="bg-tertiary hover:bg-tertiary-hover text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Share2 size={20} />
                                    Share
                                </motion.button>
                            </div>

                            {/* Certificate Info Card */}
                            <motion.div
                                className="bg-tertiary rounded-2xl p-6 space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold text-white mb-4">Certificate Information</h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Building size={18} className="text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-white/60 text-sm">Issued By</p>
                                            <p className="text-white font-medium">{certificate.issuer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <BookOpen size={18} className="text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-white/60 text-sm">Platform</p>
                                            <p className="text-white font-medium">{certificate.platform}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-white/60 text-sm">Issue Date</p>
                                            <p className="text-white font-medium">{certificate.date}</p>
                                        </div>
                                    </div>

                                    {certificate.duration && (
                                        <div className="flex items-start gap-3">
                                            <Clock size={18} className="text-accent mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-white/60 text-sm">Duration</p>
                                                <p className="text-white font-medium">{certificate.duration}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Certificate Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Title and Description */}
                            <div>
                                <motion.h1
                                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {certificate.title}
                                </motion.h1>

                                <motion.div
                                    className="flex items-center gap-2 text-white/60 mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Award size={20} className="text-accent" />
                                    <span className="font-medium text-accent">{certificate.issuer}</span>
                                    <span>•</span>
                                    <span>{certificate.category}</span>
                                </motion.div>

                                <motion.p
                                    className="text-white/70 leading-relaxed text-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {certificate.description}
                                </motion.p>
                            </div>

                            {/* Skills Learned */}
                            <motion.div
                                className="bg-secondary rounded-2xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">Skills & Technologies</h3>
                                <div className="flex flex-wrap gap-3">
                                    {certificate.skills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-4 py-2 bg-tertiary rounded-xl text-sm font-medium text-accent border border-accent/20 hover:bg-accent hover:text-white transition-colors cursor-default"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Verification Section */}
                            {certificate.verifyUrl && certificate.verifyUrl !== '#' && (
                                <motion.div
                                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle size={24} className="text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-white mb-2">Certificate Verification</h4>
                                            <p className="text-white/70 text-sm mb-4">
                                                This certificate can be verified through the official platform. Click the button below to view the original certificate and verify its authenticity.
                                            </p>
                                            <a
                                                href={certificate.verifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors"
                                            >
                                                View Original Certificate
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Overview Section - Projects & Achievements */}
                    {certificate.overview && (
                        <motion.div
                            className="space-y-12"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {/* Overview Header */}
                            <div className="text-center">
                                <motion.div
                                    className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-6"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Lightbulb className="text-accent" size={24} />
                                    <span className="text-accent font-semibold">Practical Application</span>
                                </motion.div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    What I Built With This Certificate
                                </h2>
                                <p className="text-white/70 text-lg max-w-3xl mx-auto">
                                    {certificate.overview.summary}
                                </p>
                            </div>

                            {/* Projects Grid */}
                            {certificate.overview.projects && certificate.overview.projects.length > 0 && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Code className="text-accent" size={28} />
                                        Featured Projects
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {certificate.overview.projects.map((project, index) => (
                                            <motion.div
                                                key={index}
                                                className="bg-secondary rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {/* Project Image */}
                                                <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent-hover/20 overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
                                                </div>

                                                {/* Project Content */}
                                                <div className="p-6 space-y-4">
                                                    <h4 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                                                        {project.title}
                                                    </h4>
                                                    <p className="text-white/70 text-sm leading-relaxed">
                                                        {project.description}
                                                    </p>

                                                    {/* Tech Stack */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tech.map((tech, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="px-3 py-1 bg-tertiary rounded-lg text-xs font-medium text-accent"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Highlights */}
                                                    <div className="pt-4 border-t border-tertiary">
                                                        <p className="text-white/60 text-xs font-semibold mb-3">Key Highlights:</p>
                                                        <ul className="space-y-2">
                                                            {project.highlights.map((highlight, hIndex) => (
                                                                <li key={hIndex} className="flex items-start gap-2 text-white/70 text-sm">
                                                                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                                                                    <span>{highlight}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Projects from ProjectsContext */}
                            {relatedProjectsData && relatedProjectsData.length > 0 && (
                                <motion.div
                                    className="mt-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <Code className="text-accent" size={32} />
                                        <h3 className="text-2xl font-bold text-white">Related Projects</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {relatedProjectsData.map((project, index) => (
                                            <motion.div
                                                key={project.id}
                                                className="bg-tertiary rounded-xl overflow-hidden hover:bg-tertiary-hover transition-colors cursor-pointer group"
                                                onClick={() => router.push(`/project/${project.id}`)}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {/* Project Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {project.featured && (
                                                        <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full">
                                                            <Star className="w-4 h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Project Info */}
                                                <div className="p-6">
                                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                                        {project.title}
                                                    </h4>
                                                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="px-3 py-1 bg-primary rounded-full text-accent text-xs font-medium"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.technologies.length > 4 && (
                                                            <span className="px-3 py-1 bg-primary rounded-full text-white/50 text-xs">
                                                                +{project.technologies.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* View Project Link */}
                                                    <div className="flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                                                        View Project Details
                                                        <ExternalLink size={16} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Achievements */}
                            {certificate.overview.achievements && certificate.overview.achievements.length > 0 && (
                                <motion.div
                                    className="bg-gradient-to-br from-accent/10 to-accent-hover/10 border border-accent/20 rounded-2xl p-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <Trophy className="text-accent" size={32} />
                                        <h3 className="text-2xl font-bold text-white">Key Achievements</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {certificate.overview.achievements.map((achievement, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 1.3 + (index * 0.1) }}
                                            >
                                                <Target className="text-accent flex-shrink-0 mt-1" size={20} />
                                                <p className="text-white/80 text-sm leading-relaxed">{achievement}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Related Actions */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Interested in Working Together?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                onClick={() => router.push('/certificates')}
                                className="bg-tertiary hover:bg-tertiary-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Certificates
                            </motion.button>
                            <motion.button
                                onClick={() => router.push('/#contact')}
                                className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const CertificateDetailPage = () => {
    return (
        <ProjectsProvider>
            <CertificatesProvider>
                <CertificateDetailContent />
            </CertificatesProvider>
        </ProjectsProvider>
    );
};

export default CertificateDetailPage;
