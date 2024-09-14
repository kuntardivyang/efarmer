import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/Router';

function App() {
  return (
    <>
    <RouterProvider router={router} />
    {/* <Navbar/> */}
    </>
  );
}

export default App;
