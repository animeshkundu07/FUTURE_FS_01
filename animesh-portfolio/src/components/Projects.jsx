import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';
import wanderlustImg from '../assets/wanderlust-preview.jpeg';
import nexusImg from '../assets/nexus-preview.jpeg';


// const projectImages = {
//   'WanderLust': require('../assets/wanderlust-preview.jpeg'),
//   'Nexus':      require('../assets/nexus-preview.jpeg'),
// };
const projectImages = {
  'WanderLust': wanderlustImg,
  'Nexus':      nexusImg,
};

function ProjectCard({ project, delay }) {
  const ref = useScrollReveal();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="project-card reveal" ref={ref} style={{ transitionDelay: `${delay}s` }}>

      
      <div className="project-preview">
        {!imgError && projectImages[project.name] ? (
          <img
  src={projectImages[project.name]}
  alt={`${project.name} screenshot`}
  className="project-screenshot"
  onError={() => setImgError(true)}
/>) : (
          <div className="project-preview-fallback">
            <span>{project.icon}</span>
            <p>Screenshot coming soon</p>
          </div>
        )}

        
        <div className="project-preview-overlay">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="overlay-btn overlay-btn--primary"
          >
            ↗ Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="overlay-btn overlay-btn--secondary"
          >
             GitHub
          </a>
        </div>
      </div>

      
      <div className="project-body">
        <div className="project-meta">
          <div className="project-name">{project.name}</div>
          <div className="project-links-row">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">↗</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="GitHub">GH</a>
          </div>
        </div>

        <div className="project-tagline">{project.tagline}</div>
        <p className="project-desc">{project.description}</p>

        <div className="project-features">
          {project.features.map((f, i) => (
            <div key={i} className="feature">{f}</div>
          ))}
        </div>
      </div>

      
      <div className="project-footer">
        {project.techStack.map(tech => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>

    </div>
  );
}

export default function Projects() {
  const titleRef = useScrollReveal();

  return (
    <section id="projects" className="projects-section">
      <div className="reveal" ref={titleRef}>
        {/* <span className="section-label">// 03 — projects</span> */}
        <h2 className="section-title">What I've Built</h2>
        <div className="divider" />
        <p className="section-sub">Real projects, live on the web — built from scratch with modern tools.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
