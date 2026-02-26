const express = require('express');
const router = express.Router();
const {
  submitLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  addNote,
  deleteLead,
} = require('../controllers/leadController');
const { protect, restrictTo } = require('../middleware/auth');

// ─── Public Routes ───────────────────────────────────────────────────────────

// POST /api/leads — Submit a lead from the contact form (no auth required)
router.post('/', submitLead);

// ─── Protected Admin Routes ──────────────────────────────────────────────────

// Apply JWT protection to all routes below
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// GET /api/leads — Get all leads (with filter, search, pagination)
router.get('/', getLeads);

// GET /api/leads/:id — Get a single lead
router.get('/:id', getLeadById);

// PUT /api/leads/:id/status — Update lead status
router.put('/:id/status', updateLeadStatus);

// POST /api/leads/:id/notes — Add a follow-up note
router.post('/:id/notes', addNote);

// DELETE /api/leads/:id — Delete a lead
router.delete('/:id', deleteLead);

module.exports = router;
