import React, { useEffect, useState } from 'react';

const Items = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to manage cart items

  useEffect(() => {
    // Fetch the products from the backend
    fetch('http://localhost:5000/api/products/all')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // Load existing cart from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to add an item to the cart
  const addToCart = (product) => {
    const newCart = [...cart, product]; // Create new cart array
    setCart(newCart); // Update state
    localStorage.setItem('cart', JSON.stringify(newCart)); // Store in local storage
    alert(`${product.cropName} has been added to your cart!`); // Optional: show an alert
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className='mt-16'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt={product.cropName}
                      className="object-cover object-center w-full h-full block"
                      src={`http://localhost:5000/${product.image}`} // Assuming the image path is relative to the server's base URL
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.cropName}</h2>
                    <p className="mt-1">₹{product.pricePerKg.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)} // Add onClick handler
                      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Items;
