import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/onboarding',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnOnboarding = nextUrl.pathname.startsWith('/onboarding');
            const isOnVerifyEmail = nextUrl.pathname.startsWith('/verify-email');

            if (isOnOnboarding || isOnVerifyEmail) {
                if (isLoggedIn) {
                    // If logged in and on onboarding, redirect to /new (or home)
                    return Response.redirect(new URL('/new', nextUrl));
                }
                return true; // Allow access to onboarding/verify-email if not logged in
            }

            if (!isLoggedIn) {
                // Redirect unauthenticated users to onboarding
                return Response.redirect(new URL('/onboarding', nextUrl));
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
