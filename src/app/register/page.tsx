'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { register } from '@/features/auth/actions/register';

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        startTransition(() => {
            register(formData)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setSuccess(data.success);
                    }
                });
        });
    };

    if (success) {
        return (
            <div className="min-h-screen p-4 pb-25 flex items-center justify-center">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">¡Registro Exitoso!</h2>
                    <p className="text-gray-300 mb-6">
                        <br />Tu cuenta ha sido creada exitosamente.
                    </p>
                    <Link href="/login" className="btn btn-primary w-full">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 pb-20">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Crea tu cuenta</h1>
                    <p className="text-gray-400">
                        Únete a Umbrella para comenzar.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="******"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required
                            minLength={6}
                            disabled={isPending}
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-sky-blue hover:bg-sky-blue/80 text-navy-dark border-none"
                        disabled={isPending}
                    >
                        {isPending ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="text-sky-blue hover:underline">
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
