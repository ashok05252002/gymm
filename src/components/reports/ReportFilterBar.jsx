import React from 'react';

const reportOptions = [
    { value: 'attendance_overview', label: 'Attendance Overview' },
    { value: 'trainer_efficiency', label: 'Trainer Efficiency' },
    { value: 'plan_comparisons', label: 'Plan Comparisons' },
    { value: 'revenue_trend', label: 'Revenue Trend' },
];

const ReportFilterBar = ({ filters, onFilterChange, onGenerate }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(filters);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
                <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select
                        name="reportType"
                        value={filters.reportType}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"
                    >
                        {reportOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"
                    />
                </div>
                
                <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"
                    />
                </div>
                
                <div className="flex-shrink-0">
                    <button
                        type="submit"
                        className="w-full bg-brand-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all shadow-md"
                    >
                        Generate Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReportFilterBar;
