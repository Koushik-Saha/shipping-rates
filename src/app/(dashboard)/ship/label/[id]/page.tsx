'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Package, Download, Printer, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LabelSuccessPage({ params }: { params: { id: string } }) {
    const [labelUrl, setLabelUrl] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    useEffect(() => {
        // Fetch label details
        // This is a placeholder - implement actual API call
        setLabelUrl('/sample-label.pdf');
        setTrackingNumber('1Z999999999999999');
    }, [params.id]);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-green-900">Label Purchased Successfully!</h2>
                                <p className="text-green-700">Tracking Number: <span className="font-mono font-bold">{trackingNumber}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Label Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Label Actions</h3>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                <Download className="w-5 h-5" />
                                Download Label
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                                <Printer className="w-5 h-5" />
                                Print Label
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                                <Mail className="w-5 h-5" />
                                Email Label
                            </button>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
                        <ol className="space-y-3 text-gray-700">
                            <li className="flex gap-3">
                                <span className="font-bold">1.</span>
                                Print the label and attach it to your package
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">2.</span>
                                Drop off at a carrier location or schedule a pickup
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">3.</span>
                                Track your package with tracking number: {trackingNumber}
                            </li>
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                        <Link href="/ship/create" className="bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600">
                            Create Another Label
                        </Link>
                        <Link href="/ship" className="border border-gray-300 font-bold px-6 py-3 rounded-lg hover:bg-gray-50">
                            View All Shipments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
