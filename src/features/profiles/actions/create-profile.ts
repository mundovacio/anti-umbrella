'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';
import { profileSchema } from '../schema';

export type CreateProfileState = {
    errors?: {
        name?: string[];
        relation?: string[];
        gender?: string[];
        communicationChannel?: string[];
        childrenInfo?: string[];
        general?: string[];
    };
    message?: string;
} | null;

export async function createProfile(_prevState: CreateProfileState, formData: FormData): Promise<CreateProfileState> {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            message: 'Unauthorized',
        };
    }

    const formDataObj = Object.fromEntries(formData.entries());
    const validatedFields = profileSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos obligatorios o son inválidos',
        };
    }

    const {
        name,
        relation,
        gender,
        communicationFrequency,
        communicationChannel,
        childrenInfo,
        legalStatus,
    } = validatedFields.data;

    try {
        await prisma.profile.create({
            data: {
                userId: session.user.id,
                name,
                relation,
                gender,
                communicationFrequency,
                communicationChannel,
                childrenInfo,
                legalStatus,
            },
        });

        revalidatePath('/profiles');
        revalidatePath('/new'); // Update the new conversation page too
        return { message: 'success' };
    } catch (error) {
        console.error('Failed to create profile:', error);
        return {
            message: 'Error al crear el perfil. Por favor, inténtalo de nuevo.',
        };
    }
}
