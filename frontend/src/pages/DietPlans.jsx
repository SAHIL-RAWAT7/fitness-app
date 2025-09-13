import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Loader from '../components/Loader';
import api from '../utils/api';

function DietPlans() {
  const { darkMode } = useContext(ThemeContext);
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    setLoading(true);
    try {
      const response = await api.get('/diets');
      setDietPlans(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch diet plans.', { theme: darkMode ? 'dark' : 'light' });
    }
    setLoading(false);
  };

  const addMealToList = () => {
    if (!mealName || !calories || !proteins || !carbs) {
      toast.error('Fill all meal fields!', { theme: darkMode ? 'dark' : 'light' });
      return;
    }
    const newMeal = {
      id: Date.now(),
      name: mealName,
      calories: Number(calories),
      proteins: Number(proteins),
      carbs: Number(carbs),
    };
    setMeals([...meals, newMeal]);
    setMealName('');
    setCalories('');
    setProteins('');
    setCarbs('');
    toast.success(`${newMeal.name} added!`, { theme: darkMode ? 'dark' : 'light' });
  };

  const removeMealFromList = (id) => {
    const mealToRemove = meals.find(m => m.id === id);
    setMeals(meals.filter(m => m.id !== id));
    toast.error(`${mealToRemove.name} removed`, { theme: darkMode ? 'dark' : 'light' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || meals.length === 0) {
      toast.error('Fill all fields and add at least one meal!', { theme: darkMode ? 'dark' : 'light' });
      return;
    }
    setLoading(true);
    try {
      await api.post('/diets', { title, description, meals });
      toast.success('Diet plan added!', { theme: darkMode ? 'dark' : 'light' });
      setTitle('');
      setDescription('');
      setMeals([]);
      fetchDietPlans();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add diet plan.', { theme: darkMode ? 'dark' : 'light' });
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Diet Plans</h1>

        {/* Diet Plan Form */}
        <form onSubmit={handleSubmit} className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Add New Diet Plan</h2>
          <FormInput label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Diet plan title" />
          <FormInput label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Diet plan description" />

          <h3 className="text-lg font-medium mt-6 mb-2">Add Meal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FormInput label="Meal Name" value={mealName} onChange={e => setMealName(e.target.value)} placeholder="Meal Name" />
            <FormInput label="Calories" value={calories} onChange={e => setCalories(e.target.value)} placeholder="Calories" type="number" />
            <FormInput label="Proteins (g)" value={proteins} onChange={e => setProteins(e.target.value)} placeholder="Proteins" type="number" />
            <FormInput label="Carbs (g)" value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="Carbs" type="number" />
          </div>
          <Button
            type="button"
            onClick={addMealToList}
            text="Add Meal"
            className={`w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-green-300 dark:focus:ring-green-700 transition`}
          />

          {meals.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Meals List</h4>
              {meals.map(meal => (
                <div key={meal.id} className={`flex justify-between items-center p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-2`}>
                  <div>
                    <p className="font-semibold">{meal.name}</p>
                    <p className="text-sm text-gray-500">{meal.calories} cal, {meal.proteins}g protein, {meal.carbs}g carbs</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMealFromList(meal.id)}
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-700 transition"
                    aria-label="Remove meal"
                  >
                    <FiTrash2 className="text-red-500 hover:text-red-700" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            text="Add Diet Plan"
            className={`mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-blue-700 transition`}
          />
        </form>

        {/* Diet Plans Display */}
        <h2 className="text-2xl font-bold mt-10 mb-6 text-center">All Diet Plans</h2>
        {loading && !dietPlans.length ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dietPlans.length > 0 ? dietPlans.map(plan => (
              <div key={plan._id} className={`p-5 rounded-xl shadow-md transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-bold mb-3">{plan.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{plan.description}</p>
                <div className="divide-y divide-gray-300 dark:divide-gray-600 max-h-48 overflow-y-auto">
                  {plan.meals.map((meal, idx) => (
                    <div key={idx} className="py-2">
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-500">{meal.calories} cal, {meal.proteins || 0}g protein, {meal.carbs || 0}g carbs</p>
                    </div>
                  ))}
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 col-span-full">No diet plans available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DietPlans;
