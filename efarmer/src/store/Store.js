import React, { useState } from 'react'
import StoreNav from './Store_Nav'
import Items from './Items'
import Footer from '../base/Footer'

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div>
        <StoreNav setSelectedCategory={setSelectedCategory} />
        <Items selectedCategory={selectedCategory} />
        <Footer/>
    </div>
  )
}

export default Store