const nodemailer = require("nodemailer");
const mailtemplate = require("../views/mailtemplate");

const sendEmail = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "giksaw01@gmail.com",
      to: email,
      subject: "Password Reset",
      html: mailtemplate(link),
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
