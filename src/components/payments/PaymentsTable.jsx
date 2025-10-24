import React from 'react';
import { Eye } from 'lucide-react';

const PaymentStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Failed: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const PaymentsTable = ({ payments, onViewReceipt }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Payment ID</th>
                        <th scope="col" className="px-6 py-3">Member</th>
                        <th scope="col" className="px-6 py-3">Plan</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Method</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-gray-700">{payment.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{payment.memberName}</td>
                            <td className="px-6 py-4">{payment.planName}</td>
                            <td className="px-6 py-4 font-semibold">{payment.amount.toFixed(3)} OMR</td>
                            <td className="px-6 py-4">{payment.method}</td>
                            <td className="px-6 py-4">{new Date(payment.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4"><PaymentStatusBadge status={payment.status} /></td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => onViewReceipt(payment)} title="View Receipt" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors">
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {payments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No payments found.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentsTable;
