'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FullPageLoader } from '@/components/LoadingSpinner';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Show welcome message if user just logged in
        const justLoggedIn = localStorage.getItem('justLoggedIn');
        if (justLoggedIn && session) {
            setShowWelcome(true);
            localStorage.removeItem('justLoggedIn');
            // Hide welcome message after 3 seconds
            setTimeout(() => setShowWelcome(false), 3000);
        }
    }, [session]);

    if (status === 'loading') {
        return <FullPageLoader text="Authenticating..." bgColor="bg-gray-50" />;
    }

    return (
        <>
            {/* Welcome Message */}
            {showWelcome && session && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2">
                        <span>🎉</span>
                        <span>Welcome back, {session.user?.name || 'Captain'}!</span>
                    </div>
                </div>
            )}
            
            {/* Dashboard Content */}
            {children}
        </>
    );
}
