"use client";

const About = () => {
    const stats = [
        { number: "2+", label: "Years Experience" },
        { number: "15+", label: "Projects Completed" },
        { number: "10+", label: "ML Models Deployed" },
        { number: "95%+", label: "Model Accuracy" },
    ];

    return (
        <section id="about" className="py-20 bg-secondary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="h2 text-white mb-4">About Me</h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="h3 text-white">
                                Passionate <span className="text-accent">Data Scientist</span> & ML Engineer
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                I'm a dedicated Machine Learning Engineer and Data Scientist with a passion
                                for building intelligent systems that solve real-world problems. I specialize
                                in developing end-to-end ML pipelines, from data collection and preprocessing
                                to model training, evaluation, and deployment.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                My journey in data science started with curiosity about how algorithms can
                                learn from data, and has evolved into expertise in deep learning, NLP,
                                computer vision, and predictive analytics. I believe in building robust,
                                scalable AI solutions backed by solid statistical foundations.
                            </p>
                        </div>

                        {/* Skills Summary */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="space-y-2">
                                <h4 className="text-white font-semibold">Machine Learning</h4>
                                <p className="text-white/60 text-sm">TensorFlow, PyTorch, Scikit-learn, XGBoost</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-semibold">Data Engineering</h4>
                                <p className="text-white/60 text-sm">Python, SQL, Pandas, Apache Spark</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-semibold">Visualization</h4>
                                <p className="text-white/60 text-sm">Matplotlib, Seaborn, Plotly, Tableau</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-semibold">Deployment</h4>
                                <p className="text-white/60 text-sm">Docker, AWS, GCP, MLflow</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Stats */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-tertiary p-6 rounded-2xl text-center hover:bg-tertiary-hover transition-colors group"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                                        {stat.number}
                                    </div>
                                    <div className="text-white/70 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Personal Interests */}
                        <div className="bg-tertiary p-6 rounded-2xl">
                            <h4 className="text-white font-semibold mb-4">When I'm not training models...</h4>
                            <div className="space-y-2 text-white/70">
                                <p>📊 Exploring new datasets on Kaggle</p>
                                <p>📚 Reading ML research papers on arXiv</p>
                                <p>🎵 Exploring new music and playing instruments</p>
                                <p>🏃‍♂️ Staying active through running and fitness</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
