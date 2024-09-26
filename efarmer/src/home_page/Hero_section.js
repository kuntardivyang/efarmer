import React from 'react';

const Hero_section = () => {
  return (
    <div className="bg-[url('https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-columnbg1.png')] bg-repeat bg-top p-20">
      <div className="section"> 
        <div className="section_wrapper">
          <div className="wrap flex flex-col items-center">
            <div className="mcb-wrap-inner">
              <div className="w-full flex justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold">The Future of Smart Farming</h3>
                </div>
              </div>
              <div className="my-5 w-full border-t"></div>
              <div className="flex flex-wrap justify-between w-full">
                <div className="flex items-start w-1/2 p-2">
                  <div className="list_item flex items-center">
                    <div className="list_left">
                      <img src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-icon1.png" className="scale-with-grid" alt="farm2-home-icon1" width="70" height="70" />
                    </div>
                    <div className="list_right ml-2">
                      <div className="desc">
                        <h5 className="font-bold">Disease Detection</h5>
                        <p>Early diagnosis of plant diseases to safeguard your crops</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start w-1/2 p-2">
                  <div className="list_item flex items-center">
                    <div className="list_left">
                      <img src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-icon2.png" className="scale-with-grid" alt="farm2-home-icon2" width="70" height="70" />
                    </div>
                    <div className="list_right ml-2">
                      <div className="desc">
                        <h5 className="font-bold">Profile Management</h5>
                        <p>Easily update and manage your account, crops, and transactions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start w-1/2 p-2">
                  <div className="list_item flex items-center">
                    <div className="list_left">
                      <img src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-icon3.png" className="scale-with-grid" alt="farm2-home-icon3" width="70" height="70" />
                    </div>
                    <div className="list_right ml-2">
                      <div className="desc">
                        <h5 className="font-bold">Yield Prediction</h5>
                        <p>Predict crop yields with precision to make data-driven decisions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start w-1/2 p-2">
                  <div className="list_item flex items-center">
                    <div className="list_left">
                      <img src="https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-home-icon5.png" className="scale-with-grid" alt="farm2-home-icon5" width="70" height="70" />
                    </div>
                    <div className="list_right ml-2">
                      <div className="desc">
                        <h5 className="font-bold">About Us</h5>
                        <p>Learn more about our mission to promote sustainable agriculture</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_section;
