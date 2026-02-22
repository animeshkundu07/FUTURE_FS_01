import React from 'react';
import { socialLinks } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">AK<span>.</span></div>
      <p className="footer-copy">Animesh Kundu — Full Stack Developer · Garhbeta, West Bengal</p>
      <div className="footer-socials">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title={link.name}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="footer-built">Built with React · {year}</p>
    </footer>
  );
}
