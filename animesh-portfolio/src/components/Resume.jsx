import React, { useState } from 'react';
import { personalInfo, socialLinks, education, projects, skillGroups } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Resume.css';

function InlineResume() {
  return (
    <div className="resume-viewer">
      <div className="resume-viewer-header">
        <span className="resume-viewer-title">📄 Animesh_Kundu_CV — Preview</span>
        <a href={personalInfo.resumeFile} download className="btn-secondary resume-dl-sm">
          ↓ Download
        </a>
      </div>

      <div className="resume-content">
        <h2>Animesh Kundu</h2>
        <p className="resume-contact-line">
          {personalInfo.location} &nbsp;·&nbsp;
          {socialLinks.map((link, i) => (
            <React.Fragment key={link.name}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
              {i < socialLinks.length - 1 && ' · '}
            </React.Fragment>
          ))}
        </p>

        {/* Skills */}
        <div className="resume-section">
          <h3>Technical Skills</h3>
          {skillGroups.map(group => (
            <div key={group.label} className="resume-skill-row">
              <div className="resume-skill-label">{group.label}:</div>
              <div className="skills-inline">
                {group.skills.map(s => <span key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="resume-section">
          <h3>Education</h3>
          {education.map(edu => (
            <div key={edu.degree} className="resume-item">
              <div className="resume-item-title">{edu.degree}</div>
              <div className="resume-item-sub">{edu.school} · {edu.score}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="resume-section">
          <h3>Academic Projects</h3>
          {projects.map(proj => (
            <div key={proj.name} className="resume-item">
              <div className="resume-item-title">
                {proj.name}
                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-live-link">↗ Live</a>
              </div>
              <div className="resume-item-sub">{proj.techStack.join(' · ')}</div>
              <ul>
                {proj.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="resume-section">
          <h3>Achievements</h3>
          <div className="resume-item">
            <ul>
              <li>Active participant on LeetCode with 150+ problems solved</li>
              <li>Continuous learner exploring modern web technologies and frameworks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const [showInline, setShowInline] = useState(false);
  const titleRef = useScrollReveal();
  const cardRef = useScrollReveal();

  return (
    <section id="resume" className="resume-section">
      <div className="reveal" ref={titleRef}>
        {/* <span className="section-label">// 04 — resume</span> */}
        <h2 className="section-title">My Resume</h2>
        <div className="divider" />
      </div>

      <div className="reveal" ref={cardRef}>
        <div className="resume-card">
          <div className="resume-card-bg" aria-hidden="true" />
          <div className="resume-card-content">
            <h3>Animesh Kundu — Resume</h3>
            <p>Full Stack Developer · B.Tech CSE @ BPPIMT · Garhbeta, West Bengal</p>
          </div>
          <div className="resume-actions">
            <a href={personalInfo.resumeFile} download="Animesh_Kundu_CV.docx" className="btn-primary">
              ↓ Download CV
            </a>
            <button className="btn-secondary" onClick={() => setShowInline(prev => !prev)}>
              {showInline ? 'Hide Preview' : 'View Online'}
            </button>
          </div>
        </div>

        {showInline && <InlineResume />}
      </div>
    </section>
  );
}
