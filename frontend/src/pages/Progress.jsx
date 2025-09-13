import { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import api from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Progress() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [notes, setNotes] = useState('');
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const response = await api.get('/progress');
      if (Array.isArray(response.data)) {
        setProgressList(response.data);
      } else if (Array.isArray(response.data.data)) {
        setProgressList(response.data.data);
      } else {
        setProgressList([]);
      }
    } catch (err) {
      console.error('Fetch progress error:', err.response || err);
      const message = err.response?.data?.message || 'Failed to load progress.';
      toast.error(message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!weight.trim() && !bodyFat.trim() && !chest.trim() && !waist.trim() && !hips.trim() && !notes.trim()) {
      toast.error('Please fill at least one field.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/progress', {
        weight: weight ? parseFloat(weight) : undefined,
        bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
        chest: chest ? parseFloat(chest) : undefined,
        waist: waist ? parseFloat(waist) : undefined,
        hips: hips ? parseFloat(hips) : undefined,
        notes,
      });

      toast.success('Progress added successfully!');

      // Reset form
      setWeight('');
      setBodyFat('');
      setChest('');
      setWaist('');
      setHips('');
      setNotes('');

      fetchProgress();
    } catch (err) {
      console.error('Add progress error:', err.response || err);
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : err.message) ||
        'Failed to add progress.';
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <FormInput
          label="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
          type="number"
        />
        <FormInput
          label="Body Fat (%)"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          placeholder="Enter body fat percentage"
          type="number"
        />
        <FormInput
          label="Chest (cm)"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          placeholder="Enter chest measurement"
          type="number"
        />
        <FormInput
          label="Waist (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          placeholder="Enter waist measurement"
          type="number"
        />
        <FormInput
          label="Hips (cm)"
          value={hips}
          onChange={(e) => setHips(e.target.value)}
          placeholder="Enter hips measurement"
          type="number"
        />
        <FormInput
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes"
        />
        <Button text="Add Progress" type="submit" />
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {Array.isArray(progressList) && progressList.length > 0 ? (
            progressList.map((item) => (
              <Card
                key={item._id}
                title={`Date: ${new Date(item.date).toLocaleDateString()}`}
                description={
                  <>
                    {item.weight !== undefined && <p>Weight: {item.weight} kg</p>}
                    {item.bodyFat !== undefined && <p>Body Fat: {item.bodyFat}%</p>}
                    {item.chest !== undefined && <p>Chest: {item.chest} cm</p>}
                    {item.waist !== undefined && <p>Waist: {item.waist} cm</p>}
                    {item.hips !== undefined && <p>Hips: {item.hips} cm</p>}
                    {item.notes && <p>Notes: {item.notes}</p>}
                  </>
                }
              />
            ))
          ) : (
            <p className="text-gray-500">No progress records found.</p>
          )}
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Progress;
