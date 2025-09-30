"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Award,
    Calendar,
    ExternalLink,
    Star,
    Filter,
    Search,
    CheckCircle,
    Users,
    Clock,
    BookOpen,
    Trophy,
    Medal,
    Target,
    Zap
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoLoop from "@/components/LogoLoop";
import { CertificatesProvider, useCertificates } from "@/context/CertificatesContext";

const CertificatesPageContent = () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const { certificates, loading } = useCertificates();
    const router = useRouter();

    const filters = [
        { key: "all", label: "All Certificates", icon: Award },
        { key: "featured", label: "Featured", icon: Star },
        { key: "development", label: "Development", icon: BookOpen },
        { key: "ai-ml", label: "AI & ML", icon: Zap },
        { key: "cloud", label: "Cloud", icon: Target },
        { key: "data", label: "Data Science", icon: Trophy },
        { key: "management", label: "Management", icon: Users },
        { key: "mobile", label: "Mobile", icon: Medal },
    ];

    const sortOptions = [
        { key: "newest", label: "Newest First" },
        { key: "oldest", label: "Oldest First" },
        { key: "featured", label: "Featured First" },
        { key: "alphabetical", label: "A-Z" },
    ];

    // Skills for logo loop
    const skillsLogos = [
        { name: 'JavaScript', src: '/api/placeholder/48/48' },
        { name: 'React', src: '/api/placeholder/48/48' },
        { name: 'Node.js', src: '/api/placeholder/48/48' },
        { name: 'Python', src: '/api/placeholder/48/48' },
        { name: 'TensorFlow', src: '/api/placeholder/48/48' },
        { name: 'AWS', src: '/api/placeholder/48/48' },
        { name: 'Docker', src: '/api/placeholder/48/48' },
        { name: 'MongoDB', src: '/api/placeholder/48/48' },
        { name: 'PostgreSQL', src: '/api/placeholder/48/48' },
        { name: 'Tableau', src: '/api/placeholder/48/48' },
    ];

    // Filter and search certificates
    const filteredCertificates = certificates
        .filter(certificate => {
            const categoryMatch = filter === "all" ||
                (filter === "featured" && certificate.featured) ||
                certificate.category === filter;

            const searchMatch = !searchTerm ||
                certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                certificate.skills.some(skill =>
                    skill.toLowerCase().includes(searchTerm.toLowerCase())
                );

            return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.date) - new Date(a.date);
                case "oldest":
                    return new Date(a.date) - new Date(b.date);
                case "featured":
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'foundation':
                return 'text-green-400 bg-green-400/20';
            case 'intermediate':
                return 'text-blue-400 bg-blue-400/20';
            case 'professional':
                return 'text-purple-400 bg-purple-400/20';
            case 'advanced':
                return 'text-red-400 bg-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/20';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
                        <p className="text-white/70">Loading certificates...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-16 bg-gradient-to-br from-primary via-secondary to-tertiary relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.div
                                className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-8"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Trophy className="text-accent" size={24} />
                                <span className="text-accent font-semibold">Professional Certifications</span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-6xl font-bold text-white mb-6"
                                whileHover={{
                                    scale: 1.02,
                                    textShadow: "0 0 20px rgba(88, 16, 255, 0.5)"
                                }}
                            >
                                My Certificates
                            </motion.h1>
                            <motion.div
                                className="w-32 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: 128 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            <motion.p
                                className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Continuous learning and professional development through industry-recognized certifications
                                from leading institutions and technology platforms.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                                        {certificates.length}
                                    </div>
                                    <div className="text-sm text-white/60">Certificates</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                                        {certificates.filter(c => c.featured).length}
                                    </div>
                                    <div className="text-sm text-white/60">Featured</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                                        {new Set(certificates.flatMap(c => c.skills)).size}
                                    </div>
                                    <div className="text-sm text-white/60">Skills</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                                        {new Date().getFullYear() - 2020}+
                                    </div>
                                    <div className="text-sm text-white/60">Years</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-hover rounded-full blur-3xl"></div>
                    </div>
                </section>

                {/* Skills Logo Loop */}
                <section className="py-8 bg-secondary/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-center text-white/60 text-sm uppercase tracking-wider mb-6">
                                Skills & Technologies
                            </h3>
                            <LogoLoop
                                logos={skillsLogos}
                                speed={1}
                                direction="left"
                                pauseOnHover={true}
                                spacing={80}
                                className="h-16"
                                logoClassName="w-12 h-12 object-contain opacity-40 hover:opacity-80 transition-all duration-300"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Filters and Search */}
                <section className="py-12 bg-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search certificates by title, issuer, or skills..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-tertiary border border-tertiary-hover rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {filters.map((filterOption) => {
                                    const IconComponent = filterOption.icon;
                                    return (
                                        <motion.button
                                            key={filterOption.key}
                                            onClick={() => setFilter(filterOption.key)}
                                            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${filter === filterOption.key
                                                ? "bg-accent text-white shadow-lg scale-105"
                                                : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white hover:scale-105"
                                                }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconComponent size={18} />
                                            {filterOption.label}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Sort and Results Count */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <motion.div
                                    className="flex items-center gap-2 text-white/70"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Filter size={18} />
                                    <span>
                                        {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''} found
                                    </span>
                                </motion.div>

                                <motion.select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-tertiary border border-tertiary-hover rounded-xl text-white focus:outline-none focus:border-accent"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.key} value={option.key}>
                                            {option.label}
                                        </option>
                                    ))}
                                </motion.select>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Certificates Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredCertificates.length === 0 ? (
                            <motion.div
                                className="text-center py-20"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-tertiary flex items-center justify-center">
                                    <Award size={48} className="text-accent/50" />
                                </div>
                                <h3 className="text-2xl text-white mb-4">No Certificates Found</h3>
                                <p className="text-white/70 mb-8">
                                    {searchTerm
                                        ? `No certificates match "${searchTerm}". Try adjusting your search or filters.`
                                        : `No certificates found in the "${filter}" category.`
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter("all");
                                        setSearchTerm("");
                                    }}
                                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCertificates.map((certificate, index) => (
                                    <motion.div
                                        key={certificate.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-tertiary rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                                        }}
                                    >
                                        {/* Certificate Image */}
                                        <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent-hover/20 overflow-hidden">
                                            {certificate.image && certificate.image !== "/api/placeholder/400/300" ? (
                                                <img
                                                    src={certificate.image}
                                                    alt={certificate.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Award size={48} className="text-accent/30" />
                                                </div>
                                            )}

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {certificate.featured && (
                                                    <div className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                                                        <Star size={12} />
                                                        Featured
                                                    </div>
                                                )}
                                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(certificate.level)}`}>
                                                    {certificate.level}
                                                </div>
                                            </div>

                                            {/* Verify Link */}
                                            {certificate.verifyUrl && certificate.verifyUrl !== "#" && (
                                                <div className="absolute top-4 right-4">
                                                    <motion.a
                                                        href={certificate.verifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </motion.a>
                                                </div>
                                            )}
                                        </div>

                                        {/* Certificate Content */}
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2">
                                                    {certificate.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                                                    <span className="font-medium text-accent">{certificate.issuer}</span>
                                                    <span>•</span>
                                                    <span>{certificate.platform}</span>
                                                </div>
                                                <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                                                    {certificate.description}
                                                </p>
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2">
                                                {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {certificate.skills.length > 4 && (
                                                    <span className="px-3 py-1 bg-primary rounded-full text-xs text-white/50">
                                                        +{certificate.skills.length - 4} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Footer Info */}
                                            <div className="flex justify-between items-center pt-4 border-t border-primary">
                                                <div className="flex items-center gap-4 text-xs text-white/60">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>{certificate.date}</span>
                                                    </div>
                                                    {certificate.duration && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            <span>{certificate.duration}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {certificate.verifyUrl && certificate.verifyUrl !== "#" && (
                                                    <motion.a
                                                        href={certificate.verifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-accent hover:text-accent-hover font-medium flex items-center gap-2 transition-colors text-sm"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        Verify
                                                        <ExternalLink size={14} />
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-secondary">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Ready to Work Together?
                            </h2>
                            <p className="text-white/70 mb-8 text-lg">
                                With these professional certifications and continuous learning mindset,
                                I'm equipped to tackle your next project challenges.
                            </p>
                            <motion.button
                                onClick={() => router.push('/#contact')}
                                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors spark-on-click"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const CertificatesPage = () => {
    return (
        <CertificatesProvider>
            <CertificatesPageContent />
        </CertificatesProvider>
    );
};

export default CertificatesPage;