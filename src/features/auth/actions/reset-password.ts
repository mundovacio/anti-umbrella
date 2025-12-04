'use server';

import * as z from 'zod';
import { prisma } from '@/shared/lib/db';
import { generatePasswordResetToken } from '@/shared/lib/tokens';
import { sendPasswordResetEmail } from '@/shared/lib/mail';

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
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: 'Reset email sent!' };
};
