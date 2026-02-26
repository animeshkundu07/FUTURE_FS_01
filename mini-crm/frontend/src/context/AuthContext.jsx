import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and manages the authentication state globally.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm_token'));
  const [loading, setLoading] = useState(true);

  // On mount, verify the stored token is still valid
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authService.getMe();
        setUser(res.data.user);
      } catch {
        // Token is invalid or expired — clean up
        localStorage.removeItem('crm_token');
        localStorage.removeItem('crm_user');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  /**
   * Login: store token and user in state + localStorage.
   */
  const login = useCallback(async (email, password) => {
    const res = await authService.login({ email, password });
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('crm_token', newToken);
    localStorage.setItem('crm_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return res.data;
  }, []);

  /**
   * Logout: clear all auth state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for consuming auth context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
