import React from 'react';
import { stats, education, personalInfo } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

function StatCard({ num, label }) {
  return (
    <div className="stat-card">
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function EduCard({ degree, school, score }) {
  return (
    <div className="edu-card">
      <div className="edu-degree">{degree}</div>
      <div className="edu-school">{school}</div>
      <div className="edu-score">{score}</div>
    </div>
  );
}

export default function About() {
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const eduRef = useScrollReveal();

  return (
    <section id="about" className="about-section">
      <div className="reveal" ref={titleRef}>
        {/* <span className="section-label">// 01 — about me</span> */}
        <h2 className="section-title">Who I Am</h2>
        <div className="divider" />
      </div>

      <div className="about-grid">
        
        <div className="about-text reveal" ref={textRef}>
          {personalInfo.about.map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
          ))}

          <div className="about-stats">
            {stats.map(s => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        
        <div className="about-right reveal" ref={eduRef} style={{ transitionDelay: '0.15s' }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>// education</span>
          <div className="edu-list">
            {education.map(edu => (
              <EduCard key={edu.degree} {...edu} />
            ))}
          </div>

          <div className="achievement-card">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-text">
              <div className="ach-label">LeetCode</div>
              <div className="ach-value">150+ problems solved — active DSA practitioner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
