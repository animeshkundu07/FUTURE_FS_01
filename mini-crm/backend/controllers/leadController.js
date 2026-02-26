const Lead = require('../models/Lead');

/**
 * @desc    Submit a new lead (public — simulates website contact form)
 * @route   POST /api/leads
 * @access  Public
 */
const submitLead = async (req, res, next) => {
  try {
    const { name, email, phone, source } = req.body;

    const lead = await Lead.create({ name, email, phone, source });

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully. We will be in touch soon!',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all leads with search, filter, and pagination
 * @route   GET /api/leads
 * @access  Private (Admin)
 */
const getLeads = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    // Build dynamic filter object
    const filter = {};

    if (status && ['new', 'contacted', 'converted'].includes(status)) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Analytics summary
    const [totalLeads, newLeads, contactedLeads, convertedLeads] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'converted' }),
    ]);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
      analytics: { totalLeads, newLeads, contactedLeads, convertedLeads },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single lead by ID
 * @route   GET /api/leads/:id
 * @access  Private (Admin)
 */
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update lead status
 * @route   PUT /api/leads/:id/status
 * @access  Private (Admin)
 */
const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'converted'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, contacted, or converted.',
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.status(200).json({ success: true, message: 'Status updated.', data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a follow-up note to a lead
 * @route   POST /api/leads/:id/notes
 * @access  Private (Admin)
 */
const addNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'Note text is required.' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $push: { notes: { text: text.trim(), createdAt: new Date() } } },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.status(201).json({ success: true, message: 'Note added.', data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Private (Admin)
 */
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.status(200).json({ success: true, message: 'Lead deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitLead, getLeads, getLeadById, updateLeadStatus, addNote, deleteLead };
