import React from 'react';

const Hero_section = () => {
  return (
    <div>
      <div
        className="hero h-[50vh] bg-opacity-50"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/heroImage.jpg)`,
        }}
      >
        <section className="text-gray-600 body-font -mt-6">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4 -my-8 opacity-70">
              {['The 400 Blows', 'Shooting Stars', 'Neptune'].map((title, index) => (
                <div key={index} className="py-8 px-4 lg:w-[30%] bg-white ml-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="h-full flex items-start">
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">CATEGORY</h2>
                      <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{title}</h1>
                      <p className="leading-relaxed mb-5">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                      <a className="inline-flex items-center">
                        <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                        <span className="flex-grow flex flex-col pl-3">
                          <span className="title-font font-medium text-gray-900">Author Name</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero_section;
