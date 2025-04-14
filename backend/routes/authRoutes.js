const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendSignUpEmail = require("../utils/sendEmail");
require("dotenv").config();

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => { //recieve the post request
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email }); //check if user exists
        console.log("Log 1");

        if (user) return res.status(400).json({ message: "Email already exists" });

        console.log("Log 2");

        user = new User({ username, email, password }); //create new user
        await user.save();

        console.log("Log 3");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Log 4");
        const response = await sendSignUpEmail(email);
        console.log(response);
        console.log("Log 5");
    } catch (error) {
        res.status(500).json({ message: "Server error " + error });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) //compares hashed pw with user.pw
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); //token contains info about user
        res.json({ token, message: "Login Successful", user: {username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Password Reset Request
router.post("/forgot-password", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.password = password;
        await user.save(); //the pre in User will hash it, dont need to manually

        res.json({ message: "Password reset" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;