'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ProfilesPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [createState, setCreateState] = useState<any>(null); // State for server action result

    React.useEffect(() => {
        import('@/features/profiles/actions/get-profiles').then(async (mod) => {
            try {
                const fetchedProfiles = await mod.getProfiles();
                setProfiles(fetchedProfiles);
            } catch (error) {
                console.error('Failed to fetch profiles:', error);
            } finally {
                setIsLoading(false);
            }
        });
    }, [createState]); // Re-fetch when creation state changes (success)

    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold ">Perfiles</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-primary btn-circle"
                    >
                        <Plus size={24} />
                    </button>
                </header>

                {showForm && (
                    <div className="card shadow-xl mb-6">
                        <div className="card-body">
                            <h2 className="card-title ">Nuevo perfil del agresor/a</h2>


                            <form
                                action={async (formData) => {
                                    const mod = await import('@/features/profiles/actions/create-profile');
                                    const result = await mod.createProfile(null, formData);
                                    setCreateState(result);
                                    if (result?.message === 'success') {
                                        setShowForm(false);
                                        // Trigger a refresh logic if needed, but useEffect depends on createState
                                    }
                                }}
                                className="space-y-4"
                            >
                                {createState?.message && createState.message !== 'success' && (
                                    <div className="alert alert-error text-sm">
                                        {createState.message}
                                    </div>
                                )}

                                <div>
                                    <label className="label" htmlFor="name">
                                        <span className="label-text text-gray-light">Nombre</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="ej: jefe, ex, etc."
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    {createState?.errors?.name && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{createState.errors.name[0]}</span>
                                        </label>
                                    )}
                                </div>

                                <div>
                                    <label className="label" htmlFor="relation">
                                        <span className="label-text text-gray-light">Relación</span>
                                    </label>
                                    <input
                                        id="relation"
                                        name="relation"
                                        list="relationships"
                                        className="input w-full"
                                        placeholder="Selecciona o escribe una relación"
                                        required
                                    />
                                    <datalist id="relationships">
                                        <option value="Pareja" />
                                        <option value="Ex-pareja" />
                                        <option value="Padre/Madre" />
                                        <option value="Jefe" />
                                        <option value="Compañero de trabajo" />
                                        <option value="Amigo/a" />
                                        <option value="Familiar" />
                                    </datalist>
                                    {createState?.errors?.relation && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{createState.errors.relation[0]}</span>
                                        </label>
                                    )}
                                </div>

                                <div>
                                    <label className="label" htmlFor="gender">
                                        <span className="label-text text-gray-light">Género</span>
                                    </label>
                                    <input
                                        id="gender"
                                        name="gender"
                                        list="genders"
                                        className="input input-bordered w-full text-gray-lighter"
                                        placeholder="Selecciona o escribe un género"
                                        required
                                    />
                                    <datalist id="genders">
                                        <option value="Hombre" />
                                        <option value="Mujer" />
                                        <option value="No binario" />
                                        <option value="Otro" />
                                    </datalist>
                                    {createState?.errors?.gender && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{createState.errors.gender[0]}</span>
                                        </label>
                                    )}
                                </div>

                                <div>
                                    <label className="label" htmlFor="communicationFrequency">
                                        <span className="label-text text-gray-light">Frecuencia de comunicación (opcional)</span>
                                    </label>
                                    <input
                                        id="communicationFrequency"
                                        name="communicationFrequency"
                                        type="text"
                                        placeholder="ej: Diaria, semanal"
                                        className="input w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label" htmlFor="communicationChannel">
                                        <span className="label-text text-gray-light">Canal de comunicación</span>
                                    </label>
                                    <input
                                        id="communicationChannel"
                                        name="communicationChannel"
                                        list="communicationChannels"
                                        className="input w-full"
                                        placeholder="Selecciona o escribe un canal"
                                        required
                                    />
                                    <datalist id="communicationChannels">
                                        <option value="WhatsApp" />
                                        <option value="Email" />
                                        <option value="Presencial" />
                                        <option value="Teléfono" />
                                        <option value="Videollamada" />
                                    </datalist>
                                    {createState?.errors?.communicationChannel && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{createState.errors.communicationChannel[0]}</span>
                                        </label>
                                    )}
                                </div>

                                <div>
                                    <label className="label" htmlFor="childrenInfo">
                                        <span className="label-text text-gray-light">Información importante que os vincula</span>
                                    </label>
                                    <textarea
                                        id="childrenInfo"
                                        name="childrenInfo"
                                        placeholder="ej: 2 hijos, 5 y 8 años"
                                        className="textarea w-full"
                                        required
                                    />
                                    {createState?.errors?.childrenInfo && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{createState.errors.childrenInfo[0]}</span>
                                        </label>
                                    )}
                                </div>

                                <div>
                                    <label className="label" htmlFor="legalStatus">
                                        <span className="label-text text-gray-light">Información legal relevante (opcional)</span>
                                    </label>
                                    <textarea
                                        id="legalStatus"
                                        name="legalStatus"
                                        placeholder="ej: Sentencia de custodia, orden de alejamiento"
                                        className="textarea w-full"
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Perfil
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {!showForm && (
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center p-8">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : profiles.length === 0 ? (
                            <div className="text-center py-12 space-y-4">
                                <p className="text-gray-light text-lg">No hay perfiles creados aún.</p>

                                <p className="text-gray-light">La información de perfil es esencial para que podamos ayudarte. Nos ayuda a comprender mejor tu situación para poderte dar la respuesta más adecuada a tu situación.</p>

                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="btn btn-primary "
                                >
                                    Crea un perfil para comenzar
                                </button>

                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profiles.map((profile) => (
                                    <div key={profile.id} className="card bg-base-200 border border-white/5 shadow-lg">
                                        <div className="card-body">
                                            <h3 className="card-title ">{profile.name}</h3>
                                            <p className="text-sm text-sky-blue">{profile.relation}</p>
                                            <div className="mt-2 text-xs text-gray-light space-y-1">
                                                {profile.communicationFrequency && <p>Frecuencia: {profile.communicationFrequency}</p>}
                                                {profile.communicationChannel && <p>Canal: {profile.communicationChannel}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
