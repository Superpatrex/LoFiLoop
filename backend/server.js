const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const openaiRoutes = require("./routes/openaiRoutes");
const listenersRoutes = require("./routes/listenersRoutes");
const { connectDB } = require("./db");
const setupWebSocket = require("./websocket");
const http = require("http");

const cors = require("cors");

connectDB();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Routes--------------------------------------------------------------

app.use("/listeners", listenersRoutes);
app.use("/openai", openaiRoutes);

// Websocket ------------------------------------------------------

const server = http.createServer(app);
setupWebSocket(server);

// ---------------------------------------------------------------



function sendEmail(email) { //use nodemailer to send email
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

app.post("/send-password-reset", async (req, res) => { //recieves react post request
    const {email} = req.body;
    try {
        const response = await sendEmail(email); //send email, response is retunred by the promise
        console.log(response.message);
        res.json(response); //send response to front end
    } catch (error) {
        res.status(500).json(error);
    }
})


//////// sign up email


function sendSignUpEmail(email) { //use nodemailer to send email
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
            subject: "LoFi Loop Sign Up Confirmation",
            text: "Thank you for signing up for LoFi Loop! Your account has been successfully created. \n Happy listening!"
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

app.post("/send-confirmation", async (req, res) => { //recieves react post request
    const {email} = req.body;
    try {
        const response = await sendSignUpEmail(email); //send email, response is returned by the promise
        console.log(response.message);
        res.json(response); //send response to front end
    } catch (error) {
        res.status(500).json(error);
    }
})

app.use(express.static(path.join(__dirname, "build"))); //connects the react frontend


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    });
   
server.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    });