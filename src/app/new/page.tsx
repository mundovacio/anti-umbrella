'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNewConversation } from '@/features/conversation/hooks/use-new-conversation';
import { ConversationInput } from '@/features/conversation/components/ConversationInput';
import { ProfileSelector } from '@/features/profiles/components/ProfileSelector';
import { GeneratedReply } from '@/features/conversation/components/GeneratedReply';

export default function NewConversationPage() {
    const {
        inputMessage,
        setInputMessage,
        inputMode,
        setInputMode,
        generatedReply,
        isGenerating,
        settings,
        showOriginalText,
        setShowOriginalText,
        showReply,
        setShowReply,
        profiles,
        selectedProfileId,
        setSelectedProfileId,
        isLoadingProfiles,
        error,
        handleGenerate,
        handleCopy
    } = useNewConversation();

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
                        <ConversationInput
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            showOriginalText={showOriginalText}
                            setShowOriginalText={setShowOriginalText}
                        />
                    </div>

                    <ProfileSelector
                        profiles={profiles}
                        selectedProfileId={selectedProfileId}
                        setSelectedProfileId={setSelectedProfileId}
                        isLoading={isLoadingProfiles}
                    />

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

                <GeneratedReply
                    generatedReply={generatedReply}
                    handleCopy={handleCopy}
                    showReply={showReply}
                    setShowReply={setShowReply}
                    settings={settings}
                />
            </div>
        </div>
    );
}
