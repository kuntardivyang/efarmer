import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log(response.data);
            alert('Login successful!');
            // You can redirect the user or perform additional actions here
        } catch (error) {
            console.error(error);
            alert('Error logging in');
        }
    };

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form className="card-body modal-backdrop" onSubmit={handleSubmit}>
                        <div className="text-gray-900 font-bold text-4xl text-center">
                            <h1>Login</h1>
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;