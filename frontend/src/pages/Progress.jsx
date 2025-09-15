import { useState, useEffect, useContext } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

function Progress() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [notes, setNotes] = useState('');
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = () => {
    if (!user) return;
    const stored = localStorage.getItem(`dashboardProgress_${user.uid}`);
    const progress = stored ? JSON.parse(stored) : [];
    setProgressList(progress);
  };

  const saveProgress = (progress) => {
    if (!user) return;
    localStorage.setItem(`dashboardProgress_${user.uid}`, JSON.stringify(progress));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight.trim() && !bodyFat.trim() && !chest.trim() && !waist.trim() && !hips.trim() && !notes.trim()) {
      toast.error('Please fill at least one field.');
      return;
    }

    const newEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      hips: hips ? parseFloat(hips) : undefined,
      notes: notes.trim() || undefined,
    };

    const updatedList = [newEntry, ...progressList];
    setProgressList(updatedList);
    saveProgress(updatedList);

    toast.success('Progress added successfully!');

    // Reset form
    setWeight('');
    setBodyFat('');
    setChest('');
    setWaist('');
    setHips('');
    setNotes('');
  };

  const handleRemoveProgress = (id) => {
    const updatedList = progressList.filter((entry) => entry.id !== id);
    setProgressList(updatedList);
    saveProgress(updatedList);
    toast.success('Progress entry removed!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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
          {progressList.length > 0 ? (
            progressList.map((item) => (
              <Card
                key={item.id}
                title={`Date: ${new Date(item.date).toLocaleDateString()}`}
                description={
                  <>
                    {item.weight !== undefined && <p>Weight: {item.weight} kg</p>}
                    {item.bodyFat !== undefined && <p>Body Fat: {item.bodyFat}%</p>}
                    {item.chest !== undefined && <p>Chest: {item.chest} cm</p>}
                    {item.waist !== undefined && <p>Waist: {item.waist} cm</p>}
                    {item.hips !== undefined && <p>Hips: {item.hips} cm</p>}
                    {item.notes && <p>Notes: {item.notes}</p>}
                    <button
                      onClick={() => handleRemoveProgress(item.id)}
                      className="mt-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </>
                }
              />
            ))
          ) : (
            <p className="text-gray-500">No progress records found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Progress;
