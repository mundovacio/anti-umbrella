'use server';

import { auth, signOut } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';

export const deleteAccount = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        });
    } catch (error) {
        console.error('Error deleting account:', error);
        return { error: 'Failed to delete account' };
    }

    await signOut({ redirectTo: '/register' });
};
