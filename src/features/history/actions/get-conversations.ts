'use server';

import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';

export async function getConversations() {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                profile: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return conversations;
    } catch (error) {
        console.error('Failed to fetch conversations:', error);
        return [];
    }
}
