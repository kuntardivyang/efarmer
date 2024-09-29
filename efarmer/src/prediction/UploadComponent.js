import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import { useNavigate } from 'react-router-dom'; // For navigation
import backgroundImage from './predict.jpg'; // Import the image

function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate(); // React Router's navigate hook

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.predicted_class);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSolutionRedirect = () => {
    if (prediction === 'Rust') {
      navigate('/rsolution'); // Redirect to /rsolution if Rust
    } else if (prediction === 'Healthy') {
      
    } else if (prediction === 'Powdery') {
      navigate('/psolution'); // Redirect to /solution if Powdery
    }
  };

  return (
    <div>
      <div
        className="min-h-screen mt-16 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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

            {/* Right Side: Upload Form */}
            <div className="lg:w-1/3 h-64 w-full mb-8 lg:mb-0 bg-white shadow-md rounded-lg p-8 space-y-6 mt-[20vh] mr-32">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Upload and Predict</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#A8D3D2] file:text-[#274135] hover:file:bg-[#6FAFAD]"
                />
                <button
                  onClick={handleUpload}
                  style={{ backgroundColor: '#274135' }}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload and Predict
                </button>
              </div>

              {prediction !== null && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg text-green-700">
                  <p className="text-center font-semibold">Predicted Class: {prediction}</p>

                  {/* Conditionally show the solution button based on prediction */}
                  {(prediction === 'Rust' || prediction === 'Powdery') && (
                    <button
                      onClick={handleSolutionRedirect}
                      className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                    >
                      See Solution
                    </button>
                  )}
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

export default UploadComponent;
