// pages/WorkoutPlans.jsx
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutPlans() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', duration: '', videoUrl: '' }]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get('/workouts');
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setWorkoutPlans(data || []);
    } catch (err) {
      console.error('Fetch error:', err.response || err);
      const message = err.response?.data?.message || 'Failed to load workouts.';
      toast.error(message);
    }
    setLoading(false);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', duration: '', videoUrl: '' }]);
  };

  const removeExerciseField = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please provide a title.');
      return;
    }
    if (exercises.some((ex) => !ex.name.trim() || !ex.sets)) {
      toast.error('All exercises must have a name and sets.');
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      exercises: exercises.map((ex) => ({
        name: ex.name.trim(),
        sets: Number(ex.sets),
        reps: ex.reps ? Number(ex.reps) : undefined,
        duration: ex.duration ? Number(ex.duration) : undefined,
        videoUrl: ex.videoUrl ? ex.videoUrl.trim() : ''
      }))
    };

    try {
      const token = localStorage.getItem('token'); // Add token if your backend requires auth
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post('/workouts', payload, { headers });
      console.log('Workout added:', res.data);

      toast.success('Workout added successfully!');

      // Optimistically add the new workout to state
      setWorkoutPlans((prev) => [res.data, ...prev]);

      // Reset form
      setTitle('');
      setDescription('');
      setExercises([{ name: '', sets: '', reps: '', duration: '', videoUrl: '' }]);
    } catch (err) {
      console.error('Add workout error:', err.response || err);
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : err.message) ||
        'Failed to add workout.';
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Workout Plans</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {exercises.map((ex, i) => (
          <div key={i} className="border p-3 mb-2 rounded bg-gray-50 relative">
            <input
              type="text"
              placeholder="Exercise Name"
              value={ex.name}
              onChange={(e) => handleExerciseChange(i, 'name', e.target.value)}
              className="w-full mb-2 border p-1 rounded"
            />
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Sets"
                value={ex.sets}
                onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)}
                className="w-1/4 border p-1 rounded"
              />
              <input
                type="number"
                placeholder="Reps"
                value={ex.reps}
                onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)}
                className="w-1/4 border p-1 rounded"
              />
              <input
                type="number"
                placeholder="Duration (min)"
                value={ex.duration}
                onChange={(e) => handleExerciseChange(i, 'duration', e.target.value)}
                className="w-1/4 border p-1 rounded"
              />
              <input
                type="text"
                placeholder="Video URL"
                value={ex.videoUrl}
                onChange={(e) => handleExerciseChange(i, 'videoUrl', e.target.value)}
                className="w-1/4 border p-1 rounded"
              />
            </div>
            {exercises.length > 1 && (
              <button
                type="button"
                onClick={() => removeExerciseField(i)}
                className="absolute top-1 right-1 text-red-500 font-bold"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addExerciseField}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Add Exercise
        </button>

        <Button text="Add Workout Plan" type="submit" />
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {workoutPlans.length ? (
            workoutPlans.map((plan) => (
              <Card key={plan._id} title={plan.title} description={plan.description}>
                                {plan.exercises?.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                    {plan.exercises.map((ex, i) => (
                      <li key={i}>
                        {ex.name} - {Number(ex.sets)} sets
                        {ex.reps ? ` × ${Number(ex.reps)} reps` : ''}
                        {ex.duration ? ` (${Number(ex.duration)} min)` : ''}
                        {ex.videoUrl && (
                          <a
                            href={ex.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 underline"
                          >
                            Video
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

              </Card>
            ))
          ) : (
            <p className="text-gray-500">No workout plans found.</p>
          )}
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default WorkoutPlans;
