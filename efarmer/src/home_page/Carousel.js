import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 4; // Adjust based on your slides

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === totalSlides ? 1 : prevSlide + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalSlides]);

  const images = [
    "https://images.unsplash.com/photo-1498408040764-ab6eb772a145?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JvcHN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1516906400500-0f51432db48c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvcHN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1542806136-b50e2a5b006f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JvcHN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1664116928607-896124327b11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JvcHN8ZW58MHx8MHx8fDA%3D",
  ];

  return (
    <div className="relative mt-16">
      <div className="carousel w-full h-[83vh] overflow-hidden">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`carousel-item relative w-full ${activeSlide === index + 1 ? "block" : "hidden"}`}
          >
            <img
              src={images[index]} // Use the Unsplash images
              className="w-full h-[80vh] object-cover transition-transform duration-300 transform hover:scale-105"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                className="btn btn-circle hover:bg-green-500 transition duration-300"
                onClick={() => setActiveSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)}
              >
                ❮
              </button>
              <button
                className="btn btn-circle hover:bg-green-500 transition duration-300"
                onClick={() => setActiveSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)}
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
