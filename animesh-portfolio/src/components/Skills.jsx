import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    color: '#38bdf8',
    icon: '🖥️',
    skills: [
      { name: 'HTML5',       emoji: '🟧' },
      { name: 'CSS3',        emoji: '🟦' },
      { name: 'JavaScript',  emoji: '🟨' },
      { name: 'React.js',    emoji: '⚛️' },
      { name: 'Tailwind CSS',emoji: '🎨' },
      { name: 'Bootstrap 5', emoji: '🅱️' },
    ],
  },
  {
    title: 'Backend',
    color: '#34d399',
    icon: '⚙️',
    skills: [
      { name: 'Node.js',    emoji: '🟩' },
      { name: 'Express.js', emoji: '🚂' },
      { name: 'MongoDB',    emoji: '🍃' },
      { name: 'Mongoose',   emoji: '🔗' },
      { name: 'Socket.io',  emoji: '🔌' },
      { name: 'WebRTC',     emoji: '📹' },
    ],
  },
  {
    title: 'Languages',
    color: '#c084fc',
    icon: '💻',
    skills: [
      { name: 'C',          emoji: '🔵' },
      { name: 'C++',        emoji: '🔷' },
      { name: 'JavaScript', emoji: '🟨' },
      { name: 'Python',     emoji: '🐍' },
      { name: 'SQL',        emoji: '🗄️' },
    ],
  },
  {
    title: 'Tools',
    color: '#fb923c',
    icon: '🛠️',
    skills: [
      { name: 'Git',    emoji: '🔴' },
      { name: 'GitHub', emoji: '🐙' },
      { name: 'VS Code',emoji: '🔵' },
      { name: 'Vercel', emoji: '▲' },
      { name: 'Render', emoji: '🌐' },
    ],
  },
];

function SkillBox({ title, color, icon, skills, delay }) {
  const ref = useScrollReveal();

  return (
    <div
      className="skill-box reveal"
      ref={ref}
      style={{ '--box-color': color, transitionDelay: `${delay}s` }}
    >
      <div className="skill-box-header">
        <span className="skill-box-icon">{icon}</span>
        <h3 className="skill-box-title" style={{ color }}>{title}</h3>
      </div>
      <div className="skill-box-grid">
        {skills.map(skill => (
          <div key={skill.name} className="skill-chip">
            <span className="skill-chip-emoji">{skill.emoji}</span>
            <span className="skill-chip-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useScrollReveal();

  return (
    <section id="skills" className="skills-section">
      <div className="reveal" ref={titleRef}>
        <span className="section-label">// 02 — tech stack</span>
        <h2 className="section-title">Skills & Tools</h2>
        <div className="divider" />
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <SkillBox key={cat.title} {...cat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
