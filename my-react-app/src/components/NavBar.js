import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/auth">LogIn/SignUp</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;