import { createContext, useState } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Signup function
  const signup = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/users/register', { name, email, password });
      setUser(res.data);
      setLoading(false);
      return true; // Signup successful
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
      return false; // Signup failed
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/users/login', { email, password });
      setUser(res.data);
      setLoading(false);
      return true; // Login successful
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return false; // Login failed
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
