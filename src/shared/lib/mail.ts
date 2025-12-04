import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    if (!resend) {
        console.log('----------------------------------------------');
        console.log(`📧 [MOCK] Sending verification email to: ${email}`);
        console.log(`🔗 Confirmation Link: ${confirmLink}`);
        console.log('----------------------------------------------');
        return;
    }

    try {
        await resend!.emails.send({
            from: 'Umbrella <onboarding@resend.dev>', // Update this with your verified domain
            to: email,
            subject: 'Verifica tu correo electrónico',
            html: `<p>Haz clic en el siguiente enlace para verificar tu correo: <a href="${confirmLink}">Verificar correo</a></p>`
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/new-password?token=${token}`;

    if (!resend) {
        console.log('----------------------------------------------');
        console.log(`📧 [MOCK] Sending password reset email to: ${email}`);
        console.log(`🔗 Reset Link: ${resetLink}`);
        console.log('----------------------------------------------');
        return;
    }

    try {
        await resend!.emails.send({
            from: 'Umbrella <onboarding@resend.dev>', // Update this with your verified domain
            to: email,
            subject: 'Restablecer contraseña',
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">Restablecer contraseña</a></p>`
        });
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};
