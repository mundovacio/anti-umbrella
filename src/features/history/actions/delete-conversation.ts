'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteConversation(conversationId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { message: 'Unauthorized' };
    }

    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

        if (!conversation || conversation.userId !== session.user.id) {
            return { message: 'Unauthorized or not found' };
        }

        await prisma.conversation.delete({
            where: { id: conversationId },
        });

        revalidatePath('/history');
        return { message: 'success' };
    } catch (error) {
        console.error('Failed to delete conversation:', error);
        return { message: 'Error deleting conversation' };
    }
}
