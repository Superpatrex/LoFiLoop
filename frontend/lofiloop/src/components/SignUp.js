"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import './SignUp.css';
import { Delay } from 'p5';
import { useRouter } from 'next/navigation';

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

    const [slide, setSlide] = useState(false);

    const handleSlide = () => {
        const slideElement = document.getElementById("slider");
        const slideHeader = document.getElementById("slideHeader");
        const slideClick = document.getElementById("slideClick");
        if (!slide)
        {
            slideElement.classList.add("slideRight");
            slideElement.classList.remove("slideLeft");
            slideHeader.innerHTML = "Already have an account?";
            slideClick.innerHTML = "Login here!";
        }
        else
        {
            slideElement.classList.add("slideLeft");
            slideElement.classList.remove("slideRight");
            slideHeader.innerHTML = "Don't have an account yet?";
            slideClick.innerHTML = "Create one here!";
        }
        setSlide(!slide);
    }

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState([]);
    const [loginMessage, setLoginMessage] = useState('');
    const router = useRouter();

    const validateLoginEmail = (loginEmail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        let validationLoginErrors = [];

        if (!validateLoginEmail(loginEmail)) {
            validationLoginErrors.push('Invalid email format.');
        }
        if (loginPassword.trim().length === 0) {
            validationLoginErrors.push('Password is required.');
        }

        setLoginErrors(validationLoginErrors);
        if (loginErrors.length > 0)
        {
            if (loginErrors[0] === 'Invalid email format.') {
                setLoginMessage('Invalid email format.');
            }
            else if (loginErrors[0] === 'Password is required.') {
                setLoginMessage('Password is required.');
            }
            setTimeout(() => setLoginMessage(''), 3000);
            setErrors([]);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({loginEmail, loginPassword}),
            });
            const data = await response.json();
            
            if (data.loginMessage === "Login Successful") {
                localStorage.setItem("token", data.token);
                router.push('/chat');
            } else if (data.loginMessage === "Invalid credentials") {
                setLoginMessage("Invalid email or password.");
                setTimeout(() => setLoginMessage(''), 3000);
            }
        } catch (error) {
            console.error(error);
            setLoginMessage("Login failed. Try again.");
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="LogAndSign">
            <div className="SignUp">
                <h1>Sign Up Here!</h1>
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
            <div className="Login">
                <div>
                    <h1>Welcome Back!</h1>
                </div>
                <div>
                    <h2>Please login to start listening</h2>
                    {message && <p>{message}</p>}
                    {loginErrors.length > 0 && (
                        <ul>
                            {loginErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <form onSubmit={handleLoginSubmit} >
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
              
                        />
                        
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                       
                        />

                        <p style={{textAlign: 'right', marginRight: '5%'}}><Link href="/forgot-password">Forgot password?</Link></p>
                        
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className="slider" id="slider">
                <div className="logo">
                    <img src="/lofi_loop_logo.png" alt="LoFi Loop Logo"/>
                </div>
                <div id="slideHeader">Don't have an account yet?</div> 
                <p id="slideClick" onClick={handleSlide}>Create one now!</p>
            </div>
        </div>
    );
};

export default SignUp;