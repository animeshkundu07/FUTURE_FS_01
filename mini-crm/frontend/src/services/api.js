import axios from 'axios';

// Create base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Request interceptor: Attach JWT token to every request if present.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor: Handle 401 globally (auto-logout on expired token).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('crm_token');
      localStorage.removeItem('crm_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth Services ────────────────────────────────────────────────────────────

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// ─── Lead Services ────────────────────────────────────────────────────────────

export const leadService = {
  // Public: submit a lead from contact form
  submitLead: (data) => api.post('/leads', data),

  // Admin: get all leads with optional filters
  getLeads: (params) => api.get('/leads', { params }),

  // Admin: get single lead
  getLead: (id) => api.get(`/leads/${id}`),

  // Admin: update lead status
  updateStatus: (id, status) => api.put(`/leads/${id}/status`, { status }),

  // Admin: add a note
  addNote: (id, text) => api.post(`/leads/${id}/notes`, { text }),

  // Admin: delete a lead
  deleteLead: (id) => api.delete(`/leads/${id}`),
};

export default api;
