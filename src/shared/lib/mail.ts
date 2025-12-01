export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/verify-email?token=${token}`;

    console.log('----------------------------------------------');
    console.log(`📧 Sending verification email to: ${email}`);
    console.log(`🔗 Confirmation Link: ${confirmLink}`);
    console.log('----------------------------------------------');
};
