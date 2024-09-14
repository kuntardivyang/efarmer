import React from 'react'
import Footer from '../base/Footer'
import { Navbar } from '../base/Navbar'
import Hero_section from './Hero_section'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero_section />
        {/* login and signup done forgot pass baki h */}
        <Footer />

    </div>
  )
}
