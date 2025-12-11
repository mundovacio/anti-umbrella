import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Profile } from '../types';
import { deleteProfile } from '../actions/delete-profile';

interface ProfileListProps {
    profiles: Profile[];
    onEdit: (profile: Profile) => void;
}

export function ProfileList({ profiles, onEdit }: ProfileListProps) {
    if (profiles.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profiles.map((profile) => (
                <div
                    key={profile.id}
                    className="card shadow-lg group bg-base-200/50 border border-white/5"
                >
                    <div className="card-body">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="card-title ">{profile.name}</h3>
                                <p className="text-sm text-sky-blue">{profile.relation}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(profile)}
                                    className="btn btn-ghost btn-xs btn-circle text-gray-400 hover:text-white"
                                    aria-label="Editar perfil"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={async () => {
                                        if (
                                            confirm(
                                                '¿Estás seguro de que quieres eliminar este perfil? Esta acción no se puede deshacer.'
                                            )
                                        ) {
                                            await deleteProfile(profile.id);
                                        }
                                    }}
                                    className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                                    aria-label="Eliminar perfil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-light space-y-1">
                            {profile.communicationFrequency && (
                                <p>Frecuencia: {profile.communicationFrequency}</p>
                            )}
                            {profile.communicationChannel && (
                                <p>Canal: {profile.communicationChannel}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
