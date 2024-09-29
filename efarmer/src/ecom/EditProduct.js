import axios from 'axios';
import React, { useState } from 'react';

const EditProduct = ({ product, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, formData);
            onUpdate(response.data.product); // Assuming response.data.product contains the updated product
            onClose(); // Close the modal after update
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Crop Name</span>
                </label>
                <input
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Price Per KG</span>
                </label>
                <input
                    type="number"
                    name="pricePerKg"
                    value={formData.pricePerKg}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Quantity</span>
                </label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Farmer Name</span>
                </label>
                <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Category</span>
                </label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
    );
};

export default EditProduct;
