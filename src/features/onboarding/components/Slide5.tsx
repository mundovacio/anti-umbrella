import React, { useState, useTransition } from 'react';
import { useOnboardingStore } from '../store/onboardingStore';
import { register } from '@/features/auth/actions/register';
import { login } from '@/features/auth/actions/login';


export const Slide5 = ({ }: { onComplete: () => void }) => {
    const { prevStep } = useOnboardingStore();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isLogin, setIsLogin] = useState(false);

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
            if (isLogin) {
                login(formData)
                    .then((data) => {
                        if (data?.error) {
                            setError(data.error);
                        }
                        // Success redirects automatically
                    });
            } else {
                register(formData)
                    .then((data) => {
                        if (data.error) {
                            setError(data.error);
                        }
                        if (data.success) {
                            setSuccess(data.success);
                            // Optional: Auto-login or redirect logic could go here, 
                            // but for now we just show success and maybe a button to finish/login
                        }
                    });
            }
        });
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center px-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">¡Registro Exitoso!</h2>
                <p className="text-gray-300">
                    Hemos enviado un enlace de confirmación a <b>{formData.email}</b>.
                    <br />Por favor, verifica tu correo para continuar.
                </p>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400">
                    <p>Nota: Revisa la consola del servidor para ver el enlace de simulación.</p>
                </div>
                <button onClick={() => { setSuccess(''); setIsLogin(true); }} className="btn btn-primary w-full mt-4">
                    Ir al Inicio de Sesión
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full px-8 py-6 overflow-y-auto custom-scrollbar">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                </h2>
                <p className="text-gray-400 text-sm">
                    {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Para poder guardar tus preferencias y conversaciones de una vez para otra.'}
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <div className="tabs tabs-boxed bg-white/5">
                    <a className={`tab ${!isLogin ? 'tab-active' : ''}`} onClick={() => setIsLogin(false)}>Registrarse</a>
                    <a className={`tab ${isLogin ? 'tab-active' : ''}`} onClick={() => setIsLogin(true)}>Iniciar Sesión</a>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                {!isLogin && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-sky-blue text-white"
                            required={!isLogin}
                            disabled={isPending}
                        />
                    </div>
                )}

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

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-ghost flex-1 text-gray-400 hover:text-white"
                        disabled={isPending}
                    >
                        Atrás
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary flex-1 bg-sky-blue hover:bg-sky-blue/80 text-navy-dark border-none"
                        disabled={isPending}
                    >
                        {isPending ? 'Procesando...' : (isLogin ? 'Entrar' : 'Registrarse')}
                    </button>
                </div>
            </form>
        </div>
    );
};
