'use server';

import { signOut } from '@/features/auth/config/auth';

export const logout = async () => {
    await signOut({
        redirectTo: '/onboarding',
    });
};
