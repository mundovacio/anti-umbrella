import React from 'react';
import { Plus } from 'lucide-react';

interface Profile {
    id: string;
    name: string;
    relation: string;
}

interface ProfileSelectorProps {
    profiles: Profile[];
    selectedProfileId: string;
    setSelectedProfileId: (id: string) => void;
    isLoading: boolean;
}

export function ProfileSelector({
    profiles,
    selectedProfileId,
    setSelectedProfileId,
    isLoading
}: ProfileSelectorProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300 ml-1">De quién se trata</label>
                <a href="/profiles" className="text-xs text-sky-blue hover:text-sky-300 transition-colors">
                    Gestionar perfiles
                </a>
            </div>
            <div className="relative">
                {isLoading ? (
                    <div className="w-full h-12 bg-black/20 border border-white/10 rounded-xl animate-pulse" />
                ) : profiles.length > 0 ? (
                    <>
                        <select
                            className="select w-full"
                            value={selectedProfileId}
                            onChange={(e) => setSelectedProfileId(e.target.value)}
                        >
                            <option value="" disabled>Selecciona un perfil...</option>
                            {profiles.map(profile => (
                                <option key={profile.id} value={profile.id}>{profile.name} ({profile.relation})</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </>
                ) : (
                    <div className="p-4 border border-dashed border-white/10 rounded-xl bg-black/10 text-center space-y-3">
                        <p className="text-sm text-gray-400">No tienes perfiles guardados</p>
                        <a href="/profiles" className="btn btn-sm btn-outline btn-info">
                            <Plus size={16} />
                            Crear Nuevo Perfil
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
