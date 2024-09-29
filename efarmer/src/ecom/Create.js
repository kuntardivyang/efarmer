import React, { useState } from 'react';

const Create = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    description: '',
    pricePerKg: '',
    image: null,
    quantity: '',
    farmerName: '',
    category: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // Preview the image
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setShowModal(false); // Close the modal after submission
      setFormData({ // Reset the form
        cropName: '',
        description: '',
        pricePerKg: '',
        image: null,
        quantity: '',
        farmerName: '',
        category: '',
      });
      setImagePreview(null); // Clear image preview
      setError(null); // Reset error message

      window.location.href = '/ecommerce';
    } catch (error) {
      setError(error.message); // Set error message for display
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Crop Name</label>
                <input
                  type="text"
                  name="cropName"
                  value={formData.cropName}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter crop name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter crop description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price per Kg</label>
                <input
                  type="number"
                  name="pricePerKg"
                  value={formData.pricePerKg}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter price per kg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input 
                  type="file" 
                  name="image"
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full" 
                  required
                />
                {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 h-32 object-cover" />} {/* Image Preview */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity (Kg)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter quantity in kg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Farmer Name</label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Enter farmer name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="border rounded-lg p-2 w-full" 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="seeds">Seeds</option>
                  <option value="pulses">Pulses</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="herbs_spices">Herbs & Spices</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
