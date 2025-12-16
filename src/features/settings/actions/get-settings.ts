'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { Settings } from '@prisma/client';

export async function getSettings(): Promise<Settings> {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    // Use raw query to fetch to ensure we get new columns even if Prisma Client is stale
    const rawResult = await prisma.$queryRaw<Settings[]>`SELECT * FROM "Settings" WHERE "userId" = ${session.user.id}`;
    let settings = rawResult[0];

    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                userId: session.user.id,
            },
        });
    }

    return settings;
}
