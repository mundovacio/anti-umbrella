'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ProfilesPage() {
    const [profiles] = useState<unknown[]>([]);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-[var(--navy-dark)] p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-lighter">Perfiles</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-primary btn-circle"
                    >
                        <Plus size={24} />
                    </button>
                </div>

                {showForm && (
                    <div className="card bg-[var(--navy-medium)] shadow-xl mb-6">
                        <div className="card-body">
                            <h2 className="card-title text-gray-lighter">Nuevo Perfil del agresor/a</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Nombre</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ej: jefe, ex, etc."
                                        className="input input-bordered w-full bg-[var(--navy-dark)] text-gray-lighter"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Relación</span>
                                    </label>
                                    <select className="select select-bordered w-full bg-[var(--navy-dark)] text-gray-lighter">
                                        <option>Pareja</option>
                                        <option>Ex-pareja</option>
                                        <option>Padre/Madre</option>
                                        <option>Jefe</option>
                                        <option>Compañero de trabajo</option>
                                        <option>Otro</option> {/* TODO: si es otro, que aparezca un campo para introducir la relación*/}
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Género</span>
                                    </label>
                                    <select className="select select-bordered w-full bg-[var(--navy-dark)] text-gray-lighter">
                                        <option>Hombre</option>
                                        <option>Mujer</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Frecuencia de comunicación</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ej: Diaria, semanal"
                                        className="input input-bordered w-full bg-[var(--navy-dark)] text-gray-lighter"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Canal de comunicación</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ej: WhatsApp, Email, Presencial"
                                        className="input input-bordered w-full bg-[var(--navy-dark)] text-gray-lighter"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Información importante que os vincula</span>
                                    </label>
                                    <textarea
                                        placeholder="ej: 2 hijos, 5 y 8 años"
                                        className="textarea textarea-bordered w-full bg-[var(--navy-dark)] text-gray-lighter"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-light">Información legal relevante</span>
                                    </label>
                                    <textarea
                                        placeholder="ej: Sentencia de custodia, orden de alejamiento"
                                        className="textarea textarea-bordered w-full bg-[var(--navy-dark)] text-gray-lighter"
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

                {profiles.length === 0 && !showForm && (
                    <div className="text-center py-12">
                        <p className="text-gray-light text-lg">No hay perfiles creados aún.</p>
                        <p className="text-gray-light/60 mt-2">Crea un perfil para comenzar.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
