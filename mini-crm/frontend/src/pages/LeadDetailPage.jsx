import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { leadService } from '../services/api';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await leadService.getLead(id);
        setLead(res.data.data);
      } catch (err) {
        setError('Lead not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await leadService.updateStatus(id, newStatus);
      setLead(res.data.data);
    } catch {
      alert('Failed to update status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    try {
      const res = await leadService.addNote(id, noteText.trim());
      setLead(res.data.data);
      setNoteText('');
    } catch {
      alert('Failed to add note.');
    } finally {
      setAddingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete this lead?')) return;
    try {
      await leadService.deleteLead(id);
      navigate('/leads');
    } catch {
      alert('Failed to delete lead.');
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const formatShortDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={{ color: '#6b7280', marginTop: 12 }}>Loading lead...</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.center}>
          <span style={{ fontSize: 48 }}>❌</span>
          <p style={{ color: '#6b7280' }}>{error || 'Lead not found.'}</p>
          <Link to="/leads" style={styles.backBtn}>← Back to Leads</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        {/* Back link */}
        <Link to="/leads" style={styles.back}>← Back to Leads</Link>

        <div style={styles.grid}>
          {/* Left: Lead Info */}
          <div style={styles.left}>
            {/* Header Card */}
            <div style={styles.card}>
              <div style={styles.leadHeader}>
                <div style={styles.avatar}>{lead.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h1 style={styles.leadName}>{lead.name}</h1>
                  <p style={styles.leadEmail}>{lead.email}</p>
                </div>
              </div>

              <div style={styles.infoGrid}>
                <InfoRow label="Phone" value={lead.phone || 'Not provided'} />
                <InfoRow label="Source" value={lead.source} />
                <InfoRow label="Created" value={formatDate(lead.createdAt)} />
                <InfoRow label="Last Updated" value={formatDate(lead.updatedAt)} />
              </div>
            </div>

            {/* Status Update Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Lead Status</h2>
              <div style={styles.statusRow}>
                <StatusBadge status={lead.status} />
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updatingStatus}
                  style={styles.statusSelect}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
              {updatingStatus && <p style={styles.updating}>Updating...</p>}
            </div>

            {/* Danger Zone */}
            <div style={{ ...styles.card, borderColor: '#fca5a5' }}>
              <h2 style={{ ...styles.cardTitle, color: '#dc2626' }}>Danger Zone</h2>
              <p style={styles.dangerText}>Deleting this lead is permanent and cannot be undone.</p>
              <button onClick={handleDelete} style={styles.deleteBtn}>Delete Lead</button>
            </div>
          </div>

          {/* Right: Notes */}
          <div style={styles.right}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Follow-up Notes</h2>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={styles.noteForm}>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write a follow-up note..."
                  rows={3}
                  style={styles.textarea}
                />
                <button type="submit" disabled={addingNote || !noteText.trim()} style={styles.addNoteBtn}>
                  {addingNote ? 'Adding...' : '+ Add Note'}
                </button>
              </form>

              {/* Notes List */}
              <div style={styles.notesList}>
                {lead.notes.length === 0 ? (
                  <p style={styles.noNotes}>No notes yet. Add one above.</p>
                ) : (
                  [...lead.notes].reverse().map((note, idx) => (
                    <div key={idx} style={styles.noteItem}>
                      <p style={styles.noteText}>{note.text}</p>
                      <p style={styles.noteDate}>{formatShortDate(note.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.infoLabel}>{label}</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
);

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  main: { maxWidth: 1100, margin: '0 auto', padding: '28px 24px' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: 12 },
  spinner: { width: 36, height: 36, border: '4px solid #e5e7eb', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  back: { color: '#6366f1', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 20, display: 'inline-block' },
  backBtn: { padding: '8px 16px', backgroundColor: '#4f46e5', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20 },
  left: { display: 'flex', flexDirection: 'column', gap: 16 },
  right: { display: 'flex', flexDirection: 'column' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#1e1b4b', marginTop: 0, marginBottom: 16 },
  leadHeader: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 },
  avatar: { width: 52, height: 52, backgroundColor: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 700, flexShrink: 0 },
  leadName: { fontSize: 20, fontWeight: 800, color: '#1e1b4b', margin: 0 },
  leadEmail: { color: '#6b7280', fontSize: 14, margin: '2px 0 0' },
  infoGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  infoRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 8 },
  infoLabel: { fontSize: 13, color: '#9ca3af', fontWeight: 600 },
  infoValue: { fontSize: 13, color: '#374151', fontWeight: 500 },
  statusRow: { display: 'flex', alignItems: 'center', gap: 12 },
  statusSelect: { padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' },
  updating: { color: '#6b7280', fontSize: 12, marginTop: 8 },
  dangerText: { color: '#6b7280', fontSize: 13, marginBottom: 12 },
  deleteBtn: { padding: '8px 16px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  noteForm: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 },
  textarea: { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  addNoteBtn: { padding: '9px 16px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, alignSelf: 'flex-end' },
  notesList: { display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 420, overflowY: 'auto' },
  noNotes: { color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: '20px 0' },
  noteItem: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 14px' },
  noteText: { color: '#374151', fontSize: 14, margin: '0 0 6px', lineHeight: 1.5 },
  noteDate: { color: '#9ca3af', fontSize: 12, margin: 0 },
};

export default LeadDetailPage;
