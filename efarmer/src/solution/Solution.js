import React from 'react';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
// import powdery from './powdery.mp4'

const Solution = () => {

    const powderyVideo = `${process.env.PUBLIC_URL}/powdery.mp4`;

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Crop Disease Solutions</h1>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Powdery Mildew</h2>
          <p className="text-gray-700 mb-4">
            Powdery mildew appears as white or gray powdery spots on the leaves, stems, and buds of plants. It thrives in warm, dry conditions with high humidity and poor air circulation.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-4">Management and Treatment:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Cultural Practices:</strong> Increase air circulation, avoid overhead watering, and remove infected leaves.</li>
            <li><strong>Fungicides:</strong> Use sulfur or potassium bicarbonate-based fungicides and neem oil for treatment.</li>
            <li><strong>Homemade Remedies:</strong> Use a baking soda solution (1 tbsp baking soda + 1 gallon water) or milk spray (1 part milk to 9 parts water).</li>
            <li><strong>Resistant Varieties:</strong> Choose plant varieties that are resistant to powdery mildew.</li>
          </ul>

          {/* Video Section for Powdery Mildew */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn More About Powdery Mildew:</h3>
            <iframe 
              width="100%" 
              height="315" 
              src={powderyVideo} // Replace with actual video ID
              title="Powdery Mildew Solutions" 
              frameBorder="0" 
              allowFullScreen 
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </section>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rust Disease</h2>
          <p className="text-gray-700 mb-4">
            Rust appears as small, rust-colored pustules on the leaves and stems, caused by various rust fungi. It can lead to significant yield loss if not managed.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-4">Management and Treatment:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Cultural Practices:</strong> Practice crop rotation, remove debris, and manage watering schedules.</li>
            <li><strong>Fungicides:</strong> Apply triazoles and strobilurins, or copper-based fungicides as needed.</li>
            <li><strong>Plant Resistance:</strong> Use rust-resistant plant varieties when available.</li>
            <li><strong>Regular Monitoring:</strong> Check plants frequently for early signs of rust disease.</li>
          </ul>

          {/* Video Section for Rust Disease */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn More About Rust Disease:</h3>
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/YOUR_RUST_DISEASE_VIDEO_ID" // Replace with actual video ID
              title="Rust Disease Solutions" 
              frameBorder="0" 
              allowFullScreen 
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Solution;
