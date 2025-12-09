'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Profile } from '../types';
import { ProfileList } from './profile-list';
import { ProfileForm } from './profile-form';

interface ProfileManagerProps {
    initialProfiles: Profile[];
}

export function ProfileManager({ initialProfiles }: ProfileManagerProps) {
    const [showForm, setShowForm] = useState(false);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

    const handleEdit = (profile: Profile) => {
        setEditingProfile(profile);
        setShowForm(true);
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingProfile(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProfile(null);
    };

    return (
        <>
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold ">Perfiles</h1>
                <button
                    onClick={() => {
                        setEditingProfile(null);
                        setShowForm(!showForm);
                    }}
                    className="btn btn-primary btn-circle"
                    aria-label={showForm ? 'Cerrar formulario' : 'Crear nuevo perfil'}
                >
                    <Plus size={24} className={showForm ? 'rotate-45' : ''} style={{ transition: 'transform 0.2s' }} />
                </button>
            </header>

            {showForm ? (
                <ProfileForm
                    initialData={editingProfile}
                    onClose={handleCancel}
                    onSuccess={handleSuccess}
                />
            ) : (
                <div className="space-y-4">
                    {initialProfiles.length === 0 ? (
                        <div className="text-center py-12 space-y-4">
                            <p className="text-gray-light text-lg">
                                No hay perfiles creados aún.
                            </p>

                            <p className="text-gray-light">
                                La información de perfil es esencial para que podamos ayudarte.
                                Nos ayuda a comprender mejor tu situación para poderte dar la
                                respuesta más adecuada a tu situación.
                            </p>

                            <button
                                onClick={() => setShowForm(true)}
                                className="btn btn-primary "
                            >
                                Crea un perfil para comenzar
                            </button>
                        </div>
                    ) : (
                        <ProfileList profiles={initialProfiles} onEdit={handleEdit} />
                    )}
                </div>
            )}
        </>
    );
}
