import nodemailer from "nodemailer";

const yourEmail = "oscarsmb@gmail.com";
const yourPass = "0810Otto0810";
const mailHost = "smtp.gmail.com";
const mailPort = 587;
const senderEmail = "oscarsmb@gmail.com"

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */
const sendMail = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // use SSL - TLS
    auth: {
      user: yourEmail,
      pass: yourPass,
    },
  });
  let mailOptions = {
    from: senderEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions); // promise
};

export default sendMail;



