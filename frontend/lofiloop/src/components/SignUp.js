"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
        }

        if (!validatePassword(password)) {
            validationErrors.push('Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.');
        }

        if (password !== confirmPassword) {
            validationErrors.push('Passwords do not match.');
        }

        setErrors(validationErrors);

        if (validationErrors.length === 0) {
            alert('Sign-up successful!');
        }
    };

    return (
        <div className="SignUp">
            <h1>Sign up for an account with us here!</h1>
            {errors.length > 0 && (
                <ul className="error-messages">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-inputs">
                        <label>Create Username</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <label>Set Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label>Type Password Again</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="password-requirements">
                        <h3>Password Requirements:</h3>
                        <ul>
                            <li>At least 8 characters long</li>
                            <li>Includes an uppercase letter</li>
                            <li>Includes a lowercase letter</li>
                            <li>Includes a number</li>
                            <li>Includes a special character</li>
                        </ul>
                    </div>
                </div>
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    );
};

export default SignUp;