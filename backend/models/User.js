const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { getDatabase } = require("../db");


const userDB = getDatabase("test");


const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpire: Date,
});

UserSchema.pre("save", async function (next) { //hash password before saving
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = userDB.model("User", UserSchema);
