import React from 'react'

const Content = () => {
    return (
        <div className="bg-[#f9f9f9] p-8"> {/* Light background color for the entire section */}
            <div className="flex flex-wrap justify-between h-[405px]">
                <div className="w-1/4 flex items-center justify-center p-8">
                    <div className="text-center">
                        <div className="font-volkhov text-[100px] leading-[100px] font-normal text-[#1f1814]">
                            48
                        </div>
                        <p>Years of<br /> experience</p>
                    </div>
                </div>
                <div className="w-3/4 flex items-center">
                    <div
                        className="bg-[url('https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-columnbg1.png')] bg-repeat bg-top p-20"
                    >
                        <h3>
                            At e-Farmer, we are revolutionizing the way agriculture works by combining cutting-edge technology with the needs of farmers and buyers. Our platform offers a comprehensive suite of tools to empower farmers to boost their productivity and profitability. With advanced yield prediction and disease detection powered by AI, we help farmers optimize their resources and minimize crop loss.
                        </h3>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Content