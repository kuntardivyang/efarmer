import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import Login from "../auth/Login";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove user from localStorage and set logged out state
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ecommerce">E-commerce</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl text-green-600">eFarmer</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="text-gray-200 hover:text-green-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/yield" className="text-gray-200 hover:text-green-500 transition">Yield Pred.</Link>
            </li>
            <li>
              <Link to="/predictDisease" className="text-gray-200 hover:text-green-500 transition">Disease Pred.</Link>
            </li>
            <li>
              <Link to="/ecommerce" className="text-gray-200 hover:text-green-500 transition">E-commerce</Link>
            </li>
          </ul>
        </div>

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
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-52">
                  <li>
                    <Link to="/profile" className="text-gray-600 hover:text-green-500 transition">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button style={{ backgroundColor: '#274135' }} className="btn bg-green-500 hover:bg-green-600 text-white transition" onClick={() => document.getElementById('my_modal_2').showModal()}>Login</button>
              <Login />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
