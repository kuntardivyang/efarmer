import React from 'react';
import Footer from '../base/Footer';
import { Navbar } from '../base/Navbar';
import Hero1 from './Hero1';
import Hero2 from './Hero2';
import Content from './Content';

export const Home = () => {
    return (
        <div className="bg-slate-900">
            <Navbar />
            <Hero1 />
            <Content />
            <Hero2 />
            <Footer />
        </div>
    );
};
