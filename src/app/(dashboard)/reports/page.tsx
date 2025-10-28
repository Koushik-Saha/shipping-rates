'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('30days');

    // Mock data
    const servicesData = [
        { name: 'UPS', value: 45 },
        { name: 'USPS', value: 30 },
        { name: 'FedEx', value: 20 },
        { name: 'OnTrac', value: 5 },
    ];

    const zoneData = [
        { name: 'Zone 1', value: 120 },
        { name: 'Zone 2', value: 95 },
        { name: 'Zone 3', value: 88 },
        { name: 'Zone 4', value: 76 },
        { name: 'Zone 5', value: 65 },
        { name: 'Zone 6', value: 54 },
        { name: 'Zone 7', value: 45 },
        { name: 'Zone 8', value: 38 },
        { name: 'Zone 9', value: 28 },
    ];

    const costData = [
        { date: '10/1', cost: 450 },
        { date: '10/8', cost: 520 },
        { date: '10/15', cost: 480 },
        { date: '10/22', cost: 610 },
    ];

    const COLORS = ['#FF6B9D', '#FF85B3', '#FF99C1', '#FFADCE'];

    const StatCard = ({ title, value, subtitle }: any) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-2">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            {subtitle && <p className="text-blue-500 text-xs cursor-pointer hover:underline">{subtitle}</p>}
        </div>
    );

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Report</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">for</span>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="text-sm font-semibold text-blue-600 bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer"
                            >
                                <option value="7days">the last 7 days</option>
                                <option value="30days">the last 30 days</option>
                                <option value="90days">the last 90 days</option>
                            </select>
                        </div>
                    </div>

                    {/* Top Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <StatCard title="Pirate Ship saved you" value="0" subtitle="Total Savings vs Retail" />
                        <StatCard title="Pending Returns" value="0 labels - $0.00" subtitle="View Return Labels" />
                        <StatCard title="Pending Label Refunds" value="0 labels - $0.00" subtitle="View Refund History" />
                    </div>

                    {/* Second Row Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <StatCard title="Account Balance" value="$0.00" />
                        <StatCard title="Total Payments" value="$0.00" />
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {/* Total Shipping Costs */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Total Shipping Costs</p>
                            <p className="text-3xl font-bold text-gray-900 mb-4">$0.00</p>
                            <button className="text-blue-500 text-sm font-semibold hover:underline">
                                View Transactions
                            </button>
                        </div>

                        {/* Chart placeholder */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 col-span-2">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={costData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Second Charts Row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Carrier Adjustments</p>
                            <p className="text-3xl font-bold text-gray-900 mb-4">$0.00</p>
                            <button className="text-blue-500 text-sm font-semibold hover:underline">
                                View All Adjustments
                            </button>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <p className="text-gray-600 text-sm mb-4 font-semibold">Average Cost</p>
                                <p className="text-3xl font-bold text-gray-900">$0.00</p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div>
                                    <p className="text-gray-600 text-sm mb-4 font-semibold">Avg. Domestic</p>
                                    <p className="text-3xl font-bold text-gray-900 mb-4">$0.00</p>
                                    <button className="text-blue-500 text-sm font-semibold hover:underline">
                                        View Shipments
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="mb-4">
                                <p className="text-gray-600 text-sm mb-2 font-semibold">Avg. International</p>
                                <p className="text-3xl font-bold text-gray-900 mb-4">$0.00</p>
                                <button className="text-blue-500 text-sm font-semibold hover:underline">
                                    View Shipments
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <p className="text-gray-600 text-sm mb-4 font-semibold">New Shipments</p>
                                <p className="text-3xl font-bold text-gray-900 mb-4">0</p>
                                <button className="text-blue-500 text-sm font-semibold hover:underline">
                                    View New Shipments
                                </button>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <p className="text-gray-600 text-sm mb-4 font-semibold">Delivery Issues</p>
                                <p className="text-3xl font-bold text-gray-900 mb-4">0</p>
                                <button className="text-blue-500 text-sm font-semibold hover:underline">
                                    View Undeliverable Shipments
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* Services Pie Chart */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Services</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={servicesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {servicesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {servicesData.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                                        <span className="text-sm text-gray-700">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recipient Zones */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Recipient Zones</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={zoneData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Total Shipments Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                        <p className="text-gray-600 text-sm mb-4 font-semibold">Total Shipments</p>
                        <p className="text-3xl font-bold text-gray-900 mb-6">0</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={costData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip />
                                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <button className="text-blue-500 text-sm font-semibold hover:underline mt-4">
                            View All Shipments
                        </button>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Top States</p>
                            <div className="text-center text-gray-500 py-8">Map visualization would go here</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-600 text-sm mb-4 font-semibold">Top International Countries</p>
                            <div className="text-center text-gray-500 py-8">Map visualization would go here</div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <p className="text-gray-600 text-sm mb-4 font-semibold">Transaction History</p>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
                                Export
                            </button>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-gray-900 font-semibold">Date</th>
                                <th className="text-left py-3 px-4 text-gray-900 font-semibold">Type</th>
                                <th className="text-left py-3 px-4 text-gray-900 font-semibold">Description</th>
                                <th className="text-left py-3 px-4 text-gray-900 font-semibold">Total</th>
                                <th className="text-left py-3 px-4 text-gray-900 font-semibold">Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="text-center py-12 text-gray-500">
                                <td colSpan={5} className="py-12">No Results</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
