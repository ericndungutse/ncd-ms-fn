import { useState, useCallback, useEffect } from 'react';
import { loginApi } from '../service/auth.service';
import { getErrorMessage, getResponseData } from '../utils/axios.utils';
import { AuthContext } from './auth-context';

const STORAGE_TOKEN_KEY = 'token';
const STORAGE_USER_KEY = 'user';
const LEGACY_TOKEN_KEY = 'ncdc_token';
const LEGACY_USER_KEY = 'ncdc_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    const storedUser = localStorage.getItem(STORAGE_USER_KEY) || localStorage.getItem(LEGACY_USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        // Corrupt storage; clear and continue
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      const { message, data } = getResponseData(response) || {};
      const newToken = data?.token;
      const newUser = data?.user;

      if (!newToken || !newUser) {
        throw new Error(message || 'Invalid login response');
      }

      // Persist for session reuse
      localStorage.setItem(STORAGE_TOKEN_KEY, newToken);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_USER_KEY);

      setToken(newToken);
      setUser(newUser);

      return { token: newToken, user: newUser, message };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = !!token;
  const hasRole = useCallback(
    (role) => {
      if (!user) return false;
      if (Array.isArray(role)) {
        return role.includes(user.role);
      }
      return user.role === role;
    },
    [user]
  );

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
