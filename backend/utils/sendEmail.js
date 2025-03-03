const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(email, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");
        return { message: "success" };
    } catch (error) {
        console.error("Email sending error:", error);
        return { message: "error" };
    }
}
module.exports = sendEmail;