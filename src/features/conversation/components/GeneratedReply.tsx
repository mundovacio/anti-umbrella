import React from 'react';
import { Copy, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from '@prisma/client';

interface GeneratedReplyProps {
    generatedReply: string;
    handleCopy: () => void;
    showReply: boolean;
    setShowReply: (show: boolean) => void;
    settings: Settings | null;
}

export function GeneratedReply({
    generatedReply,
    handleCopy,
    showReply,
    setShowReply,
    settings
}: GeneratedReplyProps) {
    return (
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
    );
}
