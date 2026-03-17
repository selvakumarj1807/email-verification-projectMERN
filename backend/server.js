const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let otpStorage = {};

// SEND OTP
app.post("/send-otp", async (req, res) => {

    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "selvakumarj1807@gmail.com",
            pass: "bffnoatyszeuclqx"
        }
    });

    const mailOptions = {
        from: "selvakumarj1807@gmail.com",
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP code is ${otp}`
    };

    try {

        await transporter.sendMail(mailOptions);

        otpStorage[email] = otp;

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.json({
            success: false,
            message: "Email not valid"
        });

    }

});


// VERIFY OTP

app.post("/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    if (otpStorage[email] == otp) {

        res.json({
            success: true,
            message: "Email verified successfully"
        });

    } else {

        res.json({
            success: false,
            message: "Invalid OTP"
        });

    }

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});
