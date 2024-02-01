import React from 'react';
import '../assets/static/Register.css';
import {Link} from "react-router-dom";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";

function Register() {

    let api = useAxios()
    let registerUser = async (e) =>{
        e.preventDefault()
        const response = await api.post(`/create_user/`, {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        });
    }

    return (
        <Layout title="Todo | Register" content="Register Page">
            <div className="d-flex justify-content-center align-items-center mt-5 vh-100 text-white">
                <div className="col-6 p-5 shadow-lg">
                    <h3>Sign Up</h3>
                    <form onSubmit={registerUser}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                Username
                            </label>
                            <input name="username" type="text" className="form-control" id="inputEmail" placeholder="Enter username"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                Email address
                            </label>
                            <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mt-3">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="container">
                        <hr/>
                        <div className="row">
                            <div className="col-md-8 offset-md-2 text-center">
                                <div className="mb-3 d-flex gap-5 justify-content-center">
                                    <i className="bi bi-instagram"></i>
                                    <i className="bi bi-facebook"></i>
                                    <i className="bi bi-linkedin"></i>
                                    <i className="bi bi-youtube"></i>
                                </div>
                                <div className="mb-3">
                                    <p>
                                        Already registered? <Link className="link" to="/register">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Register;