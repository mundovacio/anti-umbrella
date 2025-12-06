'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

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

    const name = formData.get('name') as string;
    const relation = formData.get('relation') as string;
    const gender = formData.get('gender') as string;
    const communicationFrequency = formData.get('communicationFrequency') as string;
    const communicationChannel = formData.get('communicationChannel') as string;
    const childrenInfo = formData.get('childrenInfo') as string;
    const legalStatus = formData.get('legalStatus') as string;

    const errors: any = {};
    if (!name) errors.name = ['El nombre es obligatorio'];
    if (!relation) errors.relation = ['La relación es obligatoria'];
    if (!gender) errors.gender = ['El género es obligatorio'];
    if (!communicationChannel) errors.communicationChannel = ['El canal de comunicación es obligatorio'];
    if (!childrenInfo) errors.childrenInfo = ['La información de vinculación es obligatoria'];

    if (Object.keys(errors).length > 0) {
        return {
            errors,
            message: 'Faltan campos obligatorios',
        };
    }

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
