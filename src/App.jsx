import React, { useState, useEffect } from 'react';
import './App.css';
import { BackgroundAmbient } from './components/BackgroundAmbient';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'light';
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Toast notification helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  return (
    <div className="app-container">
      {/* Subtle modern ambient background */}
      <BackgroundAmbient />

      {/* Header Navigation */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <AboutSection />

        {/* 3. Skills Section */}
        <SkillsSection />

        {/* 4. Projects Section */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          showToast={showToast}
        />

        {/* 5. Contact Section */}
        <ContactSection showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Case Study / Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
