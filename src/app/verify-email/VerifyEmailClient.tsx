'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/features/auth/actions/new-verification';
import { motion } from 'framer-motion';

export default function VerifyEmailClient() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState<string | undefined>(!token ? 'Missing token!' : undefined);
    const [success, setSuccess] = useState<string | undefined>();

    useEffect(() => {
        if (success || error || !token) return;

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError('Something went wrong!');
            });
    }, [token, success, error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Verificación de Correo</h1>

                {!success && !error && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="loading loading-spinner loading-lg text-sky-blue"></div>
                        <p className="text-gray-300">Verificando tu correo...</p>
                    </div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-400 text-lg font-medium">{success}</p>
                        <a href="/onboarding" className="btn btn-primary w-full mt-4">
                            Ir a Iniciar Sesión
                        </a>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-400 text-lg font-medium">{error}</p>
                        <a href="/onboarding" className="btn btn-ghost w-full mt-4">
                            Volver
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
