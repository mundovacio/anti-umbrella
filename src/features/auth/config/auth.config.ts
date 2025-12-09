import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnOnboarding = nextUrl.pathname.startsWith('/onboarding');
            const isOnVerifyEmail = nextUrl.pathname.startsWith('/verify-email');
            const isOnRegister = nextUrl.pathname.startsWith('/register');
            const isOnLogin = nextUrl.pathname.startsWith('/login');
            const isOnAuth = nextUrl.pathname.startsWith('/auth');

            // Public pages
            if (isOnOnboarding || isOnVerifyEmail || isOnRegister || isOnLogin || isOnAuth) {
                if (isLoggedIn) {
                    // If logged in and on auth pages, redirect to /new (or home)
                    return Response.redirect(new URL('/new', nextUrl));
                }
                return true; // Allow access if not logged in
            }

            // Protected pages
            if (!isLoggedIn) {
                // Redirect unauthenticated users to login
                return Response.redirect(new URL('/login', nextUrl));
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
