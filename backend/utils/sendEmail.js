import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Mitroz. Restaurant" <${process.env.MAIL_USER}>`, 
      to,
      subject,
      text, 
      html, 
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // Don't throw error to crash app, just log it
    return false;
  }
};

export default sendEmail;