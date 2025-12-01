'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/db';
import { auth } from '@/features/auth/config/auth';

const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, {
        message: 'Current password is required',
    }),
    newPassword: z.string().min(6, {
        message: 'Minimum 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
        message: 'Minimum 6 characters required',
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
    const validatedFields = ChangePasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { currentPassword, newPassword } = validatedFields.data;

    // Get current user from session
    const session = await auth();
    if (!session?.user?.email) {
        return { error: 'Not authenticated!' };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || !user.password) {
        return { error: 'User not found!' };
    }

    // Verify current password
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) {
        return { error: 'Current password is incorrect!' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await prisma.user.update({
        where: { email: session.user.email },
        data: { password: hashedPassword },
    });

    return { success: 'Password changed successfully!' };
};
