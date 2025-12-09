'use client';

import React, { useState } from 'react';
import { updateProfile } from '../actions/update-profile';
import { createProfile } from '../actions/create-profile';
import { Profile, ProfileFormState } from '../types';

interface ProfileFormProps {
    initialData?: Profile | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function ProfileForm({ initialData, onClose, onSuccess }: ProfileFormProps) {
    const [createState, setCreateState] = useState<ProfileFormState | null>(null);

    return (
        <div className="card shadow-xl mb-6">
            <div className="card-body">
                <h2 className="card-title ">
                    {initialData ? 'Editar Perfil' : 'Nuevo perfil del agresor/a'}
                </h2>

                <form
                    action={async (formData) => {
                        let result;
                        if (initialData) {
                            result = await updateProfile(initialData.id, null, formData);
                        } else {
                            result = await createProfile(null, formData);
                        }

                        setCreateState(result);
                        if (result?.message === 'success') {
                            onSuccess();
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
                            defaultValue={initialData?.name}
                            placeholder="ej: jefe, ex, etc."
                            className="input input-bordered w-full"
                            required
                        />
                        {createState?.errors?.name && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    {createState.errors.name[0]}
                                </span>
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
                            defaultValue={initialData?.relation}
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
                                <span className="label-text-alt text-error">
                                    {createState.errors.relation[0]}
                                </span>
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
                            defaultValue={initialData?.gender || ''}
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
                                <span className="label-text-alt text-error">
                                    {createState.errors.gender[0]}
                                </span>
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="label" htmlFor="communicationFrequency">
                            <span className="label-text text-gray-light">
                                Frecuencia de comunicación (opcional)
                            </span>
                        </label>
                        <input
                            id="communicationFrequency"
                            name="communicationFrequency"
                            type="text"
                            defaultValue={initialData?.communicationFrequency || ''}
                            placeholder="ej: Diaria, semanal"
                            className="input w-full"
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="communicationChannel">
                            <span className="label-text text-gray-light">
                                Canal de comunicación
                            </span>
                        </label>
                        <input
                            id="communicationChannel"
                            name="communicationChannel"
                            list="communicationChannels"
                            defaultValue={initialData?.communicationChannel || ''}
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
                                <span className="label-text-alt text-error">
                                    {createState.errors.communicationChannel[0]}
                                </span>
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="label" htmlFor="childrenInfo">
                            <span className="label-text text-gray-light">
                                Información importante que os vincula
                            </span>
                        </label>
                        <textarea
                            id="childrenInfo"
                            name="childrenInfo"
                            defaultValue={initialData?.childrenInfo || ''}
                            placeholder="ej: 2 hijos, 5 y 8 años"
                            className="textarea w-full"
                            required
                        />
                        {createState?.errors?.childrenInfo && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    {createState.errors.childrenInfo[0]}
                                </span>
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="label" htmlFor="legalStatus">
                            <span className="label-text text-gray-light">
                                Información legal relevante (opcional)
                            </span>
                        </label>
                        <textarea
                            id="legalStatus"
                            name="legalStatus"
                            defaultValue={initialData?.legalStatus || ''}
                            placeholder="ej: Sentencia de custodia, orden de alejamiento"
                            className="textarea w-full"
                        />
                    </div>

                    <div className="card-actions justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar Perfil
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
