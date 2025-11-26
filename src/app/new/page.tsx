'use client';

import React, { useState } from 'react';
import { Copy, Send } from 'lucide-react';

export default function NewConversationPage() {
    const [inputMessage, setInputMessage] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        // TODO: Integrate with Groq API
        setTimeout(() => {
            setGeneratedReply('Esta es una respuesta generada de ejemplo. Aquí se integrará la API de Groq.');
            setIsGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
    };

    return (
        <div className="min-h-screen bg-[var(--navy-dark)] p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-semibold text-gray-lighter">Nueva Conversación</h1>

                <div className="card bg-[var(--navy-medium)] shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-gray-lighter">Mensaje Recibido</h2>
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Pega aquí el mensaje que recibiste..."
                            className="textarea textarea-bordered w-full h-32 bg-[var(--navy-dark)] text-gray-lighter"
                        />
                    </div>
                </div>

                <div className="card bg-[var(--navy-medium)] shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-gray-lighter">Seleccionar Perfil</h2>
                        <select className="select select-bordered w-full bg-[var(--navy-dark)] text-gray-lighter">
                            <option>Selecciona un perfil...</option>
                            <option>Perfil 1</option>
                            <option>Perfil 2</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!inputMessage || isGenerating}
                    className="btn btn-primary w-full btn-lg"
                >
                    {isGenerating ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <>
                            <Send size={20} />
                            Generar Respuesta
                        </>
                    )}
                </button>

                {generatedReply && (
                    <div className="card bg-[var(--navy-medium)] shadow-xl border-2 border-sky-blue">
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title text-gray-lighter">Respuesta Sugerida</h2>
                                <button onClick={handleCopy} className="btn btn-ghost btn-sm">
                                    <Copy size={18} />
                                    Copiar
                                </button>
                            </div>
                            <p className="text-gray-light whitespace-pre-wrap">{generatedReply}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
