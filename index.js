const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 7000;

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER, // Your Gmail email address
        pass: process.env.PASS, // Your Gmail password (use an app-specific password)
    },
});

app.get('/', (req, res) => {
    res.send('API is working');
});

app.post('/send_email', (req, res) => {
    const { name, email, phone, message, from, to } = req.body;

    const mailOptions = {
        from: 'kishang5500@gmail.com',
        to: 'kishang5500@gmail.com', // Receiver's email address
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone:${phone}\nfrom:${from}\nto:${to}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'An error occurred while sending the email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(`${process.env.User}`)
    // console.log(`${process.env.PASS}`)
});