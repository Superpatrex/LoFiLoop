import React, { useState } from 'react';
import './LogIn.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
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
                <label>Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
        </div>
    );
};

export default Login;