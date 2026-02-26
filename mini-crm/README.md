# ⚡ MiniCRM — Client Lead Management System

A production-ready, full-stack Mini CRM built with Node.js, Express, MongoDB, and React. Designed to capture, track, and convert leads efficiently through a clean admin dashboard.

---

## 🖼️ Overview

MiniCRM allows businesses to:
- **Capture leads** via a public contact form (simulates a website widget)
- **Manage leads** through a secure, JWT-protected admin dashboard
- **Track pipeline** by updating lead status (New → Contacted → Converted)
- **Add follow-up notes** to any lead
- **Search and filter** leads by name, email, or status
- **Paginate** through large lead datasets

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, Axios |
| Backend | Node.js, Express.js, JWT, bcrypt |
| Database | MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Styling | Vanilla CSS-in-JS (inline styles) |

---

## ✨ Features

### Public
- Lead submission form (name, email, phone, source)
- Clean success feedback

### Admin Dashboard
- Analytics cards: Total, New, Contacted, Converted leads
- Conversion rate progress bar
- Recent leads table with quick navigation

### Lead Management
- Full table view with search, status filter, and pagination
- Inline status update (dropdown in table row)
- Delete lead with confirmation
- Lead detail view with full info

### Lead Detail
- Complete lead information card
- Status update with live feedback
- Follow-up notes with timestamps (newest first)
- Danger zone: permanent deletion

### Security
- bcrypt password hashing (salt rounds: 12)
- JWT authentication with expiry
- Protected routes on frontend and backend
- Role-based access control middleware
- Auto-logout on token expiry

---

## 📁 Project Structure

```
mini-crm/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login, register, getMe
│   │   └── leadController.js      # CRUD + notes + status
│   ├── middleware/
│   │   ├── auth.js                # JWT protect + restrictTo
│   │   └── errorHandler.js        # Global error handler
│   ├── models/
│   │   ├── Lead.js                # Lead schema with notes
│   │   └── User.js                # Admin user schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── StatusBadge.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx     # Auth state + login/logout
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── LeadListPage.jsx
    │   │   ├── LeadDetailPage.jsx
    │   │   └── ContactFormPage.jsx
    │   ├── services/
    │   │   └── api.js              # Axios instance + services
    │   ├── App.jsx                 # Router configuration
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- MongoDB running locally (or a MongoDB Atlas URI)

### 1. Clone & Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

The API will be available at `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Create Your First Admin

Call the register endpoint once to create an admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'
```

> **Important:** Remove or protect the `/api/auth/register` route in production!

---

## 🔗 API Reference

### Public Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/leads` | Submit a new lead |

### Auth Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register admin (setup only) |
| POST | `/api/auth/login` | Login → returns JWT |
| GET | `/api/auth/me` | Get current admin |

### Lead Endpoints (JWT Required)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/leads` | Get all leads (search, filter, paginate) |
| GET | `/api/leads/:id` | Get single lead |
| PUT | `/api/leads/:id/status` | Update lead status |
| POST | `/api/leads/:id/notes` | Add follow-up note |
| DELETE | `/api/leads/:id` | Delete lead |

#### Query Parameters for `GET /api/leads`
- `search` — search by name or email
- `status` — filter by `new`, `contacted`, or `converted`
- `page` — page number (default: 1)
- `limit` — results per page (default: 10)

---

## 🔮 Future Improvements

- [ ] Email notifications on new lead submission (Nodemailer/SendGrid)
- [ ] CSV/Excel export of leads
- [ ] Lead assignment to team members
- [ ] Activity log / audit trail
- [ ] Webhook support for external integrations
- [ ] Dark mode toggle
- [ ] Rich text notes (Markdown support)
- [ ] Lead scoring system
- [ ] Chart visualizations (weekly lead trends)
- [ ] Rate limiting & API throttling
- [ ] Two-factor authentication (2FA)
- [ ] Docker + docker-compose setup

---

## 📄 License

MIT — Feel free to use this as a starter for your own CRM projects.
