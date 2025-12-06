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
}) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: 'Unauthorized' };
    }

    try {
        await prisma.settings.upsert({
            where: { userId: session.user.id },
            update: data,
            create: {
                userId: session.user.id,
                ...data,
            },
        });

        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        console.error('Failed to update settings:', error);
        return { error: 'Failed to update settings' };
    }
}
