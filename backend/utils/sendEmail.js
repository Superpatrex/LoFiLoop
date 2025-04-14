const nodemailer = require("nodemailer");

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


module.exports = sendSignUpEmail; //export sendSignUpEmail function

