import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GiWeightLiftingUp, GiAppleCore, GiTrophy } from 'react-icons/gi';
import { BsBarChartLine } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function Dashboard() {
  const [dietCount, setDietCount] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);
  const [dashboardWorkouts, setDashboardWorkouts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadDashboardWorkouts();
  }, [user]);

  const loadDashboardWorkouts = () => {
    if (user) {
      const stored = localStorage.getItem(`dashboardWorkouts_${user.uid}`);
      const workouts = stored ? JSON.parse(stored) : [];
      setDashboardWorkouts(workouts);
      setWorkoutCount(workouts.length);
    }
  };

  const handleRemoveWorkout = (id) => {
    const updatedWorkouts = dashboardWorkouts.filter((w) => w.id !== id);
    setDashboardWorkouts(updatedWorkouts);
    setWorkoutCount(updatedWorkouts.length);
    localStorage.setItem(`dashboardWorkouts_${user.uid}`, JSON.stringify(updatedWorkouts));
    toast.success('Workout removed from dashboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />

      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-blue-600">{user?.name || 'User'}</span>!
        </h1>
        <p className="text-gray-500 mt-2">Ready to crush your fitness goals today?</p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <Link to="/all-workouts">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg cursor-pointer">
            <div className="flex justify-center mb-3">
              <GiWeightLiftingUp className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-1">Workouts</h3>
            <p className="text-2xl font-bold">{workoutCount}</p>
            <p className="text-sm text-gray-500">Added to Dashboard</p>
          </motion.div>
        </Link>

        <Link to="/diet-plans">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg cursor-pointer">
            <div className="flex justify-center mb-3">
              <GiAppleCore className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-semibold mb-1">Calories</h3>
            <p className="text-2xl font-bold">{dietCount}</p>
            <p className="text-sm text-gray-500">0/day</p>
          </motion.div>
        </Link>

        <Link to="/personal-best">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg cursor-pointer">
            <div className="flex justify-center mb-3">
              <GiTrophy className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="font-semibold mb-1">Personal Best</h3>
            <p className="text-2xl font-bold">{progressCount}</p>
            <p className="text-sm text-gray-500">Track your achievements</p>
          </motion.div>
        </Link>

        <Link to="/reminders">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg cursor-pointer">
            <div className="flex justify-center mb-3">
              <AiOutlineClockCircle className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="font-semibold mb-1">Reminders</h3>
            <p className="text-2xl font-bold">{reminderCount}</p>
            <p className="text-sm text-gray-500">Set reminders</p>
          </motion.div>
        </Link>

        <Link to="/progress">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg cursor-pointer">
            <div className="flex justify-center mb-3">
              <BsBarChartLine className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-1">Progress</h3>
            <p className="text-2xl font-bold">{progressCount}</p>
            <p className="text-sm text-gray-500">Track your growth</p>
          </motion.div>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Dashboard Workouts</h2>
        {dashboardWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300"
              >
                <img
                  src={workout.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={workout.title || 'Workout Image'}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{workout.difficulty || 'Beginner'}</span>
                    {(workout.categories || []).map((cat, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">{cat}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                  <div className="flex gap-4 text-sm text-gray-700 mb-3">
                    <div><strong>Sets:</strong> {workout.sets || 3}</div>
                    <div><strong>Reps:</strong> {workout.reps || 12}</div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemoveWorkout(workout.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                      title="Remove Workout"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't added any workouts yet.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
