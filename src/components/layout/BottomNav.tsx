'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, History, MessageSquarePlus, Users, Settings } from 'lucide-react';

export const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/user', icon: User, label: 'User' },
        { href: '/history', icon: History, label: 'History' },
        { href: '/new', icon: MessageSquarePlus, label: 'New' },
        { href: '/profiles', icon: Users, label: 'Profiles' },
        { href: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[var(--navy-medium)] border-t border-[var(--navy-light)] z-50">
            <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors ${isActive
                                    ? 'text-[var(--sky-blue)]'
                                    : 'text-[var(--gray-light)] hover:text-[var(--sky-blue)]'
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
