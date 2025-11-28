'use client';

import React from 'react';
import { User as UserIcon, Mail, Calendar } from 'lucide-react';

export default function UserPage() {
    return (
        <div className="bg-[var(--navy-dark)] p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-lighter mb-6">Mi Perfil</h1>

                <div className="card bg-[var(--navy-medium)] shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-sky-blue/20 flex items-center justify-center">
                                <UserIcon size={40} className="text-sky-blue" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-lighter">Usuario</h2>
                                <p className="text-gray-light/60">Plan Básico</p>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail size={20} className="text-sky-blue" />
                                <div>
                                    <p className="text-sm text-gray-light/60">Email</p>
                                    <p className="text-gray-lighter">usuario@ejemplo.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar size={20} className="text-sky-blue" />
                                <div>
                                    <p className="text-sm text-gray-light/60">Miembro desde</p>
                                    <p className="text-gray-lighter">Noviembre 2025</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button className="btn btn-primary">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
