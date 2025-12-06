'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { Settings } from '@prisma/client';

export async function getSettings(): Promise<Settings> {
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
