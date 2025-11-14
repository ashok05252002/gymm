import React from 'react';
import { Search } from 'lucide-react';
import MultiSelectDropdown from '../shared/MultiSelectDropdown';

const ReportFilterBar = ({ filters, onFilterChange, onGenerate, reportType, trainers, members, plans }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (name, values) => {
        onFilterChange(prev => ({ ...prev, [name]: values }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(filters);
    };
    
    const statusOptionsMap = {
        attendance: [
            { value: 'Present', label: 'Present' },
            { value: 'Absent', label: 'Absent' },
            { value: 'Late', label: 'Late' },
        ],
        session_attendance: [
            { value: 'Attended', label: 'Attended' },
            { value: 'Missed', label: 'Missed' },
            { value: 'Cancelled', label: 'Cancelled' },
        ],
        membership_summary: [
            { value: 'Active', label: 'Active' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Pending Renewal', label: 'Pending Renewal' },
        ]
    };
    
    const trainerOptions = trainers ? trainers.map(t => ({ value: t.name, label: t.name })) : [];
    const planOptions = plans ? plans.map(p => ({ value: p.name, label: p.name })) : [];

    const renderSpecificFilters = () => {
        switch (reportType) {
            case 'attendance':
                return (
                    <>
                        <MultiSelectDropdown label="Status" options={statusOptionsMap.attendance} selected={filters.status} onChange={(values) => handleMultiSelectChange('status', values)} />
                        <MultiSelectDropdown label="Trainer" options={trainerOptions} selected={filters.trainer} onChange={(values) => handleMultiSelectChange('trainer', values)} />
                    </>
                );
            case 'session_attendance':
                 return (
                    <>
                        <MultiSelectDropdown label="Trainer" options={trainerOptions} selected={filters.trainer} onChange={(values) => handleMultiSelectChange('trainer', values)} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                            <select name="sessionType" value={filters.sessionType} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                <option value="All">All Types</option>
                                <option value="Personal">Personal</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                        <MultiSelectDropdown label="Status" options={statusOptionsMap.session_attendance} selected={filters.status} onChange={(values) => handleMultiSelectChange('status', values)} />
                    </>
                );
            case 'membership_summary':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                            <select name="membershipType" value={filters.membershipType} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                <option value="All">All Types</option>
                                {planOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                            </select>
                        </div>
                        <MultiSelectDropdown label="Status" options={statusOptionsMap.membership_summary} selected={filters.status} onChange={(values) => handleMultiSelectChange('status', values)} />
                        <MultiSelectDropdown label="Trainer" options={trainerOptions} selected={filters.trainer} onChange={(values) => handleMultiSelectChange('trainer', values)} />
                    </>
                );
            case 'payment_history':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                            <select name="membershipType" value={filters.membershipType} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                <option value="All">All Types</option>
                                {planOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                            </select>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* Common Filters */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="text" name="search" value={filters.search} onChange={handleInputChange} className="w-full pl-10 border-gray-300 rounded-md shadow-sm" placeholder="Search by name, ID..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    {/* Specific Filters */}
                    {renderSpecificFilters()}
                </div>
                <div className="pt-2 flex justify-end">
                    <button type="submit" className="bg-brand-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all shadow-md">
                        Generate Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReportFilterBar;
