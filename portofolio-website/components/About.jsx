"use client";

const About = () => {
  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "10+", label: "Technologies Mastered" },
    { number: "100%", label: "Client Satisfaction" },
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
                Passionate <span className="text-accent">Developer</span> & Problem Solver
              </h3>
              <p className="text-white/70 leading-relaxed">
                I'm a dedicated full-stack developer with a passion for creating innovative 
                digital solutions. With expertise in modern web technologies, I focus on 
                building scalable, user-friendly applications that make a real impact.
              </p>
              <p className="text-white/70 leading-relaxed">
                My journey in web development started with curiosity and has evolved into 
                a deep commitment to crafting exceptional digital experiences. I believe 
                in writing clean, maintainable code and staying up-to-date with the latest 
                industry trends and best practices.
              </p>
            </div>

            {/* Skills Summary */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Frontend</h4>
                <p className="text-white/60 text-sm">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Backend</h4>
                <p className="text-white/60 text-sm">Node.js, Python, PostgreSQL, MongoDB</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Tools</h4>
                <p className="text-white/60 text-sm">Git, Docker, AWS, Vercel</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Design</h4>
                <p className="text-white/60 text-sm">Figma, UI/UX Principles</p>
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
              <h4 className="text-white font-semibold mb-4">When I'm not coding...</h4>
              <div className="space-y-2 text-white/70">
                <p>🎵 Exploring new music and playing instruments</p>
                <p>📚 Reading tech blogs and learning new technologies</p>
                <p>🏃‍♂️ Staying active through running and fitness</p>
                <p>🎮 Gaming and exploring virtual worlds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;