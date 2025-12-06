
'use client';

import React, { useState } from 'react';
import { Copy, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewConversationPage() {
    const [inputMessage, setInputMessage] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!inputMessage.trim()) return;

        setIsGenerating(true);
        setGeneratedReply('');

        try {
            const response = await fetch('/api/conversation/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    profileContext: undefined
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.details || 'Error al generar la respuesta');
            }

            const data = await response.json();
            setGeneratedReply(data.reply);
        } catch (error) {
            console.error('Error:', error);
            setGeneratedReply(
                'Lo siento, hubo un error al generar la respuesta. Por favor, intenta de nuevo.'
            );
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
    };

    return (
        <div className="min-h-screen p-4 pb-25 flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-8 pt-6">
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-semibold text-gray-lighter">Nueva Conversación</h1>
                    <p className="text-gray-400 text-sm">
                        Pega el mensaje difícil y deja que la IA te ayude a responder.
                    </p>
                </header>

                <div className="rounded-3xl p-6 space-y-6 shadow-2xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Mensaje Recibido</label>
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ej: 'Necesito que vengas a trabajar el sábado...'"
                            className="w-full h-40 bg-black/20 border border-white/10 rounded-2xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Perfil (Opcional)</label>
                        <div className="relative">
                            <select className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 appearance-none cursor-pointer">
                                <option>Selecciona un perfil...</option>
                                <option>Jefe Exigente</option>
                                <option>Cliente Molesto</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
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
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-ghost btn-sm btn-circle hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    title="Copiar respuesta"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                            <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                                    {generatedReply}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
