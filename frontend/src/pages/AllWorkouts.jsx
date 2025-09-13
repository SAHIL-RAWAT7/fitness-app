import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { FiPlus, FiPlay } from 'react-icons/fi'; // Added imports for Plus and Play icons

const defaultWorkouts = [
  {
    id: 1,
    title: 'Push-ups',
    difficulty: 'Beginner',
    categories: ['Chest', 'Arms'],
    description: 'A classic upper body exercise that targets chest, shoulders, and triceps.',
    image: 'https://th.bing.com/th/id/OIP.1fGday65FxUbbZ978YCBfwHaEj?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 3,
    reps: '12-15',
    video: 'https://c.tenor.com/gI-8qCUEko8AAAAC/pushup.gif',
  },
  {
    id: 2,
    title: 'Squats',
    difficulty: 'Beginner',
    categories: ['Legs'],
    description: 'Fundamental lower body exercise that builds leg and glute strength.',
    image: 'https://th.bing.com/th/id/OIP.DfVYe9yBliEfs8oMwbnPjwHaE8?w=278&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 4,
    reps: '10-12',
    video: 'https://media1.tenor.com/m/pANVg22G1JAAAAAC/workouts-squats.gif',
  },
  {
    id: 3,
    title: 'Deadlifts',
    difficulty: 'Advanced',
    categories: ['Full Body'],
    description: 'Works the posterior chain muscles including hamstrings and lower back.',
    image: 'https://th.bing.com/th/id/OIP.dCf4ocAPuh4D9BRma6YqxgHaEv?w=296&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 5,
    reps: '5-8',
    video: 'https://i.pinimg.com/originals/81/f1/23/81f1230ab56427e0bb86e2b3c2c6cb6f.gif',
  },
  {
    id: 4,
    title: 'Bench Press',
    difficulty: 'Intermediate',
    categories: ['Chest'],
    description: 'Primary exercise for developing chest muscles and upper body strength.',
    image: 'https://th.bing.com/th/id/OIP.fieIYNV4QvwPnpjsdlGyHQHaEK?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 4,
    reps: '8-10',
    video: 'https://media.tenor.com/0hoNLcggDG0AAAAC/bench-press.gif',
  },
  {
    id: 5,
    title: 'Pull-ups',
    difficulty: 'Intermediate',
    categories: ['Back'],
    description: 'Excellent for building upper body strength, particularly the back muscles.',
    image: 'https://th.bing.com/th/id/OIP.w4Id1YHm_y8CFecJdT0oHgHaFj?w=224&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 3,
    reps: '8-12',
    video: 'https://gifdb.com/images/high/spiderman-pull-ups-animation-e5gg8tk8g6tgr0s7.gif',
  },
  {
    id: 6,
    title: 'Plank',
    difficulty: 'Beginner',
    categories: ['Core'],
    description: 'Core strengthening exercise that improves stability and endurance.',
    image: 'https://th.bing.com/th/id/OIP.b1uf0Y_E3XTXYjAdbZMNNAHaHZ?w=183&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    sets: 3,
    reps: '30-60 sec',
    video: 'https://th.bing.com/th/id/R.f7979dfc8b43294f480d475e1e823246?rik=FYAaQc%2fVJyDj8A&riu=http%3a%2f%2fmedia-s3-us-east-1.ceros.com%2ffidelity-interactive%2fimages%2f2019%2f04%2f23%2ffa0ba91510838f144dea9eb30cc005a7%2fplanks.gif&ehk=FBd1J%2bb3X8O6vv6UO4a4SOk%2fvLPk9u%2boRkPShVG2eu8%3d&risl=&pid=ImgRaw&r=0',
  },
];

function AllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalWorkout, setModalWorkout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setWorkouts(defaultWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
    setLoading(false);
  };

  const handleAddToDashboard = (workout) => {
    const stored = localStorage.getItem(`dashboardWorkouts_${user?.uid}`);
    const currentWorkouts = stored ? JSON.parse(stored) : [];
    if (!currentWorkouts.find((w) => w.id === workout.id)) {
      const updatedWorkouts = [workout, ...currentWorkouts].slice(0, 10);
      localStorage.setItem(`dashboardWorkouts_${user?.uid}`, JSON.stringify(updatedWorkouts));
      toast.success(`${workout.title} added to Dashboard!`);
    } else {
      toast.info(`${workout.title} is already in the Dashboard.`);
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase();
    const inTitle = workout.title.toLowerCase().includes(query);
    const inCategories = workout.categories.some((cat) =>
      cat.toLowerCase().includes(query)
    );
    return inTitle || inCategories;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Exercise Library</h1>

      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <Loader message="Loading workouts..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{workout.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{workout.difficulty}</span>
                    {workout.categories.map((cat, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">{cat}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-700">
                    <div><strong>Sets:</strong> {workout.sets}</div>
                    <div><strong>Reps:</strong> {workout.reps}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToDashboard(workout)}
                      className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition flex-1 flex items-center justify-center"
                      title="Add to Dashboard"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setModalWorkout(workout)}
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition flex-1 flex items-center justify-center"
                      title="Watch Video"
                    >
                      <FiPlay className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No workouts found.</p>
          )}
        </div>
      )}

      <AnimatePresence>
        {modalWorkout && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalWorkout(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full mx-4 p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{modalWorkout.title}</h2>
              <div className="aspect-video w-full mb-4">
                <img
                  src={modalWorkout.video}
                  alt={`${modalWorkout.title} video`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <button
                onClick={() => setModalWorkout(null)}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AllWorkouts;
