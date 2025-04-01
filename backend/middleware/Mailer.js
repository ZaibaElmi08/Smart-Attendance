import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export default class Mailer {
  static async sendMail(to, subject, text) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD, // Must be App Password, not normal password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
      };

      const info = await transporter.sendMail(mailOptions); // Use await
      console.log("Email sent: ", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}
