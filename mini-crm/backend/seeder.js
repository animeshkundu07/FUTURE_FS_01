const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Lead = require('./models/Lead');

const sampleLeads = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    phone: '+1-555-234-5678',
    source: 'website',
    status: 'converted',
    notes: [
      { text: 'Called Sarah, she is very interested in the premium plan.', createdAt: new Date('2025-01-10') },
      { text: 'Sent proposal document via email. Awaiting sign-off.', createdAt: new Date('2025-01-14') },
      { text: 'Deal closed! Onboarding scheduled for next Monday.', createdAt: new Date('2025-01-18') },
    ],
    createdAt: new Date('2025-01-08'),
  },
  {
    name: 'Michael Torres',
    email: 'm.torres@techstartup.io',
    phone: '+1-555-876-4321',
    source: 'linkedin',
    status: 'contacted',
    notes: [
      { text: 'Michael reached out after seeing our LinkedIn post. Scheduled a demo call.', createdAt: new Date('2025-01-20') },
      { text: 'Demo went well. He wants to loop in his CTO before deciding.', createdAt: new Date('2025-01-22') },
    ],
    createdAt: new Date('2025-01-19'),
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@designco.in',
    phone: '+91-98765-43210',
    source: 'referral',
    status: 'new',
    notes: [],
    createdAt: new Date('2025-02-01'),
  },
  {
    name: 'James Carter',
    email: 'jcarter@retail-plus.com',
    phone: '+1-555-321-9876',
    source: 'facebook',
    status: 'contacted',
    notes: [
      { text: 'Responded to our Facebook ad. Interested in the starter package.', createdAt: new Date('2025-02-03') },
    ],
    createdAt: new Date('2025-02-02'),
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@brightweb.co',
    phone: '+1-555-654-7890',
    source: 'website',
    status: 'converted',
    notes: [
      { text: 'Filled out the contact form asking about enterprise pricing.', createdAt: new Date('2025-02-05') },
      { text: 'Sent enterprise brochure. Had a great 30-min call.', createdAt: new Date('2025-02-07') },
      { text: 'Contract signed. Revenue: $4,800/year.', createdAt: new Date('2025-02-10') },
    ],
    createdAt: new Date('2025-02-04'),
  },
  {
    name: 'David Okafor',
    email: 'david.o@marketingpro.ng',
    phone: '+234-802-555-1234',
    source: 'referral',
    status: 'new',
    notes: [],
    createdAt: new Date('2025-02-11'),
  },
  {
    name: 'Lisa Park',
    email: 'lisa.park@financeflow.com',
    phone: '+1-555-112-3344',
    source: 'linkedin',
    status: 'contacted',
    notes: [
      { text: 'Connected on LinkedIn. She is evaluating 3 CRM tools this quarter.', createdAt: new Date('2025-02-13') },
      { text: 'Sent comparison sheet. Follow up due next week.', createdAt: new Date('2025-02-15') },
    ],
    createdAt: new Date('2025-02-12'),
  },
  {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.rashid@consultgroup.ae',
    phone: '+971-50-555-7788',
    source: 'website',
    status: 'new',
    notes: [],
    createdAt: new Date('2025-02-17'),
  },
  {
    name: 'Rachel Green',
    email: 'rachel.g@bloomfashion.com',
    phone: '+1-555-900-1122',
    source: 'facebook',
    status: 'converted',
    notes: [
      { text: 'Came from Facebook campaign. Needed e-commerce CRM integration.', createdAt: new Date('2025-01-25') },
      { text: 'Closed on the business plan. Very smooth process.', createdAt: new Date('2025-01-29') },
    ],
    createdAt: new Date('2025-01-24'),
  },
  {
    name: 'Carlos Mendez',
    email: 'carlos.mendez@logisticshub.mx',
    phone: '+52-55-5555-8877',
    source: 'other',
    status: 'new',
    notes: [],
    createdAt: new Date('2025-02-19'),
  },
  {
    name: 'Nina Patel',
    email: 'nina.patel@healthplus.com',
    phone: '+1-555-778-4455',
    source: 'website',
    status: 'contacted',
    notes: [
      { text: 'Enquired about HIPAA compliance features. Sent documentation.', createdAt: new Date('2025-02-20') },
    ],
    createdAt: new Date('2025-02-19'),
  },
  {
    name: 'Tom Whitfield',
    email: 'tom.w@agencyblue.co.uk',
    phone: '+44-7700-900123',
    source: 'referral',
    status: 'converted',
    notes: [
      { text: 'Referred by Emily Chen. Already familiar with our product.', createdAt: new Date('2025-02-14') },
      { text: 'Quick close — signed up for the agency plan same day.', createdAt: new Date('2025-02-14') },
    ],
    createdAt: new Date('2025-02-13'),
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing leads
    await Lead.deleteMany({});
    console.log('🗑️  Cleared existing leads');

    // Insert sample leads
    await Lead.insertMany(sampleLeads);
    console.log(`🌱 Inserted ${sampleLeads.length} sample leads successfully!`);

    console.log('\n📊 Summary:');
    console.log(`   Total:     ${sampleLeads.length}`);
    console.log(`   New:       ${sampleLeads.filter(l => l.status === 'new').length}`);
    console.log(`   Contacted: ${sampleLeads.filter(l => l.status === 'contacted').length}`);
    console.log(`   Converted: ${sampleLeads.filter(l => l.status === 'converted').length}`);
    console.log('\n✨ Done! Refresh your dashboard at localhost:5173');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder error:', error.message);
    process.exit(1);
  }
};

seedDB();