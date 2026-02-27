// import { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { leadService } from '../services/api';
// import Navbar from '../components/Navbar';
// import StatusBadge from '../components/StatusBadge';

// const STATUS_OPTIONS = ['', 'new', 'contacted', 'converted'];

// const LeadListPage = () => {
//   const [leads, setLeads] = useState([]);
//   const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchLeads = useCallback(async (page = 1) => {
//     setLoading(true);
//     try {
//       const res = await leadService.getLeads({ page, limit: 10, search, status: statusFilter });
//       setLeads(res.data.data);
//       setPagination(res.data.pagination);
//     } catch (err) {
//       setError('Failed to load leads.');
//     } finally {
//       setLoading(false);
//     }
//   }, [search, statusFilter]);

//   // Debounced fetch on filter change
//   useEffect(() => {
//     const timer = setTimeout(() => fetchLeads(1), 300);
//     return () => clearTimeout(timer);
//   }, [fetchLeads]);

//   const handleStatusChange = async (leadId, newStatus) => {
//     try {
//       await leadService.updateStatus(leadId, newStatus);
//       setLeads((prev) =>
//         prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
//       );
//     } catch {
//       alert('Failed to update status.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this lead permanently?')) return;
//     setDeletingId(id);
//     try {
//       await leadService.deleteLead(id);
//       setLeads((prev) => prev.filter((l) => l._id !== id));
//     } catch {
//       alert('Failed to delete lead.');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

//   return (
//     <div style={styles.page}>
//       <Navbar />
//       <main style={styles.main}>
//         <div style={styles.pageHeader}>
//           <div>
//             <h1 style={styles.pageTitle}>Leads</h1>
//             <p style={styles.pageSubtitle}>{pagination.total} total leads in the system</p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div style={styles.filters}>
//           <input
//             type="text"
//             placeholder="🔍  Search by name or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={styles.searchInput}
//           />
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
//             <option value="">All Statuses</option>
//             <option value="new">New</option>
//             <option value="contacted">Contacted</option>
//             <option value="converted">Converted</option>
//           </select>
//         </div>

//         {error && <div style={styles.error}>{error}</div>}

//         {/* Table */}
//         <div style={styles.tableCard}>
//           {loading ? (
//             <div style={styles.loadingWrap}>
//               <div style={styles.spinner} />
//               <p style={{ color: '#6b7280', marginTop: 12 }}>Loading leads...</p>
//             </div>
//           ) : leads.length === 0 ? (
//             <div style={styles.empty}>
//               <span style={{ fontSize: 48 }}>📭</span>
//               <p style={{ color: '#6b7280' }}>No leads found. Try adjusting your filters.</p>
//             </div>
//           ) : (
//             <div style={styles.tableWrap}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     {['Name', 'Email', 'Phone', 'Source', 'Status', 'Date', 'Actions'].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {leads.map((lead) => (
//                     <tr key={lead._id} style={styles.tr}>
//                       <td style={styles.td}><strong>{lead.name}</strong></td>
//                       <td style={styles.td}>{lead.email}</td>
//                       <td style={styles.td}>{lead.phone || '—'}</td>
//                       <td style={styles.td}>
//                         <span style={styles.sourcePill}>{lead.source}</span>
//                       </td>
//                       <td style={styles.td}>
//                         <select
//                           value={lead.status}
//                           onChange={(e) => handleStatusChange(lead._id, e.target.value)}
//                           style={{ ...styles.statusSelect, ...statusSelectColor(lead.status) }}
//                         >
//                           <option value="new">New</option>
//                           <option value="contacted">Contacted</option>
//                           <option value="converted">Converted</option>
//                         </select>
//                       </td>
//                       <td style={styles.td}>{formatDate(lead.createdAt)}</td>
//                       <td style={styles.td}>
//                         <div style={styles.actions}>
//                           <Link to={`/leads/${lead._id}`} style={styles.viewBtn}>View</Link>
//                           <button
//                             onClick={() => handleDelete(lead._id)}
//                             disabled={deletingId === lead._id}
//                             style={styles.deleteBtn}
//                           >
//                             {deletingId === lead._id ? '...' : 'Delete'}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div style={styles.pagination}>
//             <button
//               disabled={pagination.page <= 1}
//               onClick={() => fetchLeads(pagination.page - 1)}
//               style={styles.pageBtn}
//             >
//               ← Prev
//             </button>
//             <span style={styles.pageInfo}>
//               Page {pagination.page} of {pagination.totalPages}
//             </span>
//             <button
//               disabled={pagination.page >= pagination.totalPages}
//               onClick={() => fetchLeads(pagination.page + 1)}
//               style={styles.pageBtn}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// const statusSelectColor = (status) => ({
//   new: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
//   contacted: { backgroundColor: '#fef3c7', color: '#92400e' },
//   converted: { backgroundColor: '#d1fae5', color: '#065f46' },
// }[status] || {});

