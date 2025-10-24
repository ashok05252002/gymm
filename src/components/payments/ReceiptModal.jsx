import React from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import { Dumbbell, Printer, Mail } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, payment }) => {
    if (!payment) return null;

    const handlePrint = () => {
        toast.success('Printing receipt...');
        // window.print() would be used in a real app
    };
    
    const handleEmail = () => {
        toast.success(`Emailing receipt to ${payment.memberName}...`);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Payment Receipt">
            <div className="space-y-4">
                <div id="receipt-content" className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div className="flex justify-between items-center pb-4 border-b border-dashed">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-7 w-7 text-brand-red" />
                            <h1 className="text-xl font-display font-bold text-brand-dark">GymPro</h1>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">Receipt</p>
                            <p className="text-xs text-gray-500">{payment.id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                            <p className="text-gray-500">Billed To</p>
                            <p className="font-semibold text-gray-800">{payment.memberName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500">Date</p>
                            <p className="font-semibold text-gray-800">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <table className="w-full mt-6 text-sm">
                        <thead>
                            <tr className="border-b border-dashed">
                                <th className="text-left font-semibold py-2">Description</th>
                                <th className="text-right font-semibold py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2">{payment.planName} Membership</td>
                                <td className="text-right py-2">{payment.amount.toFixed(3)} OMR</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-dashed font-bold">
                                <td className="text-right py-2">Total Paid</td>
                                <td className="text-right py-2">{payment.amount.toFixed(3)} OMR</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="mt-4 text-sm">
                        <p><span className="font-semibold">Method:</span> {payment.method}</p>
                        {payment.transactionId && <p><span className="font-semibold">Transaction ID:</span> {payment.transactionId}</p>}
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-6">Thank you for your payment!</p>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button onClick={handleEmail} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Mail size={18} /> Email Receipt
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <Printer size={18} /> Print
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ReceiptModal;
