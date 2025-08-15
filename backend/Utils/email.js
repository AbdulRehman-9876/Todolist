const nodemailer = require("nodemailer");
require("dotenv").config(); // Make sure .env variables are loaded

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendMail(email, OTP) {
  try {
    let info = await transporter.sendMail({
      from: `"Todolist" <${process.env.APP_EMAIL}>`,
      to: email,
      subject: "Confirm Registration",
      html: ` <p>Your OTP is: <b>${OTP}</b></p>
     <p style="color: gray; font-size: 0.9em;">This OTP will expire in 5 minutes.</p>`,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendMail;
