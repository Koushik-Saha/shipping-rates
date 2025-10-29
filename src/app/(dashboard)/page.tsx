'use client';

import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';

export default function HomePage() {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section */}
                    <div className="grid grid-cols-2 gap-8 mb-12 items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome aboard Pirate Ship! 🚀
                            </h1>
                            <p className="text-lg text-gray-700 mb-8">
                                You're the Captain now! Chart your course by creating your first shipping label or comparing rates.
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    href="/rates"
                                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors cursor-pointer inline-block"
                                >
                                    Create Your First Label
                                </Link>
                                <Link
                                    href="/rates"
                                    className="border-2 border-blue-500 text-blue-500 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer inline-block"
                                >
                                    Compare Rates
                                </Link>
                            </div>
                        </div>

                        {/* Video Placeholder */}
                        <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-2">▶️</div>
                                <p className="text-white font-semibold">Welcome Video</p>
                            </div>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">How does Pirate Ship work?</h2>
                        <div className="bg-black text-white rounded-lg p-8">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <div className="text-4xl mb-4">📦</div>
                                    <h3 className="text-xl font-bold mb-3">Step 1</h3>
                                    <h4 className="font-semibold mb-2">Input dimensions</h4>
                                    <p className="text-gray-300 text-sm">
                                        Measure and weigh your package to unlock the deepest discounts. A simple kitchen scale and a ruler will do the job.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-4xl mb-4">📦</div>
                                    <h3 className="text-xl font-bold mb-3">Step 2</h3>
                                    <h4 className="font-semibold mb-2">Compare rates, print label</h4>
                                    <p className="text-gray-300 text-sm">
                                        Enter package details, compare rates, print your label and stick it on your package.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-4xl mb-4">🗺️</div>
                                    <h3 className="text-xl font-bold mb-3">Step 3</h3>
                                    <h4 className="font-semibold mb-2">Drop off or schedule pick-up</h4>
                                    <p className="text-gray-300 text-sm">
                                        Schedule for USPS® or UPS® to pick up your package or hand it to them at a location nearby.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Batch shipping section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Batch shipping or ecommerce store? Find more here:</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {/* Import Orders */}
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Import your orders</h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    Connect your store to import orders. When you buy labels they will automatically be marked as shipped and receive tracking information.
                                </p>
                                <button className="text-blue-500 font-semibold hover:underline text-sm cursor-pointer">
                                    Connect your store
                                </button>
                            </div>

                            {/* Upload Spreadsheet */}
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">⬆️</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload a spreadsheet</h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    Buy shipping labels with any type of address spreadsheet no matter whether it's CSV, Excel or Open Office.
                                </p>
                                <button className="text-blue-500 font-semibold hover:underline text-sm cursor-pointer">
                                    Upload a spreadsheet
                                </button>
                            </div>

                            {/* Get Support */}
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">❓</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Need some help?</h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    Visit our support center to search for frequently asked questions, or to contact our crew for anything you need.
                                </p>
                                <button className="text-blue-500 font-semibold hover:underline text-sm cursor-pointer">
                                    Get support
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Talk like a pirate */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Talk like a pirate</h2>
                        <p className="text-center text-gray-600 mb-6">Splice the mainbrace and parlay like a pirate ☠️🎵</p>

                        <div className="flex justify-center gap-3 flex-wrap">
                            {[...Array(9)].map((_, i) => (
                                <button
                                    key={i}
                                    className="w-16 h-16 bg-gray-400 hover:bg-gray-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    ▶️
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
