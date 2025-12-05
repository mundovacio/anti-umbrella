import { Suspense } from 'react';
import VerifyEmailClient from './VerifyEmailClient';

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen p-4 pb-25 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-6">Verificación de Correo</h1>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="loading loading-spinner loading-lg text-sky-blue"></div>
                            <p className="text-gray-300">Cargando...</p>
                        </div>
                    </div>
                </div>
            }
        >
            <VerifyEmailClient />
        </Suspense>
    );
}
