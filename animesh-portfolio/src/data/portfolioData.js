// ── All portfolio data in one place for easy editing ──

export const personalInfo = {
  name: 'Animesh Kundu',
  initials: 'AK',
  title: 'Full Stack Developer',
  subtitle: 'B.Tech CSE @ BPPIMT',
  location: 'Garhbeta, West Bengal, 721127',
  bio: `Building real-world web applications with modern technologies.
    Passionate about clean code, thoughtful architecture, and solving problems
    that actually matter.`,
  about: [
    `I'm <strong>Animesh Kundu</strong>, a Computer Science undergraduate at
    <strong>B.P. Poddar Institute of Management & Technology</strong>,
    Kolkata. I build full-stack web applications with a focus on real-world utility and clean code.`,
    `My journey with programming started with core <strong>C and C++</strong>,
    which gave me a solid foundation in problem-solving and systems thinking.
    I then moved into the web ecosystem — from vanilla JavaScript all the way
    to full-stack Node.js + MongoDB applications.`,
    `Beyond coursework, I'm an <strong>active problem solver on LeetCode</strong>,
    continuously exploring algorithms and data structures. I believe the best
    developers never stop being students.`,
  ],
  resumeFile: 'ANIMESH_KUNDU_CV.docx',
  status: 'Available for opportunities',
};

export const socialLinks = [
  { label: 'GH', name: 'GitHub', url: 'https://github.com/animeshkundu07', icon: '🐙' },
  { label: 'LI', name: 'LinkedIn', url: 'https://www.linkedin.com/in/animesh-kundu-23bb08324/', icon: '💼' },
  { label: 'LC', name: 'LeetCode', url: 'https://leetcode.com/u/kunduanimesh25/', icon: '🧩' },
];

export const stats = [
  { num: '8.15', label: 'CGPA (Sem 5)' },
  { num: '150+', label: 'LC Problems' },
  { num: '95.8%', label: 'Class XII' },
  { num: '2', label: 'Live Projects' },
];

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'B.P. Poddar Institute of Management & Technology',
    score: 'CGPA: 8.15 (Till Semester 5)',
  },
  {
    degree: 'Class XII (WBCHSE)',
    school: 'Garhbeta High School (H.S)',
    score: '95.8% · 2022',
  },
  {
    degree: 'Class X (WBBSE)',
    school: 'Garhbeta High School (H.S)',
    score: '94.29% · 2020',
  },
];

export const skillGroups = [
  {
    label: 'Languages',
    color: 'accent',
    skills: ['C', 'C++', 'JavaScript', 'Python', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks & Libraries',
    color: 'green',
    skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap 5', 'Socket.io', 'WebRTC'],
  },
  {
    label: 'Databases',
    color: 'blue',
    skills: ['MongoDB', 'Mongoose', 'SQL'],
  },
  {
    label: 'Tools & Platforms',
    color: 'orange',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  
];

export const projects = [
  {
    name: 'WanderLust',
    tagline: 'Full-Stack Travel Listing Platform',
    description: 'Airbnb-style property rental platform with complete CRUD operations for listings and reviews. A production-ready full-stack application deployed live.',
    icon: '🏠',
    iconColor: 'purple',
    liveUrl: 'https://wanderlust-vwkz.onrender.com/',
    githubUrl: 'https://github.com/animeshkundu07/WanderLust',
    features: [
      'RESTful API with 8+ routes and MongoDB/Mongoose backend',
      'Joi schema validation and custom error handling middleware',
      'One-to-many listing-review relationships with method-override routing',
      'Responsive EJS + Bootstrap 5 frontend',
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS', 'Bootstrap 5'],
  },
  {
    name: 'Nexus',
    tagline: 'Real-Time Video Calling App',
    description: 'Peer-to-peer video calling application built with WebRTC — enabling real-time video and audio communication directly in the browser, no plugins needed.',
    icon: '📹',
    iconColor: 'blue',
    liveUrl: 'https://nexus-lac-nine.vercel.app/',
    githubUrl: 'https://github.com/animeshkundu07/Nexus',
    features: [
      'WebRTC integration for peer-to-peer video/audio streaming',
      'Socket.io for real-time signaling and room management',
      'Shareable room URLs — multiple users can join via unique links',
      'Deployed on Vercel with zero-config setup',
    ],
    techStack: ['WebRTC', 'Socket.io', 'Node.js', 'Express.js', 'JavaScript'],
  },
];
