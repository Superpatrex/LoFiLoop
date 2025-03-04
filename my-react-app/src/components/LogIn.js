import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateIdentifier = (identifier) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const isUsername = /^[a-zA-Z0-9_]+$/.test(identifier);
        return isEmail || isUsername;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateIdentifier(identifier)) {
            validationErrors.push('Invalid username or email format.');
        }

        if (password.length === 0) {
            validationErrors.push('Password is required.');
        }

        setErrors(validationErrors);

        if (validationErrors.length === 0) {
            alert('Login successful!');
        }
    };

    return (
        <div className="Login">
            <h1>Login to your account</h1>
            {errors.length > 0 && (
                <ul className="error-messages">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <label>Username or Email</label>
                <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">Login</button>
            </form>
            <p>
                Haven't signed up yet? <Link to="/signup">Click here</Link>
            </p>
        </div>
    );
};

export default LogIn;