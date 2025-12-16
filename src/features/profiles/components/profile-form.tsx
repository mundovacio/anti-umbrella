import React, { useState } from 'react';
import { createProfile } from '../actions/create-profile';
import { updateProfile } from '../actions/update-profile';
import { Profile, ProfileFormState } from '../types';
import { FormField } from './form-field';

interface ProfileFormProps {
    initialData?: Profile | null;
    onClose: () => void;
    onSuccess: () => void;
}

const LIMITS = {
    name: 50,
    relation: 50,
    gender: 50,
    communicationFrequency: 100,
    communicationChannel: 50,
    childrenInfo: 500,
    legalStatus: 500,
};

export function ProfileForm({ initialData, onClose, onSuccess }: ProfileFormProps) {
    const [createState, setCreateState] = useState<ProfileFormState | null>(null);

    return (
        <div className="card shadow-xl mb-6 bg-base-200 border border-white/5">
            <div className="card-body p-4">
                <h2 className="card-title ">
                    {initialData ? 'Editar Perfil' : 'Nuevo perfil del agresor/a'}
                </h2>

                <form
                    noValidate
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
                    <FormField
                        label="Nombre"
                        name="name"
                        defaultValue={initialData?.name}
                        placeholder="ej: jefe, ex, etc."
                        error={createState?.errors?.name}
                        maxLength={LIMITS.name}
                        required
                    />

                    <FormField
                        label="Relación"
                        name="relation"
                        defaultValue={initialData?.relation}
                        placeholder="Selecciona o escribe una relación"
                        options={[
                            "Pareja",
                            "Ex-pareja",
                            "Padre/Madre",
                            "Jefe",
                            "Compañero de trabajo",
                            "Amigo/a",
                            "Familiar"
                        ]}
                        error={createState?.errors?.relation}
                        maxLength={LIMITS.relation}
                        required
                    />

                    <FormField
                        label="Género"
                        name="gender"
                        defaultValue={initialData?.gender || ''}
                        placeholder="Selecciona o escribe un género"
                        options={[
                            "Hombre",
                            "Mujer",
                            "No binario",
                            "Otro"
                        ]}
                        error={createState?.errors?.gender}
                        maxLength={LIMITS.gender}
                        required
                    />

                    <FormField
                        label="Frecuencia de comunicación"
                        name="communicationFrequency"
                        defaultValue={initialData?.communicationFrequency || ''}
                        placeholder="ej: Diaria, semanal"
                        error={createState?.errors?.communicationFrequency}
                        maxLength={LIMITS.communicationFrequency}
                    />

                    <FormField
                        label="Canal de comunicación"
                        name="communicationChannel"
                        defaultValue={initialData?.communicationChannel || ''}
                        placeholder="Selecciona o escribe un canal"
                        options={[
                            "WhatsApp",
                            "Email",
                            "Presencial",
                            "Teléfono",
                            "Videollamada"
                        ]}
                        error={createState?.errors?.communicationChannel}
                        maxLength={LIMITS.communicationChannel}
                        required
                    />

                    <FormField
                        label="Información de vinculación (Hijos, bienes en común, etc.)"
                        name="childrenInfo"
                        defaultValue={initialData?.childrenInfo || ''}
                        placeholder="ej: 2 hijos, 5 y 8 años"
                        type="textarea"
                        error={createState?.errors?.childrenInfo}
                        maxLength={LIMITS.childrenInfo}
                        required
                    />

                    <FormField
                        label="Situación Legal"
                        name="legalStatus"
                        defaultValue={initialData?.legalStatus || ''}
                        placeholder="ej: Sentencia de custodia, orden de alejamiento"
                        type="textarea"
                        error={createState?.errors?.legalStatus}
                        maxLength={LIMITS.legalStatus}
                    />

                    <div className="card-actions justify-end mt-4">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {initialData ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>

                    {createState?.message && createState.message !== 'success' && (
                        <div className="alert alert-error mt-4">
                            <span>{createState.message}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
