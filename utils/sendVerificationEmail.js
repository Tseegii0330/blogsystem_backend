import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendVerificationEmail(email, verfyToken) {
  const link = `http://localhost:3000/verify-email?token=${verfyToken}`;

  const mailOptions = {
    from: `"My Blog App" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Имэйл баталгаажуулалт",
    html: `<p>Имэйлээ баталгаажуулахын тулд дараах холбоос дээр дарна уу:</p>
           <a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(mailOptions);
}

export default sendVerificationEmail;
