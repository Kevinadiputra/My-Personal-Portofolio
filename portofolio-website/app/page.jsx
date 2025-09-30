"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import AdminPanel from "@/components/AdminPanel";
import { ProjectsProvider } from "@/context/ProjectsContext";

const Home = () => {
  return (
    <ProjectsProvider>
      <div className="relative">
        <LoadingScreen />
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <AdminPanel />
      </div>
    </ProjectsProvider>
  );
};

export default Home;
