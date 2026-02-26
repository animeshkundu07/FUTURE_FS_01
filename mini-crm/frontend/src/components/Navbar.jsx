import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>⚡</span>
        <span style={styles.brandText}>MiniCRM</span>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard" style={{ ...styles.link, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>
          Dashboard
        </Link>
        <Link to="/leads" style={{ ...styles.link, ...(isActive('/leads') ? styles.activeLink : {}) }}>
          Leads
        </Link>
      </div>

      <div style={styles.userArea}>
        <span style={styles.userEmail}>{user?.email}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: 64,
    backgroundColor: '#1e1b4b',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 8 },
  logo: { fontSize: 22 },
  brandText: { color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px' },
  links: { display: 'flex', gap: 8 },
  link: {
    color: '#a5b4fc',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  activeLink: {
    backgroundColor: '#4f46e5',
    color: '#fff',
  },
  userArea: { display: 'flex', alignItems: 'center', gap: 12 },
  userEmail: { color: '#c7d2fe', fontSize: 13 },
  logoutBtn: {
    padding: '6px 14px',
    backgroundColor: 'transparent',
    border: '1px solid #4f46e5',
    borderRadius: 8,
    color: '#a5b4fc',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    transition: 'all 0.2s',
  },
};

export default Navbar;
