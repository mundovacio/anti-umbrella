'use server';

import { redirect } from 'next/navigation';

export async function completeOnboarding() {
    // For now, just redirect to the new conversation page
    // In a real app with auth, we would mark the user as onboarded
    redirect('/new');
}