// const styles = {
//   page: { minHeight: '100vh', backgroundColor: '#f9fafb' },
//   main: { maxWidth: 1200, margin: '0 auto', padding: '32px 24px' },
//   pageHeader: { marginBottom: 24 },
//   pageTitle: { fontSize: 26, fontWeight: 800, color: '#1e1b4b', margin: 0 },
//   pageSubtitle: { color: '#6b7280', fontSize: 14, marginTop: 4 },
//   filters: { display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' },
//   searchInput: { flex: 1, minWidth: 220, padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' },
//   select: { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: '#fff' },
//   error: { backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 13 },
//   tableCard: { backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' },
//   loadingWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 48 },
//   spinner: { width: 36, height: 36, border: '4px solid #e5e7eb', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
//   empty: { textAlign: 'center', padding: '48px 0' },
//   tableWrap: { overflowX: 'auto' },
//   table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
//   th: { textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
//   tr: { borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' },
//   td: { padding: '13px 16px', color: '#374151', verticalAlign: 'middle' },
//   sourcePill: { backgroundColor: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 500 },
//   statusSelect: { border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
//   actions: { display: 'flex', gap: 8 },
//   viewBtn: { padding: '5px 12px', backgroundColor: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600 },
//   deleteBtn: { padding: '5px 12px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' },
//   pagination: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 },
//   pageBtn: { padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: 8, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151' },
//   pageInfo: { fontSize: 14, color: '#6b7280' },
// };

// export default LeadListPage;



import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { leadService } from '../services/api';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';

const STATUS_OPTIONS = ['', 'new', 'contacted', 'converted'];

