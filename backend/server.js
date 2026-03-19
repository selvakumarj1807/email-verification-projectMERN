const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");

const app = express(); // ✅ FIXED

app.use(cors());
app.use(express.json());

const EMAIL_API_KEY = "8be6a3e456804b5ab09a5a193ba004d9"; // replace with correct key

app.post("/send-email", async (req, res) => {

    const { email } = req.body;

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
        return res.json({
            success: false,
            message: "Enter valid Gmail ❌"
        });
    }

    try {

        const response = await axios.get(
            "https://emailreputation.abstractapi.com/v1/",
            {
                params: {
                    api_key: EMAIL_API_KEY,
                    email: email
                }
            }
        );

        console.log("API RESPONSE:", response.data);

        const data = response.data;

        // ✅ FIXED CHECK
        if (data.email_deliverability.status_detail !== "valid_email") {
            return res.json({
                success: false,
                message: "Couldn’t find your Google Account ❌"
            });
        }

        // ✅ SUCCESS CASE
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "selvakumarj1807@gmail.com",
                pass: "bffnoatyszeuclqx"
            }
        });

        await transporter.sendMail({
            from: "selvakumarj1807@gmail.com",
            to: email,
            subject: "Welcome 🎉",
            text: `Welcome! Your email (${email}) verified successfully.`
        });

        return res.json({
            success: true,
            message: "Welcome email sent successfully ✅"
        });

    } catch (error) {

        console.log("ERROR:", error.response?.data || error.message);

        return res.json({
            success: false,
            message: "Email verification failed ❌"
        });

    }

});

// ✅ Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});