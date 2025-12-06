'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProfile(profileId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            message: 'Unauthorized',
        };
    }

    try {
        // Verify ownership before deleting
        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId,
            },
        });

        if (!profile || profile.userId !== session.user.id) {
            return {
                message: 'Unauthorized or profile not found',
            };
        }

        await prisma.profile.delete({
            where: {
                id: profileId,
            },
        });

        revalidatePath('/profiles');
        revalidatePath('/new');
        return { message: 'success' };
    } catch (error) {
        console.error('Failed to delete profile:', error);
        return {
            message: 'Error al eliminar el perfil. Por favor, inténtalo de nuevo.',
        };
    }
}
