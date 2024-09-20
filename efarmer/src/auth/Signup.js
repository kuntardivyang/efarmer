import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
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
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">eFarmer</h2>

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
                  className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
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