import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import backgroundImage from './predict.jpg'; // Import the image

function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRecommend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/recommend_crop/', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setPrediction(response.data.predicted_crop); // Corrected this line
    } catch (error) {
      console.error('Error fetching crop recommendation:', error);
    }
  };
  

  return (
    <div>
      <div className="min-h-screen mt-16 relative" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Brightening Overlay */}
        <div className="absolute inset-0 bg-dark opacity-30"></div>

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <div className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 sm:px-6 lg:px-8">

            {/* Left Side: Video */}
          <div className="lg:w-1/2 h-64 w-full flex items-center justify-center mt-[20vh]">
            <video
              className="w-full lg:max-w-lg rounded-lg shadow-lg"
              autoPlay
              muted
              loop
              controls
              src=""  
            >
              Your browser does not support the video tag.
            </video>
          </div>

            {/* Right Side: Input Form */}
            <div className="lg:w-1/3 h-128 w-full mb-8 lg:mb-0 bg-white shadow-md rounded-lg p-8 space-y-6 mt-[20vh] mr-32">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Crop Recommendation</h2>
              <div className="space-y-4">
                <input
                  type="number"
                  name="N"
                  placeholder="N (Nitrogen)"
                  value={formData.N}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="P"
                  placeholder="P (Phosphorus)"
                  value={formData.P}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="K"
                  placeholder="K (Potassium)"
                  value={formData.K}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="temperature"
                  placeholder="Temperature (°C)"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="humidity"
                  placeholder="Humidity (%)"
                  value={formData.humidity}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="ph"
                  placeholder="Soil pH"
                  value={formData.ph}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="rainfall"
                  placeholder="Rainfall (mm)"
                  value={formData.rainfall}
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-500 file:py-2 py-2 px-4 border rounded-lg"
                />
                <button
                  onClick={handleRecommend} style={{ backgroundColor: '#274135' }}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Crop Recommendation
                </button>
              </div>
              {prediction !== null && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg text-green-700">
                  <p className="text-center font-semibold">Recommended Crop Index: {prediction}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CropRecommendation;
