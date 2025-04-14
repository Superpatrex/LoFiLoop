'use client';

import React, { useState } from 'react';
import styles from './login.module.css'; // Correctly import CSS module

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
        }

        if (password.trim().length === 0) {
            validationErrors.push('Password is required.');
        }

        setErrors(validationErrors);

        if (validationErrors.length > 0) {   //if error, don't login
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/login", { //send email and password to backend
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json(); //get response from backend
            console.log(data);
            setMessage(data.message);
    
            if (data.message == "Login Successful") {
                    alert("Login Successful")
                    localStorage.setItem("token", data.token);
                    setEmail("");
                    setMessage("");
            }
            if (data.message == "Invalid credentials") {
                alert("Email or Password invalid");
            }

        } catch (error) {
            setMessage("Failed");
            console.error(error);
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