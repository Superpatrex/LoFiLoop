'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import NavBar from '@/components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    if (errors.length > 0)
    {
        if (errors[0] === 'Invalid email format.') {
            setMessage('Invalid email format.');
        }
        else if (errors[0] === 'Password is required.') {
            setMessage('Password is required.');
        }
        setTimeout(() => setMessage(''), 3000);
        setErrors([]);
        return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();
      
      if (data.message === "Login Successful") {
        localStorage.setItem("token", data.token);
        router.push('/chat');
      } else if (data.message === "Invalid credentials") {
        // show text instead of alert
        setMessage("Invalid email or password.");
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Try again.");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Login to your account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.button} onClick={handleSubmit}>
            Login
          </button>
          {message && <p className={styles.loginError}>{message}</p>}
        </form>
      </div>
    </>
  );
}