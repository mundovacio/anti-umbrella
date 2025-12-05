'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { reset } from '@/features/auth/actions/reset-password';

export default function ResetPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        startTransition(() => {
            reset({ email })
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl;
                        }
                    }
                });
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card shadow-xl w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="card-body">
                    <h1 className="card-title text-2xl text-gray-lighter mb-2 justify-center">
                        Recuperar Contraseña
                    </h1>
                    <p className="text-gray-light text-sm mb-6 text-center">
                        Ingresa tu correo para continuar.
                    </p>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className="label">
                                <span className="label-text text-gray-lighter">Correo Electrónico</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                                placeholder="ejemplo@correo.com"
                                required
                                disabled={isPending}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error bg-red-900/20 border-red-800 text-red-300 text-sm py-2">
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success bg-green-900/20 border-green-800 text-green-300 text-sm py-2">
                                <span>{success}</span>
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
                                'Continuar'
                            )}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-400 mt-4">
                        <Link href="/login" className="text-sky-blue hover:underline">
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
