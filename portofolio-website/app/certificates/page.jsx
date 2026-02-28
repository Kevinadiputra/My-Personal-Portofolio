"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Award, Calendar, Star, Filter, Search, CheckCircle, Clock, BookOpen, Trophy, Zap, Target
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CertificatesProvider, useCertificates } from "@/context/CertificatesContext";

const CertificatesPageContent = () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const { certificates, loading } = useCertificates();
    const router = useRouter();

    const filters = [
        { key: "all", label: "All", icon: Award },
        { key: "featured", label: "Featured", icon: Star },
        { key: "ai-ml", label: "AI & ML", icon: Zap },
        { key: "data", label: "Data Science", icon: Trophy },
        { key: "cloud", label: "Cloud", icon: Target },
    ];

    const sortOptions = [
        { key: "newest", label: "Newest First" },
        { key: "oldest", label: "Oldest First" },
        { key: "featured", label: "Featured First" },
        { key: "alphabetical", label: "A-Z" },
    ];

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
                case "newest": return new Date(b.date) - new Date(a.date);
                case "oldest": return new Date(a.date) - new Date(b.date);
                case "featured": return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case "alphabetical": return a.title.localeCompare(b.title);
                default: return 0;
            }
        });

    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner': return 'text-green-400 bg-green-400/20';
            case 'intermediate': return 'text-blue-400 bg-blue-400/20';
            case 'advanced': return 'text-orange-400 bg-orange-400/20';
            case 'professional': return 'text-purple-400 bg-purple-400/20';
            default: return 'text-gray-400 bg-gray-400/20';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
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
                <section className="py-16 bg-gradient-to-br from-primary via-secondary to-tertiary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">My Certificates</h1>
                        <div className="w-32 h-1 bg-accent mx-auto rounded-full mb-8"></div>
                        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                            Continuous learning through industry-recognized certifications in
                            machine learning, data science, and cloud technologies.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{certificates.length}</div>
                                <div className="text-sm text-white/60">Certificates</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{certificates.filter(c => c.featured).length}</div>
                                <div className="text-sm text-white/60">Featured</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{new Set(certificates.flatMap(c => c.skills)).size}</div>
                                <div className="text-sm text-white/60">Skills</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">2+</div>
                                <div className="text-sm text-white/60">Years</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters and Search */}
                <section className="py-12 bg-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

                        <div className="flex flex-wrap justify-center gap-3">
                            {filters.map((filterOption) => {
                                const IconComponent = filterOption.icon;
                                return (
                                    <button
                                        key={filterOption.key}
                                        onClick={() => setFilter(filterOption.key)}
                                        className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm ${filter === filterOption.key
                                            ? "bg-accent text-white shadow-lg"
                                            : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white"
                                            }`}
                                    >
                                        <IconComponent size={16} />
                                        {filterOption.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 text-white/70">
                                <Filter size={18} />
                                <span>{filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''} found</span>
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-tertiary border border-tertiary-hover rounded-xl text-white focus:outline-none focus:border-accent"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.key} value={option.key}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Certificates Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredCertificates.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-tertiary flex items-center justify-center">
                                    <Award size={32} className="text-accent/50" />
                                </div>
                                <h3 className="text-xl text-white mb-2">No Certificates Found</h3>
                                <p className="text-white/70 mb-6">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setFilter("all"); setSearchTerm(""); }}
                                    className="bg-accent hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCertificates.map((certificate) => (
                                    <div
                                        key={certificate.id}
                                        className="bg-tertiary rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                        onClick={() => router.push(`/certificates/${certificate.id}`)}
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-accent/20 to-purple-700/20">
                                            {certificate.image && certificate.image !== "/api/placeholder/400/300" ? (
                                                <img src={certificate.image} alt={certificate.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Award size={48} className="text-accent/30" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {certificate.featured && (
                                                    <span className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                                                        <Star size={12} /> Featured
                                                    </span>
                                                )}
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(certificate.level)}`}>
                                                    {certificate.level}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors mb-2">
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

                                            <div className="flex flex-wrap gap-2">
                                                {certificate.skills.slice(0, 4).map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-primary rounded-full text-xs font-medium text-accent">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {certificate.skills.length > 4 && (
                                                    <span className="px-3 py-1 bg-primary rounded-full text-xs text-white/50">
                                                        +{certificate.skills.length - 4}
                                                    </span>
                                                )}
                                            </div>

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
                                                    <a
                                                        href={certificate.verifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-green-400 hover:text-green-300 font-medium flex items-center gap-1 text-sm"
                                                    >
                                                        Verify <CheckCircle size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-secondary">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Work Together?</h2>
                        <p className="text-white/70 mb-8 text-lg">
                            With professional certifications and continuous learning, I'm equipped
                            to tackle your next ML/DS project.
                        </p>
                        <button
                            onClick={() => router.push('/#contact')}
                            className="bg-accent hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                        >
                            Get In Touch
                        </button>
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
