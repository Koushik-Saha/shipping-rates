'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Box, BarChart3, Cog, HelpCircle, LogOut, Users } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const links = [
        { href: '/ship', icon: Box, label: 'Ship' },
        { href: '/rates', icon: BarChart3, label: 'Rates' },
        { href: '/reports', icon: BarChart3, label: 'Reports' },
        { href: '/users', icon: Users, label: 'Users' },
        { href: '/settings', icon: Cog, label: 'Settings' },
        { href: '/support', icon: HelpCircle, label: 'Support' },
    ];

    return (
        <div className="w-48 bg-black min-h-screen p-4 flex flex-col">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black font-bold text-3xl">
                    ☠️
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname.includes(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-gray-800 text-white font-semibold'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-700 pt-4 space-y-2">
                {/* User Info */}
                {session?.user && (
                    <div className="px-4 py-2 text-gray-400 text-sm">
                        <div className="font-semibold text-white">{session.user.name || 'Captain'}</div>
                        <div className="truncate">{session.user.email}</div>
                    </div>
                )}
                
                {/* Logout Button */}
                <button 
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
