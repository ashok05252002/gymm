import React from 'react';
import { XCircle } from 'lucide-react';

const SessionStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Confirmed: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const SessionsTable = ({ sessions, onCancel }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Member</th>
                        <th scope="col" className="px-6 py-3">Trainer</th>
                        <th scope="col" className="px-6 py-3">Date & Time</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        {onCancel && <th scope="col" className="px-6 py-3 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(session => (
                        <tr key={session.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{session.memberName}</td>
                            <td className="px-6 py-4">{session.trainerName}</td>
                            <td className="px-6 py-4">{new Date(session.dateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">{session.sessionType}</td>
                            <td className="px-6 py-4">
                                <SessionStatusBadge status={session.status} />
                            </td>
                            {onCancel && (
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => onCancel(session)} title="Cancel Session" className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors">
                                        <XCircle size={18} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sessions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No sessions found.</p>
                </div>
            )}
        </div>
    );
};

export default SessionsTable;
