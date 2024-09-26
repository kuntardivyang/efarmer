import React from 'react';

const Gallery = () => {
  return (
    <div className="w-full">
      <div className="py-10">   
        <div className="flex justify-center">
          <div className="relative">
            <div className="overflow-hidden">
              <ul className="flex space-x-4 slick-initialized slick-slider slick-dotted">
                <a className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full" href="#">
                  <span className="text-lg"><i className="icon-left-open-big"></i></span>
                </a>
                <div className="flex overflow-x-auto snap-x snap-mandatory">
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic5.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic3.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic2.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic4.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic5.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                  <li className="flex-none w-2/5 snap-center">
                    <img className="w-full h-auto" src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-pic3.jpg" alt="" loading="lazy" style={{ height: '400px' }} />
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
