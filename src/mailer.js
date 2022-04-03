const NodeMailer = require('nodemailer');

let transporter = NodeMailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

const Mailer = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(info);
            }
        });
    })
}

module.exports = { Mailer }