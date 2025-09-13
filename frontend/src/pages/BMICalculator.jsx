import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      toast.error('Please enter valid positive numbers for weight and height.');
      setMessage('');
      setBmi(null);
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(1);
    setBmi(roundedBmi);

    let resultMessage = '';
    if (bmiValue < 18.5) {
      resultMessage = 'Underweight';
    } else if (bmiValue < 25) {
      resultMessage = 'Normal weight';
    } else if (bmiValue < 30) {
      resultMessage = 'Overweight';
    } else {
      resultMessage = 'Obese';
    }

    setMessage(resultMessage);
    toast.success(`BMI calculated: ${roundedBmi} (${resultMessage})`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">BMI Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kilograms"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in centimeters"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Calculate BMI
          </button>
        </div>

        {bmi !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">Your BMI is:</p>
            <p className="text-3xl font-bold text-blue-600">{bmi}</p>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        )}
      </div>

      {/* ToastContainer must be inside the component tree */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default BMICalculator;
