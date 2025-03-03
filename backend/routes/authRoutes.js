const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
//const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        user = new User({ username, email, password });
        await user.save();

        //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        //await sendEmail(email, "Verify Your Email", `Click here to verify: http://localhost:3001/routes/verify/${token}`);

        res.status(201).json({ message: "User registered. Verify your email." });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email or username already exists." });
        }
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Email Verification
// router.get("/verify/:token", async (req, res) => {
//     try {
//         const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(400).json({ message: "Invalid token" });

//         user.isVerified = true;
//         await user.save();
//         res.json({ message: "Email verified successfully!" });
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// });

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            return res.status(400).json({ message: "Invalid credentials" });

        //if (!user.isVerified) return res.status(400).json({ message: "Verify your email first" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

// Password Reset Request
// router.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User not found" });

//         const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
//         user.resetToken = resetToken;
//         user.resetTokenExpire = Date.now() + 900000;
//         await user.save();

//         await sendEmail(email, "Password Reset", `Click here to reset: http://localhost:3001/routes/reset-password/${resetToken}`);
//         res.json({ message: "Password reset email sent." });
//     } catch (error) {
//         console.error("Forgot password error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// Password Reset
// router.post("/reset-password/:token", async (req, res) => {
//     try {
//         const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user || user.resetTokenExpire < Date.now())
//             return res.status(400).json({ message: "Invalid or expired token" });

//         user.password = req.body.password;
//         user.resetToken = undefined;
//         user.resetTokenExpire = undefined;
//         await user.save();

//         res.json({ message: "Password reset successful!" });
//     } catch (error) {
//         console.error("Reset password error:", error);
//         res.status(400).json({ message: "Invalid token" });
//     }
// });


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const sendEmail = require("../utils/sendEmail");
// require("dotenv").config();

// const router = express.Router();

// // User Registration
// router.post("/register", async (req, res) => {
//     const { username, email, password } = req.body;
//     console.log()
//     try {
//         let user = await User.findOne({ email });
//         console.log("Log 1");

//         if (user) return res.status(400).json({ message: "Email already exists" });

//         console.log("Log 2");

//         user = new User({ username, email, password });
//         await user.save();

//         console.log("Log 3");
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         console.log("Log 4");
//         console.log(token); 
//         const response = await sendEmail(email, "Verify Your Email", `Click here to verify: http://localhost:3001/auth/verify/${token}`);
//         console.log(response);
//         console.log("Log 5");
//         res.status(201).json({ message: "User registered. Verify your email." });
//     } catch (error) {
//         res.status(500).json({ message: "Server error " + error });
//     }
// });
// // Email Verification
// router.get("/verify/:token", async (req, res) => {
//     try {
//         const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(400).json({ message: "Invalid token" });

//         user.isVerified = true;
//         await user.save();
//         res.json({ message: "Email verified successfully!" });
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// });

// // User Login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password)))
//             return res.status(400).json({ message: "Invalid credentials" });

//         if (!user.isVerified) return res.status(400).json({ message: "Verify your email first" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Password Reset Request
// router.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User not found" });

//         const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
//         user.resetToken = resetToken;
//         user.resetTokenExpire = Date.now() + 900000;
//         await user.save();

//         await sendEmail(email, "Password Reset", `Click here to reset: http://localhost:3001/auth/reset/${resetToken}`);
//         res.json({ message: "Password reset email sent." });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Password Reset
// router.post("/reset-password/:token", async (req, res) => {
//     try {
//         const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user || user.resetTokenExpire < Date.now())
//             return res.status(400).json({ message: "Invalid or expired token" });

//         user.password = req.body.password;
//         user.resetToken = undefined;
//         user.resetTokenExpire = undefined;
//         await user.save();

//         res.json({ message: "Password reset successful!" });
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// });

// module.exports = router;