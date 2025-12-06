'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';

export async function getSettings() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    let settings = await prisma.settings.findUnique({
        where: { userId: session.user.id },
    });

    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                userId: session.user.id,
            },
        });
    }

    return settings;
}
