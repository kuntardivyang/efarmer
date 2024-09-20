import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1); // Track the active slide

  useEffect(() => {
    const totalSlides = 4; // Update this number if you add more slides
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === totalSlides ? 1 : prevSlide + 1)); // Cycle slides
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="">
      <div className="carousel w-full h-screen overflow-hidden mt-16">
        <div
          id="slide1"
          className={`carousel-item relative w-full ${
            activeSlide === 1 ? "block" : "hidden"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            className="w-full h-[80vh]"
            alt="Slide 1"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle" onClick={() => setActiveSlide(4)}>
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle" onClick={() => setActiveSlide(2)}>
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide2"
          className={`carousel-item relative w-full ${
            activeSlide === 2 ? "block" : "hidden"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full h-[80vh]"
            alt="Slide 2"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle" onClick={() => setActiveSlide(1)}>
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle" onClick={() => setActiveSlide(3)}>
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide3"
          className={`carousel-item relative w-full ${
            activeSlide === 3 ? "block" : "hidden"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full h-[80vh]"
            alt="Slide 3"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle" onClick={() => setActiveSlide(2)}>
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle" onClick={() => setActiveSlide(4)}>
              ❯
            </a>
          </div>
        </div>
        <div
          id="slide4"
          className={`carousel-item relative w-full ${
            activeSlide === 4 ? "block" : "hidden"
          }`}
        >
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full h-[80vh]"
            alt="Slide 4"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle" onClick={() => setActiveSlide(3)}>
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle" onClick={() => setActiveSlide(1)}>
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
