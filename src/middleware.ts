import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PASSWORD = '#tuVive25';

export function middleware(request: NextRequest) {
    // Check if user has valid session cookie
    const authCookie = request.cookies.get('auth-session');

    // If accessing the auth API, allow it
    if (request.nextUrl.pathname === '/api/auth') {
        return NextResponse.next();
    }

    // If user is authenticated, allow access
    if (authCookie?.value === 'authenticated') {
        return NextResponse.next();
    }

    // If accessing the login page, allow it
    if (request.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }

    // Otherwise, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
