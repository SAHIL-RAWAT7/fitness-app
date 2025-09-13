import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DietPlans from './pages/DietPlans';
import WorkoutPlans from './pages/WorkoutPlans';
import Progress from './pages/Progress';
import Reminders from './pages/Reminders';
import BMICalculator from './pages/BMICalculator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllWorkouts from './pages/AllWorkouts';
import Loader from './components/Loader';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  // Show loader while checking authentication state
  if (authLoading) return <Loader message="Authenticating..." />;

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Redirect based on user state */}
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/diet-plans"
              element={user ? <DietPlans /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/workout-plans"
              element={user ? <WorkoutPlans /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/progress"
              element={user ? <Progress /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/bmi-calculator"
              element={user ? <BMICalculator /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/reminders"
              element={user ? <Reminders /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/all-workouts"
              element={user ? <AllWorkouts /> : <Navigate to="/login" replace />}
            />
            {/* Auth routes */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
            />
            {/* Fallback route */}
            <Route
              path="*"
              element={<p className="text-center mt-10 text-xl">Page Not Found</p>}
            />
          </Routes>
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
