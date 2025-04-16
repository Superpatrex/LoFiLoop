"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors]     = useState([]);
    const [message, setMessage]   = useState("");

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // individual tests
    const tests = [
      { label: 'At least 8 characters long',       test: pw => pw.length >= 8 },
      { label: 'Includes an uppercase letter',     test: pw => /[A-Z]/.test(pw) },
      { label: 'Includes a lowercase letter',     test: pw => /[a-z]/.test(pw) },
      { label: 'Includes a number',               test: pw => /\d/.test(pw) },
      { label: 'Includes a special character',    test: pw => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw) },
    ];

    const handleSubmit = async(e) => {
        e.preventDefault();
        let validationErrors = [];

        if (!validateEmail(email)) {
            validationErrors.push('Invalid email format.');
        }
        if (tests.some(t => !t.test(password))) {
            validationErrors.push('Password does not meet all requirements.');
        }
        if (password !== confirmPassword) {
            validationErrors.push('Passwords do not match.');
        }
        setErrors(validationErrors);
        if (validationErrors.length) return;

        try {
            const response = await fetch("http://localhost:3001/send-confirmation", { //send post request to backend
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ email }), //body contains the email address                
            });
                    
            const data = await response.json(); //get response from backend
            console.log(data);
            setMessage(data.message);
    
            if (data.message == "success") {
                    alert("Sign up successful, confirmation email sent")
                    setEmail("");
                    setMessage("");
            }
        } catch (error) {
            setMessage("Failed");
            console.error(error);
        }
    };

    return (
        <div className="SignUp">
            <h1>Sign up for an account with us here!</h1>
            {errors.length > 0 && (
                <ul className="error-messages">
                    {errors.map((e,i) => <li key={i}>{e}</li>)}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <label>Create Username</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    <label>Set Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <label>Type Password Again</label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="password-requirements">
                    <h3>Password Requirements:</h3>
                    <ul>
                        {tests.map((t, i) => (
                          <li
                            key={i}
                            className={t.test(password) ? 'valid' : 'invalid'}
                          >
                            {t.label}
                          </li>
                        ))}
                    </ul>
                </div>

                <button type="submit">Sign Up!</button>
            </form>
        </div>
    );
};

export default SignUp;