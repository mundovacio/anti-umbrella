'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function completeOnboarding(data: { name: string; theme: string }) {
    // For now, we'll create a new user every time since we don't have auth yet.
    // In a real app, we would get the current user ID.
    const user = await prisma.user.create({
        data: {
            email: `user-${Date.now()}@example.com`, // Temporary unique email
            name: data.name,
            settings: {
                create: {
                    theme: data.theme,
                },
            },
            // Create a default profile
            // profiles: {
            //   create: {
            //     name: 'Me',
            //     type: 'personal',
            //   }
            // }
        },
    });

    // Redirect to the main user page
    redirect('/user');
}
