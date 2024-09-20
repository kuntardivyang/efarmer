import React from 'react'

const Login = () => {

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div>
                        <form className="card-body modal-backdrop">
                            <div className="text-gray-900 font-bold text-4xl text-center">
                                <h1>Login</h1>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered text-gray-900" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered text-gray-900" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>

            </dialog>
        </div>
    )
}

export default Login
