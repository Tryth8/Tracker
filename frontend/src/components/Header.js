import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from "../context/AuthContext";

function Header() {
    const {user, logoutUser} = useContext(AuthContext);

    const authLinks = (
        <>
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/todolist">ToDo List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/skills">Skills</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/challenges">Challenges</Link>
                </li>
                <li className="nav-item d-block d-md-none">
                    <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>
                <li className="nav-item d-block d-md-none">
                    <Link className="nav-link text-white" to="/settings">Settings</Link>
                </li>
            </ul>
            <ul className="navbar-nav ms-4 d-none d-md-block">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown"
                       aria-expanded="false">
                        <div className="nav-dropdown bi bi-person-circle text-white" id="basic-nav-dropdown"
                             style={{marginRight: 0}}></div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={logoutUser}>Logout</button>
                        </li>
                    </ul>
                </li>
            </ul>

        </>
    );

    const guestLinks = (
        <>
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/register">Register</Link>
                </li>
            </ul>
        </>
    );

    return (
        <nav className="header navbar navbar-expand-lg shadow-lg mb-5">
            <div className="container">
                {user ? <Link className="navbar-brand text-white" to="/">MyTracker</Link> :
                    <Link className="navbar-brand text-white" to="/todolist">MyTracker</Link>}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon burger"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {user ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
}

export default Header;
