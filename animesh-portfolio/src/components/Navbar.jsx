import React, { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = ['about', 'skills', 'projects', 'resume', 'contact'];

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = 'home';
      document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
        AK<span>.</span>
      </a>

      {/* Desktop Links */}
      <ul className="nav-links desktop-links">
        {navItems.map(item => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={active === item ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item}`}
              className={active === item ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
