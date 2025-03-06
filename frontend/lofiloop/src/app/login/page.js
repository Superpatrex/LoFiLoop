'use client';

import React, { useState } from 'react';
import styles from './login.module.css'; // Correctly import CSS module

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
        }

        if (password.trim().length === 0) {
            validationErrors.push('Password is required.');
        }

        setErrors(validationErrors);

        //connecting backend!!
        if (validationErrors.length === 0) {
            try {
                const response = await fetch('http://localhost:3001/routes/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Login successful
                    localStorage.setItem('token', data.token); // Store JWT in localStorage
                    alert('Login successful!');
                } else {
                    // Login failed
                    setErrors([data.message || 'Login failed']);
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors(['An error occurred. Please try again.']);
            }
        }
    };

    return (
        <>
            <div>
                <h1 className={styles.pagetitle}>LofiLoop</h1>
            </div>
            <div className={styles.loginContainer}>
                <h1 className={styles.title}>Login to your account</h1>
                {errors.length > 0 && (
                    <ul className={styles.errorMessages}>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;