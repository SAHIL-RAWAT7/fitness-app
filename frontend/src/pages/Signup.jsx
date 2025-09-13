import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, loading } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} flex justify-center items-center min-h-screen`}>
      <form
        onSubmit={handleSubmit}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md w-full max-w-md`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? <Loader /> : <Button text="Sign Up" type="submit" />}

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
