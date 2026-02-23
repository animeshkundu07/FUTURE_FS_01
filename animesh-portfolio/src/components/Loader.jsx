import React, { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('enter');   // enter | hold | exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar fills over 1.8s
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 36);

    // After 1.8s start exit animation
    const exitTimer = setTimeout(() => setPhase('exit'), 1800);

    // After exit animation (0.6s), call onComplete
    const doneTimer = setTimeout(() => onComplete(), 2400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loader-overlay loader-overlay--${phase}`}>
      <div className="loader-content">

        {/* Logo */}
        <div className={`loader-logo loader-logo--${phase}`}>
          <span className="loader-logo-text">AK</span>
          <span className="loader-logo-dot">.</span>
        </div>

        {/* Subtitle */}
        <p className={`loader-subtitle loader-subtitle--${phase}`}>
          Animesh Kundu — Full Stack Developer
        </p>

        {/* Progress bar */}
        <div className="loader-bar-wrap">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress number */}
        <span className="loader-percent">{progress}%</span>

      </div>

      {/* Background decorations */}
      <div className="loader-ring loader-ring--1" aria-hidden="true" />
      <div className="loader-ring loader-ring--2" aria-hidden="true" />
      <div className="loader-ring loader-ring--3" aria-hidden="true" />
    </div>
  );
}
