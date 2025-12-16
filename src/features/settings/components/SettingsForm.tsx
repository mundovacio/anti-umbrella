'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { updateSettings } from '@/features/settings/actions/update-settings';
import { deleteAccount } from '@/features/auth/actions/delete-account';

type SettingsType = {
    showOriginalText: boolean;
    showFriendlyTranslation: boolean;
    showGeneratedReply: boolean;
    denyAppointments: boolean;
    inputType: string;
    theme: string;
};

export const SettingsForm = ({ initialSettings }: { initialSettings: SettingsType }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggle = async (key: keyof SettingsType) => {
        const newValue = !settings[key];
        setSettings((prev) => ({ ...prev, [key]: newValue }));

        // Call server action to update settings
        await updateSettings({ [key]: newValue });
    };

    const handleThemeToggle = async () => {
        const newTheme = settings.theme === 'sunset' ? 'nord' : 'sunset';
        setSettings((prev) => ({ ...prev, theme: newTheme }));

        // Optimistic UI update
        document.documentElement.setAttribute('data-theme', newTheme);

        await updateSettings({ theme: newTheme });
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await deleteAccount();
        } catch (error) {
            console.error('Failed to delete account', error);
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                    <SettingsIcon size={32} className="text-sky-blue" />
                    <h1 className="text-3xl font-semibold text-gray-lighter">Ajustes</h1>
                </div>

                <div className="card shadow-xl bg-base-200 border border-white/5">
                    <div className="card-body">
                        <h2 className="card-title text-gray-lighter mb-4">Preferencias de Visualización</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-lighter font-medium">Mostrar texto original</p>
                                    <p className="text-sm text-gray-light/60">Muestra el mensaje recibido</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.showOriginalText}
                                    onChange={() => handleToggle('showOriginalText')}
                                />
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-lighter font-medium">Mostrar traducción amigable</p>
                                    <p className="text-sm text-gray-light/60">Versión neutral del mensaje</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.showFriendlyTranslation}
                                    onChange={() => handleToggle('showFriendlyTranslation')}
                                />
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-lighter font-medium">Mostrar respuesta generada</p>
                                    <p className="text-sm text-gray-light/60">Sugerencia de respuesta</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.showGeneratedReply}
                                    onChange={() => handleToggle('showGeneratedReply')}
                                />
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-lighter font-medium">Denegar citas/reuniones</p>
                                    <p className="text-sm text-gray-light/60">Rechazar automáticamente solicitudes de encuentro</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.denyAppointments}
                                    onChange={() => handleToggle('denyAppointments')}
                                />
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-lighter font-medium">Método de entrada por defecto</p>
                                    <p className="text-sm text-gray-light/60">{settings.inputType === 'textarea' ? 'Escribir texto' : 'Botón para pegar texto'}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={settings.inputType === 'textarea'}
                                        onChange={async () => {
                                            const newValue = settings.inputType === 'textarea' ? 'button' : 'textarea';
                                            setSettings((prev) => ({ ...prev, inputType: newValue }));
                                            await updateSettings({ inputType: newValue });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-xl mt-6 bg-base-200 border border-white/5">
                    <div className="card-body">
                        <h2 className="card-title text-gray-lighter mb-4">Apariencia</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-lighter font-medium">Tema oscuro</p>
                                <p className="text-sm text-gray-light/60">{settings.theme === 'sunset' ? 'Activado' : 'Desactivado'}</p>
                            </div>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={settings.theme === 'sunset'}
                                onChange={handleThemeToggle}
                            />
                        </div>
                    </div>
                </div>

                <div className="card bg-red-900/20 border border-red-900/50 shadow-xl mt-6">
                    <div className="card-body">
                        <h2 className="card-title text-red-400 mb-4">Zona de Peligro</h2>
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <p className="text-gray-lighter font-medium">Eliminar cuenta</p>
                                <p className="text-sm text-gray-light/60">Esta acción es irreversible</p>
                            </div>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="btn btn-error btn-outline"
                            >
                                Eliminar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className=" p-6 rounded-lg max-w-md w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-lighter mb-4">¿Estás seguro?</h3>
                        <p className="text-gray-300 mb-6">
                            Esta acción eliminará permanentemente tu cuenta y todos tus datos asociados. No se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="btn btn-ghost text-gray-300"
                                disabled={isDeleting}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="btn btn-error"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Eliminando...' : 'Sí, eliminar cuenta'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
