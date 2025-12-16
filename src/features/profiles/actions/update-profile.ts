'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';
import { profileSchema } from '../schema';

export type UpdateProfileState = {
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

export async function updateProfile(
    profileId: string,
    prevState: UpdateProfileState,
    formData: FormData
): Promise<UpdateProfileState> {
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
        // Verify ownership before updating
        const existingProfile = await prisma.profile.findUnique({
            where: { id: profileId },
        });

        if (!existingProfile || existingProfile.userId !== session.user.id) {
            return { message: 'Unauthorized or profile not found' };
        }

        await prisma.profile.update({
            where: {
                id: profileId,
            },
            data: {
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
        revalidatePath('/new');
        return { message: 'success' };
    } catch (error) {
        console.error('Failed to update profile:', error);
        return {
            message: 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.',
        };
    }
}
