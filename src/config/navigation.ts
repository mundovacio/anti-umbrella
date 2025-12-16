import { User, History, MessageSquarePlus, Users, Settings, Lightbulb } from 'lucide-react';

export const navItems = [
    { href: '/user', icon: User, label: 'Cuenta' },
    { href: '/history', icon: History, label: 'Historial' },
    { href: '/new', icon: MessageSquarePlus, label: 'Nuevo' },
    { href: '/profiles', icon: Users, label: 'Perfiles' },
    { href: '/settings', icon: Settings, label: 'Ajustes' },
];

export const drawerItems = [
    { href: '/new', icon: MessageSquarePlus, label: 'Nuevo' },
    { href: '/profiles', icon: Users, label: 'Perfiles' },
    { href: '/history', icon: History, label: 'Historial' },
    { href: '/user', icon: User, label: 'Cuenta' },
    { href: '/settings', icon: Settings, label: 'Ajustes' },
    { href: '/tips', icon: Lightbulb, label: 'Consejos & Ayuda' },
];
