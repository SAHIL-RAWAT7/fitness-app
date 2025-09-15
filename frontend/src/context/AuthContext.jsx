// context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if token exists on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally fetch user info here if needed
      setUser({ token }); // or fetch and set actual user data
    }
  }, []);

  // Signup function
  const signup = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/users/register', { name, email, password });

      // If the response includes a token, store it here
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user || { name, email });
      } else {
        setUser(res.data.user || { name, email });
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/users/login', { email, password });

      const token = res.data.token;
      const userData = res.data.user;

      if (token) {
        localStorage.setItem('token', token);
        setUser(userData || { email });
        setLoading(false);
        return true;
      } else {
        setError('Invalid login response');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
