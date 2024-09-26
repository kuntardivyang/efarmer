import React from 'react';
import image1 from './i1.jpg'; // Import your image to be used everywhere
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Navbar/>
      {/* Section with background image */}
      <div
        className="relative bg-cover bg-center h-96 mt-16"
        style={{ backgroundImage: `url(${image1})` }}  // Correcting the background image error
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-center px-6 font-semibold tracking-wide leading-relaxed text-gray-100 italic shadow-lg">
            At <span className="text-blue-900 bg-yellow-300 px-2 py-1 rounded-md">eFarmer</span> we are dedicated to empowering farmers through technology.
            Our mission is to provide innovative solutions that enhance productivity
            and sustainability in agriculture.
          </p>
        </div>
      </div>

      {/* Horizontal Blocks Section */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Our Mission Block */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img src={image1} alt="Mission Logo" className="h-8 w-8 mr-2" /> {/* Replacing missionLogo with image1 */}
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p>
            We strive to bridge the gap between traditional farming practices and 
            modern technology, helping farmers access resources, knowledge, and tools 
            that improve their livelihoods and the quality of their produce.
          </p>
        </div>

        {/* Our Values Block */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img src={image1} alt="Values Logo" className="h-8 w-8 mr-2" /> {/* Replacing valuesLogo with image1 */}
            <h2 className="text-2xl font-semibold">Our Values</h2>
          </div>
          <ul className="list-disc list-inside">
            <li className="mb-2">Sustainability: We prioritize eco-friendly practices.</li>
            <li className="mb-2">Innovation: We embrace new technologies and ideas.</li>
            <li className="mb-2">Community: We believe in the power of collaboration.</li>
          </ul>
        </div>
      </div>

      {/* New Attractive Image Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Image */}
          <div className="relative group overflow-hidden">
            <img src={image1} alt="Impact 1" className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">Innovation in Farming</h3>
            </div>
          </div>

          {/* Second Image */}
          <div className="relative group overflow-hidden">
            <img src={image1} alt="Impact 2" className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">Sustainable Practices</h3>
            </div>
          </div>

          {/* Third Image */}
          <div className="relative group overflow-hidden">
            <img src={image1} alt="Impact 3" className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">Community Collaboration</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">How We Help <span className="text-stone-50 bg-red-700 px-2 py-1 rounded-md">Farmers</span> and <span className="text-stone-50 bg-teal-800 px-2 py-1 rounded-md">Customers</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Farmer Benefits Block */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center transform transition hover:scale-105 hover:bg-blue-100 hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Empowering Farmers</h3>
            <p>
              At eFarmer, we address key farming challenges such as access to modern tools, knowledge, and markets. 
              By offering cutting-edge technology and resources, we help farmers increase productivity and adopt sustainable practices, resulting in higher yields and better profits.
            </p>
          </div>
          
          {/* Profit Benefits Block */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center transform transition hover:scale-105 hover:bg-green-100 hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Increased Profitability</h3>
            <p>
              With our platform, farmers can optimize their operations, reduce costs, and access new markets.
              This leads to better financial stability, allowing farmers to reinvest in their farms and improve their livelihoods.
            </p>
          </div>
          
          {/* Customer Benefits Block */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center transform transition hover:scale-105 hover:bg-yellow-100 hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Better for Customers</h3>
            <p>
              Customers benefit from eFarmer by getting access to fresh, sustainably grown produce directly from farmers. 
              By shortening the supply chain, customers enjoy higher-quality products at competitive prices, 
              while supporting local farmers and eco-friendly practices.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the content (like Meet Our Team) */}
      <div className="py-8">
        {/* ... */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Get Involved</h2>
        <p className="mb-6">
          Join us in our mission to revolutionize farming! Contact us to learn 
          more about how you can get involved.
        </p>
        <a href="/contact" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition">
          Contact Us
        </a>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
