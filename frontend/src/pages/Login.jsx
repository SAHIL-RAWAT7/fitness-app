// pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('Logged in successfully!');
      navigate('/dashboard', { replace: true }); // redirect after login
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
      } flex justify-center items-center min-h-screen transition-colors duration-300`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? <Loader /> : <Button text="Login" type="submit" />}

        <p className="mt-4 text-center">
          New user?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
