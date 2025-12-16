'use client';

import { useState, useEffect } from 'react';
import { Settings } from '@prisma/client';

interface Profile {
    id: string;
    name: string;
    relation: string;
}

export function useNewConversation() {
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

    useEffect(() => {
        // Load settings
        import('@/features/settings/actions/get-settings').then(async (mod) => {
            try {
                const userSettings = await mod.getSettings();
                console.log('Settings successfully loaded:', userSettings);
                setSettings(userSettings);

                if (userSettings) {
                    // Apply initial preferences
                    if (!userSettings.showGeneratedReply) {
                        setShowReply(false);
                    }
                    setShowOriginalText(userSettings.showOriginalText ?? true);

                    if (userSettings.inputType === 'textarea') {
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

        // Reset showReply state based on settings preferences
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
                const errorData = await response.json();
                throw new Error(errorData.details || 'Error al generar la respuesta');
            }

            const data = await response.json();
            const reply = data.reply?.trim();
            setGeneratedReply(reply);

            // Auto-save to history
            if (reply) {
                import('@/features/history/actions/save-conversation').then(async (mod) => {
                    await mod.saveConversation(inputMessage, reply, selectedProfileId || undefined);
                });
            }
        } catch (err) {
            console.error('Error:', err);
            setError(
                err instanceof Error ? err.message : 'Lo siento, hubo un error al generar la respuesta. Por favor, intenta de nuevo.'
            );
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
    };

    return {
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
    };
}
