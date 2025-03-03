require("dotenv").config();
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const mongoose = require("mongoose");
//const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" })); // CORS middleware with options
app.use(express.json());
app.use("/routes", authRoutes);

// Database connection using MONGO_URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "build"))); // Connects the react frontend

// Starts the express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

// // New endpoint for generating song text
// app.post('/generateAlbumText', async (req, res) => {
//   const { prompt } = req.body;
  
//   const result = await generateSongText(prompt);
//   res.json(result); // Return JSON response
// })

// // New endpoint for generating album art
// app.post('/generateAlbumArt', async (req, res) => {
//     const { prompt } = req.body;
    
//     const result = await generateAlbumArt(prompt);
//     res.json(result); // Return JSON response
// })

// Remove email-related code for now
/*
function sendEmail(email) { 
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "zhao.annat@gmail.com",
                pass: "tqmfolrugdkwveop"
            }
        })

        const mail = {
            from:"zhao.annat@gmail.com",
            to: email,
            subject: "Reset Your LoFi Loop Password",
            text: "Click this link to reset your password! \n Happy listening!"
        }

        transporter.sendMail(mail, function(error, info){
            if (error) {
                console.log(error);
                reject({message:"error"});
            }
            resolve({message:"success"});
        });
    })
}
*/

// Remove the /send-password-reset endpoint for now
/*
app.post("/send-password-reset", async (req, res) => { 
    const {email} = req.body;
    try {
        const response = await sendEmail(email); 
        console.log(response.message);
        res.json(response); //send response to front end
    } catch (error) {
        res.status(500).json(error);
    }
})
*/