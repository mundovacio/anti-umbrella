import React from 'react';
import { Clipboard } from 'lucide-react';

interface ConversationInputProps {
    inputMode: 'paste' | 'write';
    setInputMode: (mode: 'paste' | 'write') => void;
    inputMessage: string;
    setInputMessage: (message: string) => void;
    showOriginalText: boolean;
    setShowOriginalText: (show: boolean) => void;
}

export function ConversationInput({
    inputMode,
    setInputMode,
    inputMessage,
    setInputMessage,
    showOriginalText,
    setShowOriginalText
}: ConversationInputProps) {
    return (
        <div className="space-y-4">
            <div className="tabs tabs-box">
                <input
                    type="radio"
                    name="input_type"
                    onClick={() => setInputMode('paste')}
                    checked={inputMode === 'paste'}
                    onChange={() => setInputMode('paste')}
                    className="tab flex-1"
                    aria-label="Botón de Pegar"
                />
                <input
                    type="radio"
                    name="input_type"
                    onClick={() => setInputMode('write')}
                    checked={inputMode === 'write'}
                    onChange={() => setInputMode('write')}
                    className="tab flex-1"
                    aria-label="Escribir texto"
                />
            </div>

            {inputMode === 'paste' ? (
                <div className="space-y-2">
                    <div className="w-full h-35 bg-black/20 border border-white/10 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-4 group hover:border-sky-blue/30 transition-all">
                        {inputMessage ? (
                            <div className="text-center w-full h-full flex flex-col items-center justify-center">
                                <p className="text-sm text-gray-400 mb-2">Mensaje pegado ({inputMessage.length} caracteres)</p>
                                <button
                                    onClick={() => setInputMessage('')}
                                    className="btn btn-sm btn-ghost text-red-400 hover:bg-red-400/10"
                                >
                                    Borrar y pegar otro
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        setInputMessage(text);
                                    } catch (err) {
                                        console.error('Failed to read clipboard', err);
                                        alert('No se pudo leer el portapapeles. Por favor, pega el texto manualmente activando la opción "Mostrar texto original" en ajustes.');
                                    }
                                }}
                                className="btn btn-primary btn-outline gap-2"
                            >
                                <Clipboard size={18} />
                                Pegar conversación
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOriginalText}
                            onChange={(e) => setShowOriginalText(e.target.checked)}
                            className="toggle toggle-primary"
                        />
                        <label className="text-sm text-gray-300">Mostrar texto original</label>
                    </div>

                    {(showOriginalText && inputMessage) && (
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ej: 'Necesito que vengas a trabajar el sábado...'"
                            readOnly
                            className="w-full h-40 bg-black/20 border border-white/10 rounded-2xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 focus:border-transparent transition-all resize-none"
                        />
                    )}
                </div>
            ) : (
                <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe aquí el mensaje difícil..."
                    className="w-full h-60 bg-black/20 border border-white/10 rounded-2xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 focus:border-transparent transition-all resize-none"
                />
            )}
        </div>
    );
}
