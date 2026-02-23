// import React from 'react';
// import { personalInfo, socialLinks } from '../data/portfolioData';
// import './Hero.css';

// export default function Hero() {
//   const scrollTo = (id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section id="home" className="hero">
//       <div className="hero-bg-gradient" aria-hidden="true" />
//       <div className="hero-grid-lines" aria-hidden="true" />

//       <div className="hero-inner">

//         {/* Left: text content */}
//         <div className="hero-content">
//           <div className="hero-tag">
//             <span className="hero-tag-dot" />
//             {personalInfo.status}
//           </div>

//           <h1 className="hero-name">
//             Animesh<br />
//             <span className="hero-name-gradient">Kundu</span>
//           </h1>

//           <p className="hero-title">
//             Full Stack Developer &nbsp;|&nbsp;{' '}
//             <span className="hero-highlight">B.Tech CSE</span> @ BPPIMT
//           </p>

//           <p className="hero-bio">
//             Building real-world web applications with modern technologies.
//             Passionate about clean code, thoughtful architecture, and solving problems
//             that actually matter.
//           </p>

//           <div className="hero-ctas">
//             <button className="btn-primary" onClick={() => scrollTo('projects')}>
//               View My Work →
//             </button>
//             <button className="btn-secondary" onClick={() => scrollTo('contact')}>
//               Get In Touch
//             </button>
//             <button className="btn-secondary" onClick={() => scrollTo('resume')}>
//               Download CV ↓
//             </button>
//           </div>
//         </div>

//         {/* Right: profile photo */}
//         <div className="hero-photo-wrap">
//           <div className="hero-photo-ring" aria-hidden="true" />
//           <div className="hero-photo-ring hero-photo-ring--2" aria-hidden="true" />

//           <div className="hero-photo-container">
//             <img
//               src={require('../assets/profile.jpg')}
//               alt="Animesh Kundu"
//               className="hero-photo"
//             />
//           </div>

//           {/* Floating badge */}
//           <div className="hero-badge">
//             <span className="hero-badge-dot" />
//             <span>Open to work</span>
//           </div>
//         </div>

//       </div>

//       {/* Side social links */}
//       <div className="hero-socials" aria-label="Social links">
//         {socialLinks.map(link => (
//           <a
//             key={link.name}
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="social-link"
//             title={link.name}
//           >
//             {link.label}
//           </a>
//         ))}
//       </div>

//       {/* Scroll indicator */}
//       <div className="scroll-indicator" aria-hidden="true">
//         <div className="scroll-line" />
//         <span>scroll</span>
//       </div>

//     </section>
//   );
// }



import React from 'react';
import Typewriter from 'typewriter-effect';
import { personalInfo, socialLinks } from '../data/portfolioData';
import './Hero.css';

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-gradient" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-inner">

        {/* Left: text content */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            {personalInfo.status}
          </div>

          <h1 className="hero-name">
            Animesh<br />
            <span className="hero-name-gradient">Kundu</span>
          </h1>

          {/* Typing animation */}
          <p className="hero-title">
            <span className="hero-typing-prefix">I'm a </span>
            <span className="hero-typing-text">
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Developer',
                    'React Developer',
                    'Node.js Developer',
                    'B.Tech CSE Student',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 35,
                }}
              />
            </span>
          </p>

          <p className="hero-bio">
            Building real-world web applications with modern technologies.
            Passionate about clean code, thoughtful architecture, and solving problems
            that actually matter.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              View My Work →
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>
              Get In Touch
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('resume')}>
              Download CV ↓
            </button>
          </div>
        </div>

        {/* Right: profile photo */}
        <div className="hero-photo-wrap">
          <div className="hero-photo-ring" aria-hidden="true" />
          <div className="hero-photo-ring hero-photo-ring--2" aria-hidden="true" />

          <div className="hero-photo-container">
            <img
              src={require('../assets/profile.jpg')}
              alt="Animesh Kundu"
              className="hero-photo"
            />
          </div>

          {/* Floating badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Open to work</span>
          </div>
        </div>

      </div>

      {/* Side social links */}
      <div className="hero-socials" aria-label="Social links">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title={link.name}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>

    </section>
  );
}
