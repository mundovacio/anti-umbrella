import React from 'react';
import { User as UserIcon, Mail, Calendar } from 'lucide-react';
import { auth } from '@/features/auth/config/auth';
import { prisma } from '@/shared/lib/db';
import { redirect } from 'next/navigation';
import { ChangePasswordForm } from '@/features/user/components/ChangePasswordForm';
import { LogoutButton } from '@/features/user/components/LogoutButton';

export default async function UserPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/onboarding');
    }

    // Fetch user data from database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            emailVerified: true,
        },
    });

    if (!user) {
        redirect('/onboarding');
    }

    // Format date
    const memberSince = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
    }).format(new Date(user.createdAt));

    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-lighter mb-6">Cuenta</h1>

                <div className="card shadow-xl bg-base-200 border border-white/5">
                    <div className="card-body">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-sky-blue/20 flex items-center justify-center">
                                <UserIcon size={40} className="text-sky-blue" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-lighter">{user.name || 'Usuario'}</h2>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail size={20} className="text-sky-blue" />
                                <div>
                                    <p className="text-sm text-gray-light/60">Email</p>
                                    <p className="text-gray-lighter">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar size={20} className="text-sky-blue" />
                                <div>
                                    <p className="text-sm text-gray-light/60">Miembro desde</p>
                                    <p className="text-gray-lighter">{memberSince}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                <ChangePasswordForm />
            </div>
        </div>
    );
}
