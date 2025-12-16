'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, MessageSquare, User, Calendar, Search, Filter, Eye, EyeOff, Layers, ChevronDown, ChevronRight, X } from 'lucide-react';
import { getConversations } from '@/features/history/actions/get-conversations';
import { deleteConversation } from '@/features/history/actions/delete-conversation';
import { getProfiles } from '@/features/profiles/actions/get-profiles';

type Conversation = {
    id: string;
    createdAt: Date;
    profile?: {
        id: string;
        name: string;
        relation: string;
    };
    messages: {
        role: string;
        content: string;
    }[];
};

type Profile = {
    id: string;
    name: string;
    relation: string;
};

type GroupingMode = 'none' | 'profile' | 'date' | 'profile_date';

export default function HistoryPage() {
    // Data State
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState<string>('all');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

    // View State
    const [grouping, setGrouping] = useState<GroupingMode>('none');
    const [showOriginal, setShowOriginal] = useState(true);
    const [showReply, setShowReply] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [convs, profs] = await Promise.all([
                    getConversations(),
                    getProfiles()
                ]);
                setConversations(convs as any);
                setProfiles(profs as any);
                // Expand all groups by default could be done here if we calculated groups first
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta conversación?')) return;

        try {
            await deleteConversation(id);
            setConversations(conversations.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete conversation:', error);
            alert('Error al eliminar la conversación');
        }
    };

    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    // --- Filtering Logic ---
    const filteredConversations = useMemo(() => {
        return conversations.filter(conv => {
            // Search
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm ||
                conv.messages.some(m => m.content.toLowerCase().includes(searchLower)) ||
                conv.profile?.name.toLowerCase().includes(searchLower);

            // Profile
            const matchesProfile = selectedProfileId === 'all' || conv.profile?.id === selectedProfileId;

            // Date
            const convDate = new Date(conv.createdAt);
            const matchesDateStart = !dateRange.start || convDate >= new Date(dateRange.start);
            const matchesDateEnd = !dateRange.end || convDate <= new Date(new Date(dateRange.end).setHours(23, 59, 59));

            return matchesSearch && matchesProfile && matchesDateStart && matchesDateEnd;
        });
    }, [conversations, searchTerm, selectedProfileId, dateRange]);

    // --- Grouping Logic ---
    const groupedData = useMemo(() => {
        if (grouping === 'none') return { 'Todas': filteredConversations };

        const groups: Record<string, Conversation[]> = {};

        filteredConversations.forEach(conv => {
            let key = '';

            if (grouping === 'profile') {
                key = conv.profile?.name ? `${conv.profile.name} (${conv.profile.relation})` : 'Sin perfil';
            } else if (grouping === 'date') {
                key = new Date(conv.createdAt).toLocaleDateString();
            } else if (grouping === 'profile_date') {
                const profileName = conv.profile?.name || 'Sin perfil';
                const date = new Date(conv.createdAt).toLocaleDateString();
                key = `${profileName} - ${date}`;
            }

            if (!groups[key]) groups[key] = [];
            groups[key].push(conv);
        });

        return groups;
    }, [filteredConversations, grouping]);


    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto space-y-6">
                <header>
                    <h1 className="text-3xl font-semibold ">Historial</h1>
                    <p className="text-gray-400 text-sm mt-1">Gestiona y consulta tus conversaciones pasadas</p>
                </header>

                {/* --- Filters & Controls Bar --- */}
                <div className="bg-base-200 p-4 rounded-2xl border border-white/5 space-y-4">

                    {/* Top Row: Search & Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar en conversaciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input w-full pl-10"
                            />
                        </div>

                        <select
                            className="select w-full md:w-48"
                            value={selectedProfileId}
                            onChange={(e) => setSelectedProfileId(e.target.value)}
                        >
                            <option value="all">Todos los perfiles</option>
                            {profiles.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>

                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                className="input w-full md:w-auto text-sm" // Added text-sm specifically for date inputs in some browsers
                                value={dateRange.start}
                                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="date"
                                className="input w-full md:w-auto text-sm"
                                value={dateRange.end}
                                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Grouping & Visibility */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                            <span className="text-sm text-gray-400 flex items-center gap-1"><Layers size={14} /> Agrupar:</span>
                            <div className="join">
                                <button
                                    className={`join-item btn btn-sm ${grouping === 'none' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setGrouping('none')}
                                >None</button>
                                <button
                                    className={`join-item btn btn-sm ${grouping === 'profile' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setGrouping('profile')}
                                >Perfil</button>
                                <button
                                    className={`join-item btn btn-sm ${grouping === 'date' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setGrouping('date')}
                                >Fecha</button>
                                <button
                                    className={`join-item btn btn-sm ${grouping === 'profile_date' ? 'btn-active btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setGrouping('profile_date')}
                                >Ambos</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowOriginal(!showOriginal)}
                                className={`btn btn-sm gap-2 ${showOriginal ? 'btn-outline' : 'btn-ghost text-gray-500'}`}
                            >
                                {showOriginal ? <Eye size={14} /> : <EyeOff size={14} />} Original
                            </button>
                            <button
                                onClick={() => setShowReply(!showReply)}
                                className={`btn btn-sm gap-2 ${showReply ? 'btn-outline' : 'btn-ghost text-gray-500'}`}
                            >
                                {showReply ? <Eye size={14} /> : <EyeOff size={14} />} Respuesta
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Content List --- */}
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : filteredConversations.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-light text-lg">No se encontraron conversaciones.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedProfileId('all');
                                setDateRange({ start: '', end: '' });
                            }}
                            className="btn btn-link text-sky-blue"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupedData).map(([groupTitle, groupConvs]) => {
                            const isGrouped = grouping !== 'none';
                            const isExpanded = expandedGroups[groupTitle] ?? true; // Default open

                            return (
                                <div key={groupTitle} className="space-y-2">
                                    {isGrouped && (
                                        <button
                                            onClick={() => toggleGroup(groupTitle)}
                                            className="flex items-center gap-2 text-lg font-medium text-sky-blue w-full hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                            {groupTitle}
                                            <span className="text-sm font-normal text-gray-500 ml-2">({groupConvs.length})</span>
                                        </button>
                                    )}

                                    {(!isGrouped || isExpanded) && (
                                        <div className={`space-y-3 ${isGrouped ? 'pl-4' : ''}`}>
                                            {groupConvs.map((conversation) => {
                                                const userMsg = conversation.messages.find(m => m.role === 'user')?.content || '';
                                                const aiMsg = conversation.messages.find(m => m.role === 'assistant')?.content || '';

                                                return (
                                                    <div key={conversation.id} className="card bg-base-200 border border-white/5 shadow-lg group hover:border-sky-blue/20 transition-all">
                                                        <div className="card-body p-5">
                                                            <div className="flex justify-between items-center mb-3">
                                                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar size={14} />
                                                                        <span>{new Date(conversation.createdAt).toLocaleDateString()}</span>
                                                                    </div>
                                                                    {conversation.profile && grouping !== 'profile' && grouping !== 'profile_date' && (
                                                                        <div className="flex items-center gap-1 text-sky-blue">
                                                                            <User size={14} />
                                                                            <span>{conversation.profile.name}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleDelete(conversation.id)}
                                                                    className="btn btn-ghost btn-xs btn-circle text-error"
                                                                    title="Eliminar conversación"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>

                                                            <div className="space-y-3">
                                                                {showOriginal && (
                                                                    <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                                                        <p className="text-sm text-gray-300 line-clamp-2 italic">"{userMsg}"</p>
                                                                    </div>
                                                                )}

                                                                {showReply && (
                                                                    <div className="pl-4 border-l-2 border-sky-blue/30">
                                                                        <p className="text-white text-sm whitespace-pre-wrap line-clamp-3 hover:line-clamp-none transition-all cursor-default">{aiMsg}</p>
                                                                    </div>
                                                                )}

                                                                {!showOriginal && !showReply && (
                                                                    <p className="text-xs text-gray-500 italic">Contenido oculto</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
