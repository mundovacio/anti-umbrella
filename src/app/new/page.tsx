
'use client';

import React, { useState } from 'react';
import { Copy, Send, Sparkles, Clipboard, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Settings {
    showOriginalText: boolean;
    showFriendlyTranslation: boolean;
    showGeneratedReply: boolean;
    denyAppointments: boolean;
    inputType: string;
    theme: string;
}

interface Profile {
    id: string;
    name: string;
    relation: string;
}

export default function NewConversationPage() {
    const [inputMessage, setInputMessage] = useState('');
    const [inputMode, setInputMode] = useState<'paste' | 'write'>('paste');
    const [generatedReply, setGeneratedReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [showOriginalText, setShowOriginalText] = useState(true);
    const [showReply, setShowReply] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfileId, setSelectedProfileId] = useState<string>('');
    const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        // Dynamic import to avoid server-side issues if any, though getSettings is a server action safe to call.
        import('@/features/settings/actions/get-settings').then(async (mod) => {
            try {
                const userSettings = await mod.getSettings();
                console.log('Settings successfully loaded:', userSettings);
                setSettings(userSettings as unknown as Settings);
                // If preference is to hide, start hidden
                if (userSettings && !userSettings.showGeneratedReply) {
                    setShowReply(false);
                }
                if (userSettings) {
                    setShowOriginalText(userSettings.showOriginalText ?? true);
                    // Safe access to inputType which might be missing in stale Prisma types
                    if ((userSettings as any).inputType === 'textarea') {
                        setInputMode('write');
                    }
                }
            } catch (e) {
                console.error("Failed to fetch settings", e);
            }
        });

        // Load profiles
        import('@/features/profiles/actions/get-profiles').then(async (mod) => {
            try {
                const userProfiles = await mod.getProfiles();
                setProfiles(userProfiles);
            } catch (e) {
                console.error("Failed to fetch profiles", e);
            } finally {
                setIsLoadingProfiles(false);
            }
        });
    }, []);

    const handleGenerate = async () => {
        if (!inputMessage.trim()) return;


        setIsGenerating(true);
        setGeneratedReply('');
        setError(null);

        // Reset showReply state based on settings for new generation? 
        // Or keep user's manual toggle? Let's reset to preference.
        if (settings && !settings.showGeneratedReply) {
            setShowReply(false);
        } else {
            setShowReply(true);
        }

        try {
            const response = await fetch('/api/conversation/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    profileContext: selectedProfileId
                        ? JSON.stringify(profiles.find(p => p.id === selectedProfileId))
                        : undefined
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.details || 'Error al generar la respuesta');
            }

            const data = await response.json();
            const reply = data.reply?.trim();
            setGeneratedReply(reply);

            // Auto-save to history
            if (reply) {
                // We need to import dynamically or use a separate function to avoid server action import issues in client component if strict
                import('@/features/history/actions/save-conversation').then(async (mod) => {
                    await mod.saveConversation(inputMessage, reply, selectedProfileId || undefined);
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setError(
                error instanceof Error ? error.message : 'Lo siento, hubo un error al generar la respuesta. Por favor, intenta de nuevo.'
            );
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
    };

    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold text-gray-lighter">Nueva Conversación</h1>
                    <p className="text-gray-400 text-sm">
                        Pega el mensaje difícil y deja que la IA te ayude a responder.
                    </p>
                </header>

                <div className="space-y-6">
                    <div className="space-y-2">
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

                            {/* <label className="text-sm font-medium text-gray-300 ml-1">Mensaje Recibido</label> */}

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

                                    {/* texto original - readonly */}
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
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-300 ml-1">De quién se trata</label>
                            <a href="/profiles" className="text-xs text-sky-blue hover:text-sky-300 transition-colors">
                                Gestionar perfiles
                            </a>
                        </div>
                        <div className="relative">
                            {isLoadingProfiles ? (
                                <div className="w-full h-12 bg-black/20 border border-white/10 rounded-xl animate-pulse" />
                            ) : profiles.length > 0 ? (
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
                            ) : (
                                <div className="p-4 border border-dashed border-white/10 rounded-xl bg-black/10 text-center space-y-3">
                                    <p className="text-sm text-gray-400">No tienes perfiles guardados</p>
                                    <a href="/profiles" className="btn btn-sm btn-outline btn-info">
                                        <Plus size={16} />
                                        Crear Nuevo Perfil
                                    </a>
                                </div>
                            )}
                            {profiles.length > 0 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!inputMessage || isGenerating}
                        className="w-full btn border-none text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12 shadow-lg shadow-sky-blue/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isGenerating ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <div className="flex items-center justify-center gap-2 font-medium">
                                <Sparkles size={18} />
                                <span>Generar Respuesta</span>
                            </div>
                        )}
                    </button>
                    {error && (
                        <div className="alert alert-error text-sm shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {generatedReply && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="rounded-3xl p-6 border border-sky-blue/30 shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-semibold text-sky-blue flex items-center gap-2">
                                    <Send size={18} />
                                    Respuesta Sugerida
                                </h2>
                                <div className="flex gap-2">
                                    {settings && !settings.showGeneratedReply && (
                                        <button
                                            onClick={() => setShowReply(!showReply)}
                                            className="btn btn-ghost btn-sm text-xs"
                                        >
                                            {showReply ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    )}
                                    <button
                                        onClick={handleCopy}
                                        className="btn btn-ghost btn-sm btn-circle hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                        title="Copiar respuesta"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className={`bg-black/20 rounded-2xl p-4 border border-white/5 relative overflow-hidden transition-all duration-300 ${!showReply ? 'h-24' : ''}`}>
                                <p className={`text-gray-200 whitespace-pre-wrap leading-relaxed transition-all duration-300 ${!showReply ? 'blur-md select-none' : ''}`}>
                                    {generatedReply}
                                </p>
                                {!showReply && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => setShowReply(true)}
                                            className="btn btn-sm btn-outline btn-info bg-black/50 backdrop-blur-sm"
                                        >
                                            Ver Respuesta
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
