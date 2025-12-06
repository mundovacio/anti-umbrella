'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';

export async function getProfiles() {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    try {
        const profiles = await prisma.profile.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return profiles;
    } catch (error) {
        console.error('Failed to fetch profiles:', error);
        return [];
    }
}
