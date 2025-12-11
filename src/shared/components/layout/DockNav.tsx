'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/navigation';

export const DockNav = () => {
    const pathname = usePathname();

    return (
        <div className="dock dock-lg lg:hidden bg-base-100/70 backdrop-blur-md border-t border-white/10">
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
