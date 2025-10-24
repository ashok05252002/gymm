import React from 'react';
import { Search } from 'lucide-react';

const UserToolbar = ({ filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    name="search"
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-2.5 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <select
                    name="role"
                    value={filters.role}
                    onChange={handleInputChange}
                    className="w-full md:w-40 px-4 py-2.5 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Member">Member</option>
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className="w-full md:w-40 px-4 py-2.5 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
};

export default UserToolbar;
