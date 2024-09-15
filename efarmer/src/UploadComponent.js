import React, { useState } from 'react';
import axios from 'axios';

function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrediction(response.data.predicted_class);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Predict</button>
      {prediction !== null && <p>Predicted Class: {prediction}</p>}
    </div>
  );
}

export default UploadComponent;
