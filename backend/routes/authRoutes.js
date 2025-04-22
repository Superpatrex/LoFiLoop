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

        if (user) return res.status(400).json({ message: "Email already exists" });
        user = new User({ username, email, password }); //create new user
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const response = await sendSignUpEmail(email);
    } catch (error) {
        res.status(500).json({ message: "Server error " + error });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); //token contains info about user
        res.json({ token, message: "Login Successful", user: {username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Password Reset Request
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 900000;
        await user.save();

        await sendEmail(email, "Password Reset", `Click here to reset: http://localhost:3001/auth/reset/${resetToken}`);
        res.json({ message: "Password reset email sent." });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Password Reset
router.post("/reset-password/:token", async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.resetTokenExpire < Date.now())
            return res.status(400).json({ message: "Invalid or expired token" });

        user.password = req.body.password;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();

        res.json({ message: "Password reset successful!" });
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
});

module.exports = router;