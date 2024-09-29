import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import Create from './Create';
import EditProduct from './EditProduct'; // Import the EditProduct component

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
    const [showEditModal, setShowEditModal] = useState(false); // State for modal visibility
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/all');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        console.log("Editing product:", product); // Log the product to edit
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Filtered products based on search term and selected category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.cropName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen flex flex-col mt-16">
            <Navbar />

            <div className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>

                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        className="border rounded-lg p-2 w-1/3"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="border rounded-lg p-2 w-1/4"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Filter by Category</option>
                        <option value="seeds">Seeds</option>
                        <option value="pulses">Pulses</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="herbs_spices">Herbs & Spices</option>
                    </select>
                    <Create />
                </div>

                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Product Name</th>
                                <th className="py-2 px-4 border-b">Category</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td className="py-2 px-4 border-b">{product.cropName}</td>
                                        <td className="py-2 px-4 border-b">{product.category}</td>
                                        <td className="py-2 px-4 border-b">₹{product.pricePerKg}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() => handleEditClick(product)}
                                            >
                                                Edit
                                            </button> |
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => handleDeleteClick(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <Footer />

            {showEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Edit Product</h2>
                        <EditProduct
                            product={selectedProduct}
                            onClose={() => setShowEditModal(false)}
                            onUpdate={handleUpdateProduct}
                        />
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowEditModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
