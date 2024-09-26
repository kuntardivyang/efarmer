import React from 'react'

const Content2 = () => {
    return (
        <div className="bg-[#f9f9f9] p-8"> {/* Light background color for the entire section */}
            <div className="flex flex-wrap justify-between h-[405px]">
                <div className="w-full flex items-center">
                    <div
                        className="bg-[url('https://themes.muffingroup.com/be/farm2/wp-content/uploads/2020/12/farm2-columnbg1.png')] bg-repeat bg-top p-20"
                    >
                        <h1 className="text-center font-bold text-3xl mb-4">Sow, Grow, Sell — All in One Place</h1>
                        <h3 className="text-center">
                            Explore the latest listings from farmers in your area. Whether you're looking for fresh fruits, vegetables, or grains, our marketplace offers a variety of crops straight from the farm. Each listing comes with detailed information about the produce, ensuring transparency and trust between buyers and farmers.
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content2;
