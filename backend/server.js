const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const openaiRoutes = require("./routes/openaiRoutes");
const listenersRoutes = require("./routes/listenersRoutes");
const { connectDB } = require("./db");
const cors = require("cors");

app.use(express.json());

connectDB();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Routes
app.use("/listeners", listenersRoutes);
app.use("/openai", openaiRoutes);








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

app.use(express.static(path.join(__dirname, "build"))); //connects the react frontend


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    });
   
//starts the express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});



/*
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

function sendEmail(email) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "zhao.annat@gmail.com",
                pass: "tqmf olru gdkw veop"
            }
        })

        const mail = {
            from:"zhao.annat@gmail.com",
            to: email,
            subject: "Reset Your LoFi Loop Password",
            text: "reset your password"
        }

        transporter.sendMail(mail, function(error, info){
            if (error) {
                console.log(error);
                return reject({message:"error"});
            }
            return resolve({message:"success"});
        });
        
    })

}

app.post("/send-password-reset", (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).json({message: "Email required"});
    }

    sendEmail(email).then((response) => res.json(response.message)).catch((error) => res.status(500).json({message: error.message}));
    });
    
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
-------------- 

const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send( 'OMG JACK IS SOOOOO COOL AND FUNNY!!!!' );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
