"use client"; 

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import './SignUp.css';
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

        try 
        {
            const response = await axios.post("http://localhost:3001/auth/register", {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
                    
            const data = response.data;

            setMessage(data.message);
    
            if (data.message === "success") {
                alert("Sign up successful, confirmation email sent");
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setMessage("");
            }
        } 
        catch (error) 
        {
            if (error.response)
            {
                const { status, data } = error.response;

                if (status === 400 && data.message === "Email already exists") 
                {
                    setErrors(["Email already exists"]);
                    setTimeout(() => setErrors([]), 3000);
                    return
                }
            }
            else 
            {
                setErrors(["An error occurred during signup"]);
                setTimeout(() => setErrors([]), 3000);
                console.error(error);
            }
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

        if (validationLoginErrors.length > 0)
        {
            setTimeout(() => setLoginErrors([]), 3000);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                email: loginEmail,
                password: loginPassword
            });
            const data = response.data;
            
            if (data.message === "Login Successful") 
            {
                localStorage.setItem("token", data.token);
                router.push('/chat');
            } 
        } 
        catch (error) 
        {
            if (error.response)
            {
                const { status, data } = error.response;

                if (status === 400 && data.message === "Invalid credentials") 
                {
                    setLoginErrors(["Invalid email or password"]);
                    setTimeout(() => setLoginErrors([]), 3000);
                    return;
                }
                if (status === 500 && data.message === "Internal Server Error") 
                {
                    setLoginErrors(["Server error, please try again later"]);
                    setTimeout(() => setLoginErrors([]), 3000);
                    return;
                }
            }
            else
            {
                console.error("Login failed:", error);
                setLoginErrors(["An error occurred during login"]);
                setTimeout(() => setLoginErrors([]), 3000);
            }
        }
    };

    return (
        <div className="LogAndSign">
            <div className="SignUp">
                <h1>Sign Up Here!</h1>
                <div className="flex flex-col items-center">
                    {errors.length > 0 && (
                        <ul className="text-red-500 text-lg font-bold">
                            {errors.map((e,i) => <li key={i}>{e}</li>)}
                        </ul>
                    )}
                </div>
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
                    <button type="submit" onClick={handleSubmit}>Sign Up!</button>
                </form>
            </div>
            <div className="Login">
                <div>
                    <h1>Welcome Back!</h1>
                </div>
                <div>
                    <h2 className="font-bold">Please login to start listening</h2>
                    {message && <p>{message}</p>}
                    <div className="flex flex-col items-center">
                        {loginErrors.length > 0 && (
                            <ul className="text-red-500 text-lg font-bold">
                                {loginErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
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
                        <p style={{textAlign: 'right', marginRight: '5%'}} className="hover:scale-105"><Link href="/forgot-password">Forgot password?</Link></p>
                        <button type="submit" onClick={handleLoginSubmit}>Login</button>
                    </form>
                </div>
            </div>
            <div className="slider" id="slider">
                <div className="logo">
                    <img src="/lofi_loop_logo.png" alt="LoFi Loop Logo"/>
                </div>
                <div id="slideHeader">Don't have an account yet?</div> 
                <p id="slideClick" className="font-bold hover:scale-105" onClick={handleSlide}>Create one now!</p>
            </div>
        </div>
    );
};

export default SignUp;