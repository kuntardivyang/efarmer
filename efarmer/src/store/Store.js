import React, { useState } from 'react'
import Store_Nav from './Store_Nav'
import Items from './Items'
import Footer from '../base/Footer'

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div>
        <Store_Nav setSelectedCategory={setSelectedCategory} />
        <Items selectedCategory={selectedCategory} />
        <Footer/>
    </div>
  )
}

export default Store