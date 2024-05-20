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
    try {
        const response = await fetch('http://localhost:3001/api/notif/emails/');
        if (!response.ok) {
            throw new Error('Failed to fetch email details');
        }
        const data = await response.json();
        console.log(data);
        // Map the data to the desired format
        const emailDetails = data.map(({ email_address, room_id }) => ({
            to: email_address,
            subject: 'Room Id: ' + room_id + " Occupancy", // Use room_id instead of roomid
            text: 'The room with roomId ' + room_id + ' has gone below your required threshold',
        }));
        return emailDetails;
    } catch (error) {
        console.log('Error fetching email details:', error);
        // Default email details in case of error
        return [
            { to: 'cjmt97@gmail.com', subject: 'Default Subject', text: 'Default Text', roomId: 6 },
            { to: 'cjmt97@gmail.com', subject: 'Default Subject', text: 'Default Text', roomId: 8 }
        ];
    }
};



// Schedule the email sending function to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
    try {
        const emailDetailsArray = await getEmailDetails();
        // Iterate through each email detail object and send an email
        for (const emailDetails of emailDetailsArray) {
            await sendMail(emailDetails.to, emailDetails.subject, emailDetails.text, emailDetails.html);
        }
    } catch (error) {
        console.log('Error scheduling email:', error);
    }
});

// Method to send email immediately
const sendEmailImmediately = async () => {
    try {
        const emailDetailsArray = await getEmailDetails();
        // Iterate through each email detail object and send an email
        for (const emailDetails of emailDetailsArray) {
            await sendMail(emailDetails.to, emailDetails.subject, emailDetails.text);
        }
    } catch (error) {
        console.log('Error sending immediate email:', error);
    }
};


sendEmailImmediately();

console.log('Email scheduler started. Emails will be sent every 15 minutes.');
console.log('Call sendEmailImmediately() to send an email right away.');

module.exports = { sendEmailImmediately };
