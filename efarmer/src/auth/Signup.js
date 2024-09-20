import React from 'react'

const Signup = () => {
  return (
    <div>
        <div>
<div className="py-16">
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
            }}>
        </div>
        <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">eFarmer</h2>
            {/* <p className="text-xl text-gray-600 text-center">Welcome!</p> */}
            <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
            </a>
            
            <div className='mt-4 flex'>
            <div className='flex'>
            <label className="block text-gray-700 text-sm font-bold mb-2">Farmer</label>
            <input type="radio" name="radio-1" className="radio ml-1" defaultChecked />
            </div>
            <div className='flex ml-8'>
            <label className="block text-gray-700 text-sm font-bold mb-2">Customer</label>
            <input type="radio" name="radio-1" className="radio ml-1" defaultChecked />
            </div>
            </div>
            


            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="name" />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
            </div>

            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="String" />
            </div>
            
            <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
            </div>
        </div>
    </div>
</div>
    </div>
    </div>
  )
}

export default Signup