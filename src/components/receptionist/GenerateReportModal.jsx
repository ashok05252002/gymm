import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const reportTypes = [
    { value: 'enquiry_conversion', label: 'Enquiry Conversion' },
    { value: 'attendance_summary', label: 'Attendance Summary' },
    { value: 'session_usage', label: 'Session Usage' },
    { value: 'revenue_overview', label: 'Revenue Overview' },
];

const GenerateReportModal = ({ isOpen, onClose, trainers }) => {
    const getToday = () => new Date().toISOString().split('T')[0];
    const getOneMonthAgo = () => {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().split('T')[0];
    };

    const [filters, setFilters] = useState({
        reportType: 'enquiry_conversion',
        startDate: getOneMonthAgo(),
        endDate: getToday(),
        trainer: 'All',
        exportFormat: 'PDF',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Generating ${filters.exportFormat} report... (Mock Download)`);
        console.log("Report Filters:", filters);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Generate & Export Report">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Report Type (Category)</label>
                    <select name="reportType" value={filters.reportType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        {reportTypes.map(rt => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Trainer</label>
                    <select name="trainer" value={filters.trainer} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option value="All">All Trainers</option>
                        {trainers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Export Format</label>
                    <select name="exportFormat" value={filters.exportFormat} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>PDF</option>
                        <option>Excel</option>
                    </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Download Report</button>
                </div>
            </form>
        </Modal>
    );
};

export default GenerateReportModal;
