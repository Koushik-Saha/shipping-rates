'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    company?: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'Koushik Saha',
            email: 'koushik@example.com',
            phone: '+1-234-567-8900',
            address: '274 S La Fayette Park Pl',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90057',
            company: 'Pirate Ship',
            createdAt: '2024-01-15',
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: 'CA',
        zip: '',
        company: '',
    });

    const handleOpenForm = (user?: User) => {
        if (user) {
            setFormData(user);
            setEditingId(user.id);
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: 'CA',
                zip: '',
                company: '',
            });
            setEditingId(null);
        }
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Update
            setUsers(
                users.map((user) =>
                    user.id === editingId
                        ? { ...user, ...formData }
                        : user
                )
            );
        } else {
            // Create
            const newUser: User = {
                id: Date.now().toString(),
                ...formData as Omit<User, 'id'>,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setUsers([...users, newUser]);
        }

        handleCloseForm();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                            <p className="text-gray-600 mt-2">Manage all user accounts and details</p>
                        </div>
                        <button
                            onClick={() => handleOpenForm()}
                            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer"
                        >
                            <Plus size={20} />
                            Add New User
                        </button>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Name</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Email</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Phone</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">City</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Company</th>
                                    <th className="text-left py-4 px-6 text-gray-900 font-semibold">Created</th>
                                    <th className="text-center py-4 px-6 text-gray-900 font-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-gray-900 font-semibold">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.email}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.phone}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.city}</td>
                                        <td className="py-4 px-6 text-gray-700">{user.company || '-'}</td>
                                        <td className="py-4 px-6 text-gray-700 text-sm">{user.createdAt}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenForm(user)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {users.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">No users found</p>
                                <button
                                    onClick={() => handleOpenForm()}
                                    className="text-blue-500 font-semibold hover:underline"
                                >
                                    Add your first user
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingId ? 'Edit User' : 'Add New User'}
                                    </h2>
                                    <button
                                        onClick={handleCloseForm}
                                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter full name"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="user@example.com"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+1-234-567-8900"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Company (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company || ''}
                                                onChange={handleInputChange}
                                                placeholder="Company name"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address || ''}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Street address"
                                            className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="City"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="State"
                                                maxLength={2}
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={formData.zip || ''}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="ZIP code"
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex gap-3 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={handleCloseForm}
                                            className="flex-1 border-2 border-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                        >
                                            {editingId ? 'Update User' : 'Create User'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
