import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/static/Login.css';
import Layout from '../components/Layout';
import AuthContext from '../context/AuthContext';

function Login() {
  let { loginUser } = useContext(AuthContext);

  return (
    <Layout title="Todo | Login" content="Login Page">
      <div className="d-flex justify-content-center align-items-center mt-5 vh-100 text-white">
        <div className="col-lg-6 shadow-lg rounded p-5">
          <h3>Login</h3>
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Enter email" />
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
            <div className="form-check">
              <label>Remember me?</label>
              <input className="form-check-input" type="checkbox" id="entity1" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </div>
          </form>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-end">
                <div>
                  <Link className="link" to="/reset-password">Forgot your password?</Link>
                </div>
              </div>
            </div>
            <hr />
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
                    Haven't signed up yet? <Link className="link" to="/register">Sign Up</Link>
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

export default Login;
