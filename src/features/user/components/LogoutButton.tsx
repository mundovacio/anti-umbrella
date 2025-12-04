'use client';

import React, { useState, useTransition } from 'react';
import { logout } from '@/features/auth/actions/logout';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        startTransition(() => {
            logout();
        });
    };

    if (showConfirm) {
        return (
            <div className="card shadow-xl border border-red-500/20">
                <div className="card-body">
                    <h3 className="text-lg font-semibold text-gray-lighter">¿Cerrar Sesión?</h3>
                    <p className="text-gray-light/60 text-sm">¿Estás seguro de que quieres cerrar sesión?</p>
                    <div className="card-actions justify-end mt-4 gap-2">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="btn btn-ghost text-gray-light"
                            disabled={isPending}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn bg-red-500 hover:bg-red-600 text-white border-none"
                            disabled={isPending}
                        >
                            {isPending ? 'Cerrando...' : 'Sí, Cerrar Sesión'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="btn bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
        >
            <LogOut size={18} />
            Cerrar Sesión
        </button>
    );
};
