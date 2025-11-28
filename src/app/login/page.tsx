'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/');
                router.refresh();
            } else {
                setError(data.error || 'Contraseña incorrecta');
            }
        } catch (err) {
            setError('Error al autenticar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--navy-dark)] flex items-center justify-center p-4">
            <div className="card bg-[var(--navy-medium)] shadow-xl w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title text-2xl text-gray-lighter mb-2">
                        🌂 Anti-Umbrella
                    </h1>
                    <p className="text-gray-light text-sm mb-6">
                        Aplicación en fase de pruebas
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-lighter">Contraseña de acceso</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full bg-[var(--navy-light)] text-gray-lighter border-gray-medium focus:border-accent"
                                placeholder="Introduce la contraseña"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error bg-red-900/20 border-red-800 text-red-300">
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'Acceder'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
