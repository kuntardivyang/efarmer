import React from 'react'
import Footer from '../base/Footer'
import { Navbar } from '../base/Navbar'
import Hero_section from './Hero_section'
import Carousel from './Carousel'
import Hero2 from './Hero2'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <Carousel/>
        <Hero_section/>
        <Hero2/>
        <Footer />

    </div>
  )
}
