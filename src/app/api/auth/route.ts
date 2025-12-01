import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PASSWORD = '#tuVive25';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password === PROTECTED_PASSWORD) {
            const response = NextResponse.json({ success: true });

            // Set cookie that expires in 24 hours
            response.cookies.set('auth-session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, error: 'Contraseña incorrecta' },
                { status: 401 }
            );
        }
    } catch {
        return NextResponse.json(
            { success: false, error: 'Error en la autenticación' },
            { status: 500 }
        );
    }
}
