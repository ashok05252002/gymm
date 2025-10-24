import React from 'react';

const StatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Blocked: 'bg-red-100 text-red-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
    };
    
    const dotClasses = {
        Active: 'bg-green-500',
        Inactive: 'bg-gray-400',
        Blocked: 'bg-red-500',
        'Pending': 'bg-yellow-400',
    }

    return (
        <span className={`${baseClasses} ${statusClasses[status] || statusClasses['Inactive']}`}>
            <span className={`h-2 w-2 mr-1.5 rounded-full ${dotClasses[status] || dotClasses['Inactive']}`}></span>
            {status}
        </span>
    );
};

export default StatusBadge;
