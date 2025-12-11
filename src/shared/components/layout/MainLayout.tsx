'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { drawerItems } from '@/config/navigation';
import { Menu, Zap } from 'lucide-react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const drawerCheckboxRef = React.useRef<HTMLInputElement>(null);

    const closeDrawer = () => {
        if (drawerCheckboxRef.current) {
            drawerCheckboxRef.current.checked = false;
        }
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={drawerCheckboxRef} />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar w-full bg-base-100/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <Menu className="w-6 h-6 text-gray-lighter" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold text-gray-lighter flex items-center gap-2">
                        Umbrella
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            {drawerItems.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={pathname === href ? 'active' : ''}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-none lg:hidden">
                        <Link href="/tips" className="btn btn-square btn-ghost">
                            <Zap className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
                {/* Page content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-16 space-y-2">
                    {/* Sidebar content here */}
                    {drawerItems.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={closeDrawer}
                                    className={`${isActive ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:text-white'} flex items-center gap-3 py-3`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-lg">{label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
