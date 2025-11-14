import React from 'react';

const ReportStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap';
    
    const statusStyles = {
        // Attendance
        'Present': 'bg-green-100 text-green-800',
        'Absent': 'bg-red-100 text-red-800',
        'Late': 'bg-yellow-100 text-yellow-800',
        // Session
        'Attended': 'bg-green-100 text-green-800',
        'Missed': 'bg-red-100 text-red-800',
        'Cancelled': 'bg-gray-100 text-gray-800',
        // Membership
        'Active': 'bg-green-100 text-green-800',
        'Expired': 'bg-red-100 text-red-800',
        'Pending Renewal': 'bg-yellow-100 text-yellow-800',
        // Default
        default: 'bg-gray-100 text-gray-800',
    };

    const style = statusStyles[status] || statusStyles.default;

    return (
        <span className={`${baseClasses} ${style}`}>
            {status}
        </span>
    );
};

export default ReportStatusBadge;
