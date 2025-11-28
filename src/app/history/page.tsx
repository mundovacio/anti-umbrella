'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function HistoryPage() {
    const conversations = [
        // Mock data
        { id: 1, date: '2025-11-26', profile: 'Perfil 1', preview: 'Última conversación...' },
    ];

    return (
        <div className="bg-[var(--navy-dark)] p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-lighter mb-6">Historial</h1>

                {conversations.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageSquare size={48} className="mx-auto text-gray-light/40 mb-4" />
                        <p className="text-gray-light text-lg">No hay conversaciones guardadas.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {conversations.map((conv) => (
                            <div key={conv.id} className="card bg-[var(--navy-medium)] shadow-xl hover:border-sky-blue hover:border-2 transition-all cursor-pointer">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-lighter">{conv.profile}</h3>
                                            <p className="text-sm text-gray-light/60">{conv.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-light mt-2">{conv.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
