import React from 'react';
import image1 from './farm2-slider-bg.jpg';

const Hero1 = () => {
    return (
        <div className='mt-16'>
            <section
                className="bg-cover bg-center"
                style={{ backgroundImage: `url(${image1})` }}
            >
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center -mt-32">
                        <h1 className="text-3xl font-extrabold sm:text-5xl color-emerald-300">
                            Empowering Farmers, Connecting Markets
                            {/* <strong className="font-extrabold text-red-700 sm:block"> Increase Conversion. </strong> */}
                        </h1>

                        <p style={{ color: 'white' }} className=" mt-4 sm:text-xl/relaxed">
                            Welcome to the future of Agriculture, where Farmers gain control and buyer access the best product directly from the farmers.
                        </p>

                        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                                href="#"
                            >
                                Get Started
                            </a>

                            <a
                                className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                                href="#"
                            >
                                Learn More
                            </a>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero1;
