'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/db';
import { generateVerificationToken } from '@/shared/lib/tokens';
import { sendVerificationEmail } from '@/shared/lib/mail';

const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required',
    }),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return { error: 'Email already in use!' };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.identifier, verificationToken.token);

    return { success: 'Confirmation email sent!' };
};
