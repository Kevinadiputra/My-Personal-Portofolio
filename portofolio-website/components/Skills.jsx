"use client";

import { useState } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90, color: "bg-blue-500" },
        { name: "Next.js", level: 85, color: "bg-gray-700" },
        { name: "TypeScript", level: 80, color: "bg-blue-600" },
        { name: "Tailwind CSS", level: 95, color: "bg-cyan-500" },
        { name: "JavaScript", level: 90, color: "bg-yellow-500" },
        { name: "HTML/CSS", level: 95, color: "bg-orange-500" },
      ]
    },
    backend: {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85, color: "bg-green-600" },
        { name: "Python", level: 80, color: "bg-blue-400" },
        { name: "Express.js", level: 85, color: "bg-gray-600" },
        { name: "PostgreSQL", level: 75, color: "bg-blue-700" },
        { name: "MongoDB", level: 80, color: "bg-green-500" },
        { name: "REST APIs", level: 90, color: "bg-purple-500" },
      ]
    },
    tools: {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90, color: "bg-red-500" },
        { name: "Docker", level: 70, color: "bg-blue-500" },
        { name: "AWS", level: 65, color: "bg-orange-400" },
        { name: "Vercel", level: 85, color: "bg-gray-800" },
        { name: "Figma", level: 75, color: "bg-pink-500" },
        { name: "VS Code", level: 95, color: "bg-blue-600" },
      ]
    }
  };

  return (
    <section id="skills" className="py-20 bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="h2 text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-accent text-white shadow-lg scale-105"
                  : "bg-tertiary text-white/70 hover:bg-tertiary-hover hover:text-white"
              }`}
            >
              {skillCategories[category].title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-secondary p-6 rounded-2xl hover:bg-tertiary transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{skill.name}</h3>
                <span className="text-accent font-bold">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-tertiary rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                  style={{ 
                    width: `${skill.level}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
              
              {/* Skill Level Badge */}
              <div className="flex justify-end">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  skill.level >= 85 ? 'bg-green-500/20 text-green-400' :
                  skill.level >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {skill.level >= 85 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-tertiary p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-white font-semibold mb-4">Always Learning</h3>
            <p className="text-white/70 leading-relaxed">
              Technology evolves rapidly, and I'm committed to continuous learning. 
              Currently exploring <span className="text-accent font-medium">AI/ML integration</span>, 
              <span className="text-accent font-medium"> Web3 technologies</span>, and 
              <span className="text-accent font-medium"> advanced cloud architectures</span> 
              to stay at the forefront of web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;