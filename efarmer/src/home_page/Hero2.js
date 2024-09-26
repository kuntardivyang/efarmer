import React from 'react';

const Hero2 = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="Yield Prediction"
                  className="object-cover object-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105"
                  src="https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Yield Prediction</h2>
              <p className="text-base leading-relaxed mt-2">
                Increase your farming productivity with advanced AI tools that help predict crop yields with precision.
              </p>
              <a
                className="text-green-500 inline-flex items-center mt-3 transition duration-300 ease-in-out transform hover:text-green-700"
                href="#"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="Disease Prediction"
                  className="object-cover object-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105"
                  src="https://plus.unsplash.com/premium_photo-1661875030035-06d7da798728?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Disease Detection</h2>
              <p className="text-base leading-relaxed mt-2">
                Detect plant diseases early with AI-driven image recognition technology, and protect your crops.
              </p>
              <a
                className="text-green-500 inline-flex items-center mt-3 transition duration-300 ease-in-out transform hover:text-green-700"
                href="#"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="Ecommerce"
                  className="object-cover object-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105"
                  src="https://plus.unsplash.com/premium_photo-1664299231810-29d1caf6f753?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">E-Commerce</h2>
              <p className="text-base leading-relaxed mt-2">
                Easily sell your produce online and connect directly with consumers through our e-commerce platform.
              </p>
              <a
                className="text-green-500 inline-flex items-center mt-3 transition duration-300 ease-in-out transform hover:text-green-700"
                href="#"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero2;
