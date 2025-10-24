import React from 'react';
import { Edit, Trash2, CalendarPlus, UserCheck } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const EnquiriesTable = ({ enquiries, onSchedule, onConvert, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Source</th>
                        <th scope="col" className="px-6 py-3">Assigned To</th>
                        <th scope="col" className="px-6 py-3">Status</th>
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
                            <td className="px-6 py-4">{enquiry.assignedTrainer}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={enquiry.status === 'Follow-up' ? 'Pending' : enquiry.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => onSchedule(enquiry)} title="Schedule Follow-up" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors">
                                        <CalendarPlus size={18} />
                                    </button>
                                     <button onClick={() => onConvert(enquiry)} title="Convert to Member" className="p-2 text-green-500 hover:bg-green-100 rounded-full transition-colors">
                                        <UserCheck size={18} />
                                    </button>
                                    <button onClick={() => onDelete(enquiry)} title="Delete Enquiry" className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {enquiries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No enquiries found.</p>
                </div>
            )}
        </div>
    );
};

export default EnquiriesTable;
