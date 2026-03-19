const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// EMAIL VALIDATION FUNCTION
const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};

// SEND WELCOME EMAIL
app.post("/send-email", async (req, res) => {

    const { email } = req.body;

    // Validate Gmail only
    if (!isValidEmail(email)) {
        return res.json({
            success: false,
            message: "Enter valid Gmail address"
        });
    }

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
        subject: "Welcome 🎉",
        text: `Welcome! Your email has been successfully registered at SkillFort Sales Application.🎉`
    };

    try {

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Welcome email sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Failed to send email. Enter valid Gmail"
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});