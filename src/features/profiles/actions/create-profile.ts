'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

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

export async function createProfile(prevState: CreateProfileState, formData: FormData): Promise<CreateProfileState> {
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