const LeadListPage = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '', source: 'website' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await leadService.getLeads({ page, limit: 10, search, status: statusFilter });
      setLeads(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  // Debounced fetch on filter change
  useEffect(() => {
    const timer = setTimeout(() => fetchLeads(1), 300);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.updateStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead permanently?')) return;
    setDeletingId(id);
    try {
      await leadService.deleteLead(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } catch {
      alert('Failed to delete lead.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      await leadService.submitLead(addForm);
      setShowModal(false);
      setAddForm({ name: '', email: '', phone: '', source: 'website' });
      fetchLeads(1); // Refresh list
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add lead.');
    } finally {
      setAddLoading(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Leads</h1>
            <p style={styles.pageSubtitle}>{pagination.total} total leads in the system</p>
          </div>
          <button onClick={() => setShowModal(true)} style={styles.addBtn}>
            + Add Lead
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="🔍  Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Table */}
        <div style={styles.tableCard}>
          {loading ? (
            <div style={styles.loadingWrap}>
              <div style={styles.spinner} />
              <p style={{ color: '#6b7280', marginTop: 12 }}>Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div style={styles.empty}>
              <span style={{ fontSize: 48 }}>📭</span>
              <p style={{ color: '#6b7280' }}>No leads found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Name', 'Email', 'Phone', 'Source', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} style={styles.tr}>
                      <td style={styles.td}><strong>{lead.name}</strong></td>
                      <td style={styles.td}>{lead.email}</td>
                      <td style={styles.td}>{lead.phone || '—'}</td>
                      <td style={styles.td}>
                        <span style={styles.sourcePill}>{lead.source}</span>
                      </td>
                      <td style={styles.td}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          style={{ ...styles.statusSelect, ...statusSelectColor(lead.status) }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                        </select>
                      </td>
                      <td style={styles.td}>{formatDate(lead.createdAt)}</td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <Link to={`/leads/${lead._id}`} style={styles.viewBtn}>View</Link>
                          <button
                            onClick={() => handleDelete(lead._id)}
                            disabled={deletingId === lead._id}
                            style={styles.deleteBtn}
                          >
                            {deletingId === lead._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              disabled={pagination.page <= 1}
              onClick={() => fetchLeads(pagination.page - 1)}
              style={styles.pageBtn}
            >
              ← Prev
            </button>
            <span style={styles.pageInfo}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchLeads(pagination.page + 1)}
              style={styles.pageBtn}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      {/* ── Add Lead Modal ────────────────────────────────── */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Lead</h2>
              <button onClick={() => setShowModal(false)} style={styles.closeBtn}>✕</button>
            </div>

            {addError && <div style={styles.modalError}>{addError}</div>}

            <form onSubmit={handleAddLead} style={styles.modalForm}>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  required
                  style={styles.modalInput}
                />
              </div>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  required
                  style={styles.modalInput}
                />
              </div>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 555-0100"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  style={styles.modalInput}
                />
              </div>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>Source</label>
                <select
                  value={addForm.source}
                  onChange={(e) => setAddForm({ ...addForm, source: e.target.value })}
                  style={styles.modalInput}
                >
                  <option value="website">Website</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" disabled={addLoading} style={{ ...styles.submitBtn, opacity: addLoading ? 0.7 : 1 }}>
                  {addLoading ? 'Adding...' : 'Add Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const statusSelectColor = (status) => ({
  new: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  contacted: { backgroundColor: '#fef3c7', color: '#92400e' },
  converted: { backgroundColor: '#d1fae5', color: '#065f46' },
}[status] || {});

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  main: { maxWidth: 1200, margin: '0 auto', padding: '32px 24px' },
  pageHeader: { marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  addBtn: { padding: '10px 20px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  pageTitle: { fontSize: 26, fontWeight: 800, color: '#1e1b4b', margin: 0 },
  pageSubtitle: { color: '#6b7280', fontSize: 14, marginTop: 4 },
  filters: { display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' },
  searchInput: { flex: 1, minWidth: 220, padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none' },
  select: { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: '#fff' },
  error: { backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 13 },
  tableCard: { backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' },
  loadingWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 48 },
  spinner: { width: 36, height: 36, border: '4px solid #e5e7eb', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  empty: { textAlign: 'center', padding: '48px 0' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
  tr: { borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' },
  td: { padding: '13px 16px', color: '#374151', verticalAlign: 'middle' },
  sourcePill: { backgroundColor: '#ede9fe', color: '#6d28d9', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 500 },
  statusSelect: { border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  actions: { display: 'flex', gap: 8 },
  viewBtn: { padding: '5px 12px', backgroundColor: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600 },
  deleteBtn: { padding: '5px 12px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  pagination: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 },
  pageBtn: { padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: 8, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151' },
  pageInfo: { fontSize: 14, color: '#6b7280' },
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 16 },
  modal: { backgroundColor: '#fff', borderRadius: 16, padding: '28px 32px', width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 800, color: '#1e1b4b', margin: 0 },
  closeBtn: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#6b7280', lineHeight: 1 },
  modalError: { backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 },
  modalForm: { display: 'flex', flexDirection: 'column', gap: 14 },
  modalField: { display: 'flex', flexDirection: 'column', gap: 5 },
  modalLabel: { fontSize: 13, fontWeight: 600, color: '#374151' },
  modalInput: { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', backgroundColor: '#fff' },
  modalActions: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 },
  cancelBtn: { padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  submitBtn: { padding: '10px 20px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
};

export default LeadListPage;

