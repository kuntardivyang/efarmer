import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  // State to handle form input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    isFarmer: true, // Default is set to Farmer
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For radio buttons, we need to set the boolean value correctly
    if (type === 'radio') {
      setFormData({
        ...formData,
        [name]: value === 'true', // Convert string to boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log(response.data);
      alert('User registered successfully!');
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  // Handle close button click
  const handleClose = () => {
    navigate('/'); // Redirect to home page on close
  };

  return (
    <div>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
          >
            &times; {/* Cross button (X) */}
          </button>
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Agriculture-related image
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <a href='/'><h2 className="text-2xl font-semibold text-center" style={{ color: '#274135' }}>
              eFarmer
            </h2></a>

            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex">
                <div className="flex">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Farmer</label>
                  <input
                    type="radio"
                    name="isFarmer"
                    value="true" // Set value as a string "true"
                    className="radio ml-1"
                    checked={formData.isFarmer === true} // Check if isFarmer is true
                    onChange={handleChange}
                  />
                </div>
                <div className="flex ml-8">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Customer</label>
                  <input
                    type="radio"
                    name="isFarmer"
                    value="false" // Set value as a string "false"
                    className="radio ml-1"
                    checked={formData.isFarmer === false} // Check if isFarmer is false
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  style={{ backgroundColor: '#274135', color: 'white' }}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
