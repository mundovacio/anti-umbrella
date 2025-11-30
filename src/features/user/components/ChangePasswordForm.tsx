'use client';

import React, { useState, useTransition } from 'react';
import { changePassword } from '@/actions/change-password';
import { Lock } from 'lucide-react';

export const ChangePasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        startTransition(() => {
            changePassword(formData)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setSuccess(data.success);
                        // Reset form on success
                        setFormData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        });
                    }
                });
        });
    };

    return (
        <div className="card bg-[var(--navy-medium)] shadow-xl mt-6">
            <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                    <Lock size={24} className="text-sky-blue" />
                    <h3 className="text-xl font-semibold text-gray-lighter">Cambiar Contraseña</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-light/80">Contraseña Actual</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="******"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-light/80">Nueva Contraseña</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="******"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            minLength={6}
                            disabled={isPending}
                        />
                        <p className="text-xs text-gray-light/60">Mínimo 6 caracteres</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-light/80">Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="******"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            minLength={6}
                            disabled={isPending}
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-sky-blue hover:bg-sky-blue/80 text-navy-dark border-none"
                        disabled={isPending}
                    >
                        {isPending ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
};
