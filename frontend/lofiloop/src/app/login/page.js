'use client';

import React, { useState } from 'react';
import styles from './login.module.css'; // Correctly import CSS module

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
        }

        if (password.trim().length === 0) {
            validationErrors.push('Password is required.');
        }

        setErrors(validationErrors);

        if (validationErrors.length === 0) {
            alert('Login successful!');
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