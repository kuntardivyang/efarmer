import React from 'react'

const Hero_section = () => {
  return (
    <div>
      <div
        className="hero h-[50vh] bg-opacity-50"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/heroImage.jpg)`,
        }}>

        {/* inside content */}

        <section class="text-gray-600 body-font -mt-6">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -mx-4 -my-8 opacity-70 ml-2">
              <div class="py-8 px-4 lg:w-[30%] bg-white ml-4">
                <div class="h-full flex items-start">
                  
                  <div class="flex-grow pl-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">CATEGORY</h2>
                    <h1 class="title-font text-xl font-medium text-gray-900 mb-3">The 400 Blows</h1>
                    <p class="leading-relaxed mb-5">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <a class="inline-flex items-center">
                      <img alt="blog" src="https://dummyimage.com/103x103" class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                      <span class="flex-grow flex flex-col pl-3">
                        <span class="title-font font-medium text-gray-900">Alper Kamu</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="py-8 px-4 lg:w-[30%] bg-white ml-4">
                <div class="h-full flex items-start">
                  
                  <div class="flex-grow pl-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">CATEGORY</h2>
                    <h1 class="title-font text-xl font-medium text-gray-900 mb-3">Shooting Stars</h1>
                    <p class="leading-relaxed mb-5">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <a class="inline-flex items-center">
                      <img alt="blog" src="https://dummyimage.com/102x102" class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                      <span class="flex-grow flex flex-col pl-3">
                        <span class="title-font font-medium text-gray-900">Holden Caulfield</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="py-8 px-4 lg:w-[30%] bg-white ml-4">
                <div class="h-full flex items-start">

                  <div class="flex-grow pl-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">CATEGORY</h2>
                    <h1 class="title-font text-xl font-medium text-gray-900 mb-3">Neptune</h1>
                    <p class="leading-relaxed mb-5">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <a class="inline-flex items-center">
                      <img alt="blog" src="https://dummyimage.com/101x101" class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                      <span class="flex-grow flex flex-col pl-3">
                        <span class="title-font font-medium text-gray-900">Henry Letham</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  )
}

export default Hero_section
