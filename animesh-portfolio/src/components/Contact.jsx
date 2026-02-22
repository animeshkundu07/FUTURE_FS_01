import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';


const EMAILJS_SERVICE_ID  = 'service_mg8gytf';   
const EMAILJS_TEMPLATE_ID = 'template_hrypv49';  
const EMAILJS_PUBLIC_KEY  = '1_gZ28oT-yHOZeze8';   

const contactMethods = [
  ...socialLinks,
  
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const titleRef = useScrollReveal();
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   'kunduanimesh40@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="reveal" ref={titleRef}>
        <span className="section-label">// 05 — contact</span>
        <h2 className="section-title">Let's Connect</h2>
        <div className="divider" />
        <p className="section-sub">
          I'm open to internships, collaborations, and full-time opportunities.
          Reach out and let's build something great.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left: contact methods */}
        <div className="reveal" ref={leftRef}>
          <p className="contact-intro">
            Whether you have a project in mind, a question about my work,
            or just want to say hi — my inbox is open.
          </p>
          <div className="contact-info">
            {contactMethods.map(link => (
              <a
                key={link.name}
                href={link.url}
                target={link.name === 'Email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-item-icon">{link.icon}</div>
                <div className="contact-item-text">
                  <span className="cit-label">{link.name}</span>
                  <span className="cit-value">
                    {link.display || link.url.replace('https://', '').replace('www.', '')}
                  </span>
                </div>
                <span className="contact-item-arrow">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="reveal" ref={rightRef} style={{ transitionDelay: '0.15s' }}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === 'success' && (
              <div className="form-alert form-alert--success">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-alert form-alert--error">
                ✗ Something went wrong. 
              </div>
            )}

            <button
              type="submit"
              className={`btn-primary submit-btn ${status === 'success' ? 'submitted' : ''}`}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'success'
                ? '✓ Sent!'
                : status === 'loading'
                ? 'Sending...'
                : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
