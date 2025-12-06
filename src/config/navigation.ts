import { User, History, MessageSquarePlus, Users, Settings, Lightbulb } from 'lucide-react';

export const navItems = [
    { href: '/user', icon: User, label: 'User' },
    { href: '/history', icon: History, label: 'History' },
    { href: '/new', icon: MessageSquarePlus, label: 'New' },
    { href: '/profiles', icon: Users, label: 'Profiles' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export const drawerItems = [
    ...navItems,
    { href: '/tips', icon: Lightbulb, label: 'Tips & Ayuda' },
];
