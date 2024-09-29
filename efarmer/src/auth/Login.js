import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log(response.data);
            
            // Save the user information to localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Check user role and redirect accordingly
            if (response.data.user.isFarmer) {
                window.location.href = '/'; // Redirect to farmer page
            } else {
                window.location.href = '/consumer'; // Redirect to consumer page
            }
        } catch (error) {
            console.error(error);
            alert('Error logging in');
        }
    };

    const handleClose = () => {
        const modal = document.getElementById('my_modal_2');
        modal.close();  // This will close the modal
    };

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    {/* Close button */}
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleClose}>
                        ✕
                    </button>

                    <form className="card-body modal-backdrop" onSubmit={handleSubmit}>
                        <div className="text-gray-900 font-bold text-4xl text-center">
                            <h1 className="text-4xl font-bold" style={{ color: '#274135' }}>Login</h1>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="email" 
                                className="input input-bordered text-gray-900" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="password" 
                                className="input input-bordered text-gray-900" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* Apply inline style for background color */}
                        <div className="form-control mt-6">
                            <button className="btn text-white" style={{ backgroundColor: '#274135' }}>
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Link to register */}
                    <div className="text-center mt-4">
                        <p>Not a user? <Link to="/signup" className="link link-hover text-[#6FAFAD]">Register here</Link></p>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Login;
