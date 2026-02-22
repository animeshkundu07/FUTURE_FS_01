# Animesh Kundu — Portfolio Website (React)

A clean, responsive, professional portfolio website built with React.js featuring dark/light mode toggle, scroll animations, and modular component architecture.

---

## 📁 Folder Structure

```
animesh-portfolio/
│
├── public/
│   ├── index.html              ← Main HTML shell (Google Fonts loaded here)
│   ├── favicon.ico             ← Add your favicon here
│   └── ANIMESH_KUNDU_CV.docx   ← ⚠️ PUT YOUR CV FILE HERE for download to work
│
├── src/
│   │
│   ├── data/
│   │   └── portfolioData.js    ← ✏️ ALL your content lives here (name, projects, skills, etc.)
│   │
│   ├── hooks/
│   │   ├── useTheme.js         ← Dark/light mode logic + localStorage persistence
│   │   └── useScrollReveal.js  ← IntersectionObserver scroll animation hook
│   │
│   ├── styles/
│   │   └── global.css          ← CSS variables (dark + light themes), base styles, shared buttons
│   │
│   ├── components/
│   │   ├── Navbar.jsx          ← Fixed nav with active link, theme toggle, mobile hamburger
│   │   ├── Navbar.css
│   │   │
│   │   ├── Hero.jsx            ← Landing section with name, bio, CTAs, social sidebar
│   │   ├── Hero.css
│   │   │
│   │   ├── About.jsx           ← Bio paragraphs, stats grid, education cards, achievement badge
│   │   ├── About.css
│   │   │
│   │   ├── Skills.jsx          ← Grouped skill tags (Languages, Frameworks, DB, Tools, Core)
│   │   ├── Skills.css
│   │   │
│   │   ├── Projects.jsx        ← Project cards with live link, GitHub, features, tech pills
│   │   ├── Projects.css
│   │   │
│   │   ├── Resume.jsx          ← Download button + togglable inline resume preview
│   │   ├── Resume.css
│   │   │
│   │   ├── Contact.jsx         ← Social links + contact form with loading/success states
│   │   ├── Contact.css
│   │   │
│   │   ├── Footer.jsx          ← Footer with brand, social links, copyright
│   │   └── Footer.css
│   │
│   ├── App.js                  ← Root component — wires all sections together
│   └── index.js                ← React DOM entry point
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or above) — [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone or download the project
cd animesh-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```
This creates an optimized `build/` folder ready to deploy.

---

## ✏️ How to Customize

### Update Your Info
All your personal content is in ONE file:
```
src/data/portfolioData.js
```
Edit this file to change:
- Name, bio, location, status badge
- Social media links
- Stats (CGPA, LeetCode count, etc.)
- Education history
- Skill groups and individual skills
- Projects (name, description, features, tech stack, live URLs)

### Add a New Project
In `portfolioData.js`, add an object to the `projects` array:
```js
{
  name: 'My New Project',
  tagline: 'Short description',
  description: 'Longer description...',
  icon: '🚀',
  iconColor: 'purple',   // 'purple' or 'blue'
  liveUrl: 'https://yourproject.com',
  githubUrl: 'https://github.com/you/repo',
  features: ['Feature 1', 'Feature 2'],
  techStack: ['React', 'Node.js'],
}
```

### Enable Resume Download
Place your CV file in the `public/` folder:
```
public/ANIMESH_KUNDU_CV.docx
```

### Change Colors / Theme
All color variables are in:
```
src/styles/global.css
```
Edit the `:root` block for dark mode and `:root[data-theme="light"]` for light mode.

---

## 🌙 Dark / Light Mode

- Toggle button is in the **Navbar** (top right)
- User preference is saved to `localStorage` — persists across page refreshes
- Respects system preference on first visit (`prefers-color-scheme`)
- All colors transition smoothly with CSS `transition: 0.3s`

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify (Free)
1. Run `npm run build`
2. Drag & drop the `build/` folder to [netlify.com/drop](https://netlify.com/drop)

### Option 3: GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run build && npm run deploy
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Styling | CSS Modules (component-level) + CSS Variables |
| Fonts | Google Fonts (Syne, DM Mono, DM Sans) |
| Animations | CSS keyframes + IntersectionObserver |
| Theme | CSS custom properties + localStorage |
| Build | Create React App (react-scripts) |

---

## 📞 Contact

**Animesh Kundu**
- GitHub: [animeshkundu07](https://github.com/animeshkundu07)
- LinkedIn: [animesh-kundu-23bb08324](https://www.linkedin.com/in/animesh-kundu-23bb08324/)
- LeetCode: [kunduanimesh25](https://leetcode.com/u/kunduanimesh25/)
