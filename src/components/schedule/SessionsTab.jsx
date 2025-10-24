import React from 'react';
import SessionsTable from './SessionsTable';

const SessionsTab = ({ sessions, onCancel }) => {
    const type = onCancel ? 'Active' : 'Cancelled';
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{type} Sessions</h3>
            <SessionsTable sessions={sessions} onCancel={onCancel} />
        </div>
    );
};

export default SessionsTab;
