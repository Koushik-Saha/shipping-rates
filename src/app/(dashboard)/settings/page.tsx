'use client';

import { Sidebar } from '@/components/Sidebar';
import { ChevronRight } from 'lucide-react';

export default function SettingsPage() {
    const settingsSections = [
        {
            id: 'account',
            title: 'Account Settings',
            description: 'Update your login, password, 2FA, and email notification settings',
            icon: '⚙️',
            color: 'text-blue-500',
        },
        {
            id: 'general',
            title: 'General Settings',
            description: 'Adjust label settings and export file formats',
            icon: '📋',
            color: 'text-green-500',
        },
        {
            id: 'integrations',
            title: 'Integrations',
            description: 'Connect ecommerce platforms and synchronize orders',
            icon: '🔗',
            color: 'text-purple-500',
        },
        {
            id: 'payment',
            title: 'Payment Method',
            description: 'Choose how you\'ll pay for the postage',
            icon: '💳',
            color: 'text-orange-500',
        },
        {
            id: 'packages',
            title: 'Saved Packages',
            description: 'Create and modify your most commonly shipped packages',
            icon: '📦',
            color: 'text-red-500',
        },
        {
            id: 'addresses',
            title: 'Ship From Addresses',
            description: 'Set your physical and return addresses',
            icon: '🏠',
            color: 'text-cyan-500',
        },
        {
            id: 'emails',
            title: 'Tracking Emails',
            description: 'Create shipment notification emails to send to your recipients',
            icon: '✉️',
            color: 'text-pink-500',
        },
        {
            id: 'users',
            title: 'Manage Users',
            description: 'Invite your crewmates aboard your account',
            icon: '👥',
            color: 'text-indigo-500',
        },
    ];

    const SettingCard = ({ section }: any) => (
        <button
            className="w-full bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-md transition-all text-left group"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{section.icon}</span>
                        <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{section.description}</p>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors mt-1" size={24} />
            </div>
        </button>
    );

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
                        <div className="border-b-2 border-gray-200 mt-4"></div>
                    </div>

                    {/* Settings Grid */}
                    <div className="space-y-4">
                        {settingsSections.map((section) => (
                            <SettingCard key={section.id} section={section} />
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-700 mb-4">
                            For more information about settings and account management, visit our support center or contact our team.
                        </p>
                        <button className="text-blue-600 font-semibold hover:underline text-sm">
                            Visit Support Center →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
