"use client";

import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/send-password-reset", {
        // Send POST request to backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Body contains the email address
      });

      const data = await response.json(); // Get response from backend
      console.log(data);
      setMessage(data.message);

      if (data.message === "success") {
        alert("Password reset email sent successfully");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setMessage("Failed");
      console.error(error);
    }
  };

  return (
    <div className="ForgotPassword">
      <h1>Forgot your password?</h1>
      <h2>Don't worry! We'll send you a link to reset it</h2>
      <form onSubmit={handleSubmit} id="form">
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" id="mySubmit">
          Send reset password link
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;