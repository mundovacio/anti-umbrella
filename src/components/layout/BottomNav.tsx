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
        <nav className="fixed bottom-0 left-0 right-0 glass-nav z-50 pb-safe">
            <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto px-4">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`group flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all duration-300 relative ${isActive
                                ? 'text-[var(--sky-blue)]'
                                : 'text-[var(--gray-light)] hover:text-[var(--sky-blue)]'
                                }`}
                        >
                            {/* Active Indicator Glow */}
                            {isActive && (
                                <div className="absolute top-0 w-12 h-0.5 bg-[var(--sky-blue)] rounded-b-full shadow-[0_0_10px_var(--sky-blue)] opacity-80" />
                            )}

                            <div className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-105'}`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
