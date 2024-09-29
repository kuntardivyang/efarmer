import React, { useState } from 'react';
import {Navbar} from '../base/Navbar';
import Footer from '../base/Footer';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use EmailJS to send the form data
    emailjs.send('service_MealDash', 'template_l0bpxnq', formData, 'ktkpzx4rjtTSmrmgC')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSent(true); // Show success message
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>
            <p className="mb-2">If you have any questions about your orders or our services, feel free to reach out:</p>
            <ul className="text-lg text-gray-700">
              <li><strong>Email:</strong> support@efarmer.com</li>
              <li><strong>Phone:</strong> +91 9978617480</li>
              <li><strong>Working Hours:</strong> 9:00 AM - 9:00 PM, Mon-Sun</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Office</h2>
            <address className="text-lg text-gray-700">
              <strong>eFarmer HQ</strong><br />
              1234 Foodie Lane, Suite 567<br />
              Cityville, CA 91020<br />
              United States
            </address>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          {isSent ? (
            <p className="text-green-600 font-bold text-lg">Thank you! Your message has been sent successfully.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-medium">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-gray-700 font-medium">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;


// service id = service_MealDash
// template_l0bpxnq
// ktkpzx4rjtTSmrmgC