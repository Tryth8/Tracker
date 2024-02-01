import React from 'react';
import '../assets/static/components.css';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="footer shadow-lg pt-5">
            <div className="container-md">
                <div className="row">
                    <div className="col-3">
                        <h3>MyTracker</h3>
                        <img src="#" alt="cool logo"/>
                    </div>
                    <div className="col-3">
                        <h4>Download app</h4>
                        <div className='navigationList'>
                            <Link className="h6" to="#">For Android</Link>
                            <Link className="h6" to="#">For IOS</Link>
                            <Link className="h6" to="#">For PC</Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className='navigationList'>
                            <h4>Pages</h4>
                            <Link className="h6" to="/">Home</Link>
                            <Link className="h6" to="/dashboard">Dashboard</Link>
                            <Link className="h6" to="/skills">Skills</Link>
                            <Link className="h6" to="/challenges">Challenges</Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="socialMedia">
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-linkedin"></i>
                            <i className="bi bi-youtube"></i>
                        </div>
                        <h4 className="mt-2">Subscribe for news</h4>
                        <div className="d-flex">
                            <input type="email"/>
                            <input className="btn ms-2" type="submit"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column text-center">
                        <div className="mt-5 mb-3">MyTracker 2024. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;