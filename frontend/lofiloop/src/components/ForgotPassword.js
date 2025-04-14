"use client";

import React, {useState} from 'react';
import './ForgotPasswordCSS.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(password);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
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

        if (validationErrors.length > 0) {   //if error, don't send email
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/forgot-password", { //send post request to backend
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ email, password }), //body contains the email address
            });
            
            const data = await response.json(); //get response from backend
            console.log(data);
            setMessage(data.message);

            if (data.message == "Password reset") {
                alert("Password reset successfully")
                setEmail("");
                setMessage("");
            }

            if (data.message == "User not found") {
                alert(data.message);
            }

        } catch (error) {
            setMessage("Failed");
            console.error(error);
        }

    }

    return (
        <div className="ForgotPassword">
            <h1>Forgot your password?</h1>
            <h2>Don't worry! Reset it here!</h2>

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
                
                <label>Set New Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Type New Password Again</label>
                <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button type="submit">Login!</button>
            </form>
            
        </div>

    );
};

export default ForgotPassword;