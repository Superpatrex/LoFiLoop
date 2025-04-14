const express = require('express');
const nodemailer = require("nodemailer");
//const sendSignUpEmail = require('./sendEmail')
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const openaiRoutes = require("./routes/openaiRoutes");
const listenersRoutes = require("./routes/listenersRoutes");
const { connectDB } = require("./db");
const setupWebSocket = require("./websocket");
const http = require("http");
const cors = require("cors");
const { generateSongText } = require('./models/openai');
const messageRoutes = require("./routes/messageRoute");
const songRequestRoutes = require('./utils/songRequests');
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Routes--------------------------------------------------------------

app.use("/listeners", listenersRoutes);
app.use("/openai", openaiRoutes);
app.use("/api/message", messageRoutes);
app.use("/auth", authRoutes);
// new endpoint for ChatGPT
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  
  const result = await generateSongText(prompt);
  res.json(result); // return JSON response
})

// Websocket ------------------------------------------------------

const server = http.createServer(app);
setupWebSocket(server);

// set up the HTTP server and integrate Socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000", // allows frontend to connect
        methods: ["GET", "POST"],
    },
});

// ---------------------------------------------------------------

//reset password email

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
            html: `
            <html>
              <body>
                <p>Click this link to reset your password:</p>
                <a href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiR2IHs67WMAxU1QjABHSrnCjoQPAgI" target="_blank">Reset Password</a>
                <p>Happy listening!</p>
              </body>
            </html>`
        };

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


app.use(express.static(path.join(__dirname, "build"))); //connects the react frontend



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    });
   
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
