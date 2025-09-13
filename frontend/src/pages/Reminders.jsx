import { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import api from '../utils/api';

function Reminders() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/reminders');
      if (Array.isArray(response.data)) {
        setReminders(response.data);
      } else if (Array.isArray(response.data.data)) {
        setReminders(response.data.data);
      } else {
        setReminders([]); // silently handle unexpected format
      }
    } catch (err) {
      console.error('Error fetching reminders:', err);
      setError('Failed to load reminders.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.post('/reminders', { title, description });
      setTitle('');
      setDescription('');
      fetchReminders();
    } catch (err) {
      console.error('Error adding reminder:', err);
      setError('Failed to add reminder.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reminders</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <FormInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter reminder title"
        />
        <FormInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter reminder description"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button text="Add Reminder" type="submit" />
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {Array.isArray(reminders) && reminders.length > 0 ? (
            reminders.map((reminder) => (
              <Card
                key={reminder._id}
                title={reminder.title}
                description={reminder.description}
              />
            ))
          ) : (
            <p className="text-gray-500">No reminders found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Reminders;
