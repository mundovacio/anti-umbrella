'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { revalidatePath } from 'next/cache';

export async function saveConversation(inputMessage: string, generatedReply: string, profileId?: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { message: 'Unauthorized' };
    }

    try {
        const conversation = await prisma.conversation.create({
            data: {
                userId: session.user.id,
                profileId: profileId || null,
                title: inputMessage.substring(0, 50) + (inputMessage.length > 50 ? '...' : ''),
                messages: {
                    create: [
                        {
                            content: inputMessage,
                            role: 'user',
                        },
                        {
                            content: generatedReply,
                            role: 'assistant',
                        },
                    ],
                },
            },
        });

        revalidatePath('/history');
        return { message: 'success', conversationId: conversation.id };
    } catch (error) {
        console.error('Failed to save conversation:', error);
        return { message: 'Error saving conversation' };
    }
}
