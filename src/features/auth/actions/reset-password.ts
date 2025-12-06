'use server';

import * as z from 'zod';
import { prisma } from '@/shared/lib/db';
import { generatePasswordResetToken } from '@/shared/lib/tokens';

const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
});

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid email!' };
    }

    const { email } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        return { error: 'Email not found!' };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${passwordResetToken.token}`;

    console.log('----------------------------------------------');
    console.log(`🔐 [DEV] Password Reset Token: ${passwordResetToken.token}`);
    console.log(`🔗 Reset Link: ${resetUrl}`);
    console.log('----------------------------------------------');

    return { success: 'Redirigiendo...', redirectUrl: resetUrl };
};
