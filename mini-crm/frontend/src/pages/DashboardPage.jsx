import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { leadService } from '../services/api';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';

/**
 * Analytics card component.
 */
const StatCard = ({ label, value, color, icon }) => (
  <div style={{ ...styles.statCard, borderTop: `4px solid ${color}` }}>
    <div style={styles.statIcon}>{icon}</div>
    <div style={{ ...styles.statValue, color }}>{value}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
);

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await leadService.getLeads({ page: 1, limit: 5 });
        setAnalytics(res.data.analytics);
        setRecentLeads(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Dashboard</h1>
            <p style={styles.pageSubtitle}>Overview of your lead pipeline</p>
          </div>
          <Link to="/leads" style={styles.viewAllBtn}>View All Leads →</Link>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Analytics Cards */}
        {loading ? (
          <div style={styles.loadingGrid}>
            {[1, 2, 3, 4].map((i) => <div key={i} style={styles.skeleton} />)}
          </div>
        ) : (
          <div style={styles.statsGrid}>
            <StatCard label="Total Leads" value={analytics?.totalLeads ?? 0} color="#6366f1" icon="👥" />
            <StatCard label="New Leads" value={analytics?.newLeads ?? 0} color="#3b82f6" icon="🆕" />
            <StatCard label="Contacted" value={analytics?.contactedLeads ?? 0} color="#f59e0b" icon="📞" />
            <StatCard label="Converted" value={analytics?.convertedLeads ?? 0} color="#10b981" icon="✅" />
          </div>
        )}

        {/* Conversion bar */}
        {analytics && analytics.totalLeads > 0 && (
          <div style={styles.conversionBar}>
            <div style={styles.conversionHeader}>
              <span style={styles.conversionLabel}>Conversion Rate</span>
              <span style={styles.conversionRate}>
                {Math.round((analytics.convertedLeads / analytics.totalLeads) * 100)}%
              </span>
            </div>
            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${Math.round((analytics.convertedLeads / analytics.totalLeads) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Recent Leads Table */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Leads</h2>
          {loading ? (
            <p style={styles.loadingText}>Loading...</p>
          ) : recentLeads.length === 0 ? (
            <div style={styles.empty}>
              <span style={{ fontSize: 40 }}>📭</span>
              <p>No leads yet. Share your contact form link to start capturing leads.</p>
            </div>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Name', 'Email', 'Source', 'Status', 'Date', ''].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead._id} style={styles.tr}>
                      <td style={styles.td}><strong>{lead.name}</strong></td>
                      <td style={styles.td}>{lead.email}</td>
                      <td style={styles.td}><span style={styles.sourcePill}>{lead.source}</span></td>
                      <td style={styles.td}><StatusBadge status={lead.status} /></td>
                      <td style={styles.td}>{formatDate(lead.createdAt)}</td>
                      <td style={styles.td}>
                        <Link to={`/leads/${lead._id}`} style={styles.viewLink}>View →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  main: { maxWidth: 1100, margin: '0 auto', padding: '32px 24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  pageTitle: { fontSize: 26, fontWeight: 800, color: '#1e1b4b', margin: 0 },
  pageSubtitle: { color: '#6b7280', fontSize: 14, marginTop: 4 },
  viewAllBtn: { padding: '8px 16px', backgroundColor: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 },
  error: { backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 13 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
  loadingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
  skeleton: { height: 120, backgroundColor: '#e5e7eb', borderRadius: 12, animation: 'pulse 1.5s infinite' },
  statCard: { backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', textAlign: 'center' },
  statIcon: { fontSize: 28, marginBottom: 8 },
  statValue: { fontSize: 36, fontWeight: 800, lineHeight: 1 },
  statLabel: { color: '#6b7280', fontSize: 13, marginTop: 6, fontWeight: 500 },
  conversionBar: { backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 24 },
  conversionHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  conversionLabel: { fontSize: 14, fontWeight: 600, color: '#374151' },
  conversionRate: { fontSize: 14, fontWeight: 700, color: '#10b981' },
  barTrack: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 999 },
  barFill: { height: '100%', backgroundColor: '#10b981', borderRadius: 999, transition: 'width 0.6s ease' },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: '#1e1b4b', marginBottom: 16, marginTop: 0 },
  loadingText: { color: '#6b7280', textAlign: 'center', padding: 20 },
  empty: { textAlign: 'center', padding: '32px 0', color: '#6b7280' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb' },
  tr: { borderBottom: '1px solid #f3f4f6' },
  td: { padding: '12px 12px', color: '#374151' },
  sourcePill: { backgroundColor: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 500 },
  viewLink: { color: '#4f46e5', textDecoration: 'none', fontWeight: 600, fontSize: 13 },
};

export default DashboardPage;
