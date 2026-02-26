import { useState } from 'react';
import { leadService } from '../services/api';

/**
 * Public contact form — simulates a lead capture form on a business website.
 * No authentication required.
 */
const ContactFormPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'website' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await leadService.submitLead(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', source: 'website' });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>Thank you!</h2>
          <p style={styles.successMsg}>Your message has been received. We'll be in touch soon.</p>
          <button onClick={() => setSuccess(false)} style={styles.btn}>Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Get in Touch</h1>
          <p style={styles.subtitle}>Fill in the form and our team will contact you shortly.</p>
        </div>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555-0100" style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>How did you hear about us?</label>
            <select name="source" value={form.source} onChange={handleChange} style={styles.input}>
              <option value="website">Website</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Submitting...' : 'Send Message'}
          </button>
        </form>

        <p style={styles.adminLink}>Admin? <a href="/login" style={{ color: '#4f46e5' }}>Sign in to dashboard →</a></p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f0f2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 440, boxShadow: '0 4px 24px rgba(99,102,241,0.12)' },
  header: { textAlign: 'center', marginBottom: 28 },
  title: { fontSize: 24, fontWeight: 800, color: '#1e1b4b', margin: '0 0 6px' },
  subtitle: { color: '#6b7280', fontSize: 14 },
  alert: { backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' },
  btn: { padding: '12px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  adminLink: { textAlign: 'center', fontSize: 13, color: '#9ca3af', marginTop: 20 },
  successIcon: { fontSize: 52, textAlign: 'center', marginBottom: 12 },
  successTitle: { textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1e1b4b', margin: '0 0 8px' },
  successMsg: { textAlign: 'center', color: '#6b7280', fontSize: 14, marginBottom: 24 },
};

export default ContactFormPage;
