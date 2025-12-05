
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
    console.log('Attempting to send test email...');
    try {
        const data = await resend.emails.send({
            from: 'Umbrella <onboarding@resend.dev>',
            to: 'mundovacio3@gmail.com',
            subject: 'Test Email from Umbrella',
            html: '<p>This is a test email to verify configuration.</p>'
        });
        console.log('Email sent successfully:', data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail();
