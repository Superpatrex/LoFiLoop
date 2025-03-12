"use client";

import React, {useState} from 'react';
import './ForgotPasswordCSS.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/send-password-reset", { //send post request to backend
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ email }), //body contains the email address
            });
            
            const data = await response.json(); //get response from backend
            console.log(data);
            setMessage(data.message);

            if (data.message == "success") {
                alert("Password reset email sent successfully")
                setEmail("");
                setMessage("");
            }
        } catch (error) {
            setMessage("Failed");
            console.error(error);
        }

    }

    return (
        <div className="container">
            <h1>Forgot your password?</h1>
            <h2>Don't worry! We'll send you a link to reset it</h2>
            <form onSubmit={handleSubmit} id="form">
                <input type="email" id="email" placeholder=" Enter email address" value={email} onChange={(e) => setEmail(e.target.value)}></input> <br></br>
                <button type="submit" id="mySubmit"> Send reset password link</button>
            </form>
            
        </div>

    );
};

export default ForgotPassword;