'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { login } from '@/features/auth/actions/login';

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');


        startTransition(() => {
            login(formData)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    // Success redirects automatically in the server action
                });
        });
    };

    return (
        <div className="min-h-screen p-4 pb-25 flex items-center justify-center">
            <div className="card shadow-xl w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="card-body">
                    <h1 className="card-title text-2xl text-gray-lighter mb-2 justify-center">
                        🌂 Umbrella
                    </h1>
                    <p className="text-gray-light text-sm mb-6 text-center">
                        Inicia sesión para continuar
                    </p>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className="label">
                                <span className="label-text text-gray-lighter">Correo Electrónico</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                                placeholder="ejemplo@correo.com"
                                required
                                disabled={isPending}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className="label">
                                <span className="label-text text-gray-lighter">Contraseña</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                                placeholder="******"
                                required
                                disabled={isPending}
                            />
                            <label className="label">
                                <Link href="/auth/reset" className="label-text-alt link link-hover text-sky-blue">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </label>
                        </div>

                        {error && (
                            <div className="alert alert-error bg-red-900/20 border-red-800 text-red-300 text-sm py-2">
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-sky-blue hover:bg-sky-blue/80 text-navy-dark border-none"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'Acceder'
                            )}
                        </button>
                    </form>

                    <div className="divider text-gray-500">O</div>

                    <div className="text-center text-sm text-gray-400">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="text-sky-blue hover:underline">
                            Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
