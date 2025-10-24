import React from 'react';
import { CalendarPlus } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const FollowUpBadge = ({ date }) => {
    if (!date) return null;

    const today = new Date();
    const followUpDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    followUpDate.setHours(0, 0, 0, 0);

    let badgeClass = 'bg-gray-100 text-gray-800';
    let text = `Due ${followUpDate.toLocaleDateString()}`;

    if (followUpDate < today) {
        badgeClass = 'bg-red-100 text-red-800';
        text = 'Overdue';
    } else if (followUpDate.getTime() === today.getTime()) {
        badgeClass = 'bg-yellow-100 text-yellow-800';
        text = 'Due Today';
    }

    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeClass}`}>{text}</span>;
};

const FollowUpTable = ({ enquiries, onSchedule }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Source</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Next Follow-Up</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map(enquiry => (
                        <tr key={enquiry.id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div>
                                    <div className="font-bold">{enquiry.name}</div>
                                    <div className="text-gray-500">{enquiry.contact}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{enquiry.source}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={enquiry.status === 'Follow-up' ? 'Pending' : enquiry.status} />
                            </td>
                            <td className="px-6 py-4">
                                <FollowUpBadge date={enquiry.nextFollowUp} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => onSchedule(enquiry)} title="Schedule Follow-up" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors">
                                    <CalendarPlus size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {enquiries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No enquiries requiring follow-up.</p>
                </div>
            )}
        </div>
    );
};

export default FollowUpTable;
