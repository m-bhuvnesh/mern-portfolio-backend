const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Message = require("../models/Message");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Portfolio Contact Message",
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
});

module.exports = router;
