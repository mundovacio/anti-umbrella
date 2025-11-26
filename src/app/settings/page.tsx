'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        showOriginalText: true,
        showFriendlyTranslation: true,
        showGeneratedReply: true,
        denyAppointments: false,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[var(--navy-dark)] p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                    <SettingsIcon size={32} className="text-sky-blue" />
                    <h1 className="text-3xl font-semibold text-gray-lighter">Configuración</h1>
                </div>

                <div className="card bg-[var(--navy-medium)] shadow-xl">
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
                        </div>
                    </div>
                </div>

                <div className="card bg-[var(--navy-medium)] shadow-xl mt-6">
                    <div className="card-body">
                        <h2 className="card-title text-gray-lighter mb-4">Apariencia</h2>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-lighter font-medium">Tema oscuro</p>
                                <p className="text-sm text-gray-light/60">Siempre activo</p>
                            </div>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={true}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
