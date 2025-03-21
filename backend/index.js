import { config } from 'dotenv'
config();
import express from 'express'
import cors from 'cors'
import emailValidator from 'email-validator'
import nodemailer from 'nodemailer'

const app=express()

app.use(cors({
    origin: 'https://bhartinews.vercel.app/',  // Frontend URL
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,  // Your email address (for sending emails)
        pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
});

app.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log(name,email,message)
        // Email validation
        if (!emailValidator.validate(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Prepare email for admin
        const mailOptionsAdmin = {
            from: email,  // The user's email
            to: process.env.ADMIN_EMAIL,  // Admin email
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email to admin
        await transporter.sendMail(mailOptionsAdmin);

        // Prepare email for the user (confirmation)
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,  // Your email (for sending confirmation)
            to: email,                    // The user's email (for receiving confirmation)
            subject: 'Thank You for Contacting Us!',
            text: `Hi ${name},\n\nThank you for contacting us. I have received your message and will get back to you shortly.\n\nBest regards,\nRonak Bhowmik`,
        };

        // Send confirmation email to the user
        await transporter.sendMail(mailOptionsUser);
        res.status(200).json({message:"successfully sent"})
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
});



app.listen(4000, () => {
    console.log("jai shir ram")
})