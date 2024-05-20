const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
        user: 'trackMy310@gmail.com',
        pass: 'tacc lxax lxdv mheq'
    }
});

// Email sending function
const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'trackMy310@gmail.com',
        to,
        subject,
        text,
        html
    };

    return transporter.sendMail(mailOptions)
        .then(info => console.log('Email sent:', info.response))
        .catch(error => console.log('Error sending email:', error));
};

const getEmailDetails = async () => {
    return {
        to: 'cjmt97@gmail.com',
        subject: 'Scheduled Email',
        text: 'This is a scheduled email sent every 15 minutes.',
        html: '<p>This is a <strong>scheduled</strong> email sent every 15 minutes.</p>'
    };
};

// Schedule the email sending function to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
    try {
        const emailDetails = await getEmailDetails();
        await sendMail(emailDetails.to, emailDetails.subject, emailDetails.text, emailDetails.html);
    } catch (error) {
        console.log('Error scheduling email:', error);
    }
});

// Method to send email immediately
const sendEmailImmediately = async () => {
    try {
        const emailDetails = await getEmailDetails();
        await sendMail(emailDetails.to, emailDetails.subject, emailDetails.text, emailDetails.html);
    } catch (error) {
        console.log('Error sending immediate email:', error);
    }
};

sendEmailImmediately();

console.log('Email scheduler started. Emails will be sent every 15 minutes.');
console.log('Call sendEmailImmediately() to send an email right away.');

module.exports = { sendEmailImmediately };
