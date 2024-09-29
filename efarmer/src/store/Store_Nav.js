import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Login from '../auth/Login';

const Store_Nav = ({ setSelectedCategory }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  // Check if the user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigation = (category) => {
    // Call the function to set the selected category in parent component
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    // Remove user from localStorage and set logged out state
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar shadow-md" style={{ backgroundColor: '#274135' }}>
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <button onClick={() => handleNavigation('all')}>All</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('Seeds')}>Seeds</button>
              </li>
            </ul>
          </div>
          <button onClick={() => handleNavigation('all')} className="btn btn-ghost text-xl text-green-600">
            eFarmer
          </button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={() => handleNavigation('all')} className="text-gray-200 hover:text-green-500 transition">
                All
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('Seeds')} className="text-gray-200 hover:text-green-500 transition">
                Seeds
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('Pulses')} className="text-gray-200 hover:text-green-500 transition">
                Pulses
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('Fruits')} className="text-gray-200 hover:text-green-500 transition">
                Fruits
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('Vegetables')} className="text-gray-200 hover:text-green-500 transition">
                Vegetables
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('Herbs & Spices')} className="text-gray-200 hover:text-green-500 transition">
                Herbs & Spices
              </button>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <button className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l1 9h11l1-9h2"
              />
              <circle cx="10" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
          </button>
        </div> */}

        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {/* Replace with user profile image */}
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="text-gray-600 hover:text-green-500 transition">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="hover:text-red-600 transition">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                style={{ backgroundColor: '#274135' }}
                className="btn bg-green-500 hover:bg-green-600 text-white transition"
                onClick={() => document.getElementById('my_modal_2').showModal()}
              >
                Login
              </button>
              <Login />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store_Nav;
