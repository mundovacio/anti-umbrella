'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, History, MessageSquarePlus, Users, Settings } from 'lucide-react';

export const DockNav = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/user', icon: User, label: 'User' },
        { href: '/history', icon: History, label: 'History' },
        { href: '/new', icon: MessageSquarePlus, label: 'New' },
        { href: '/profiles', icon: Users, label: 'Profiles' },
        { href: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="dock dock-lg">
            {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={isActive ? "dock-active" : ""}
                    >
                        <Icon className="size-[1.2em]" />
                        <span className="dock-label">{label}</span>
                    </Link>
                );
            })}
        </div>
    );
};
