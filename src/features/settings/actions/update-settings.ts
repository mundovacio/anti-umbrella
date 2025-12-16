'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateSettings(data: {
    showOriginalText?: boolean;
    showFriendlyTranslation?: boolean;
    showGeneratedReply?: boolean;
    denyAppointments?: boolean;
    theme?: string;
    inputType?: string;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        // Use normal upsert for main fields. 
        // We handle inputType separately via raw query to bypass potential stale Prisma Client validation
        const { inputType, ...prismaData } = data;

        await prisma.settings.upsert({
            where: { userId: session.user.id },
            update: prismaData,
            create: {
                userId: session.user.id,
                ...prismaData,
            },
        });

        // Force update inputType using raw query to get around stale client issues
        if (inputType) {
            await prisma.$executeRaw`UPDATE "Settings" SET "inputType" = ${inputType} WHERE "userId" = ${session.user.id}`;
        }

        revalidatePath('/settings');
        revalidatePath('/new');
        return { success: true };
    } catch (error) {
        console.error('Failed to update settings:', error);
        return { error: 'Failed to update settings' };
    }
}
