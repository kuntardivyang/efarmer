import React, { useEffect, useState } from 'react';
import Footer from '../base/Footer';
import { Navbar } from '../base/Navbar';
import Hero_section from './Hero_section';
// import Carousel from './Carousel';
import Hero2 from './Hero2';
import Hero1 from './Hero1';
import Content from './Content';
import Gallery from './Gallery';
import Content2 from './Content2';


export const Home = () => {
  const [user, setUser] = useState(null);

  // Retrieve user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Hero1/>
      {/* <Carousel /> */}
      <Content/>
      <Gallery/>
      <Content2/>

      {user && (
        <div className="text-center my-4">
          <h1 className="text-4xl font-bold">Welcome, {user.username}!</h1>
        </div>
      )}
      <Hero_section />

      <Hero2 />
      <Footer />
    </div>
  );
};
