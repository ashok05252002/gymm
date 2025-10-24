import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const ConvertModal = ({ isOpen, onClose, onSave, enquiry, plans }) => {
    const [planId, setPlanId] = useState('');
    const [accessType, setAccessType] = useState('RFID');
    const [paymentAmount, setPaymentAmount] = useState(0);

    useEffect(() => {
        if (isOpen && plans.length > 0) {
            const activePlans = plans.filter(p => p.status === 'Active');
            const initialPlan = activePlans[0];
            setPlanId(initialPlan?.id || '');
            setPaymentAmount(initialPlan?.price || 0);
        }
    }, [isOpen, plans]);
    
    useEffect(() => {
        const selectedPlan = plans.find(p => p.id === planId);
        if (selectedPlan) {
            setPaymentAmount(selectedPlan.price);
        }
    }, [planId, plans]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!planId || paymentAmount < 0) {
            toast.error('Please select a plan and enter a valid payment amount.');
            return;
        }
        onSave({
            planId,
            accessType,
            paymentAmount,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Convert ${enquiry?.name} to Member`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p><span className="font-semibold">Name:</span> {enquiry?.name}</p>
                    <p><span className="font-semibold">Contact:</span> {enquiry?.contact}</p>
                    <p><span className="font-semibold">Interested In:</span> {enquiry?.programs.join(', ')}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Selection</label>
                    <select value={planId} onChange={(e) => setPlanId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required>
                        {plans.filter(p => p.status === 'Active').map(p => (
                            <option key={p.id} value={p.id}>{p.name} - {p.price.toFixed(3)} OMR</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Issue Access Type</label>
                        <select value={accessType} onChange={(e) => setAccessType(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                            <option>RFID Card</option>
                            <option>QR Code</option>
                            <option>App Access</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Payment (OMR)</label>
                        <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} min="0" step="0.001" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-600">Confirm Conversion</button>
                </div>
            </form>
        </Modal>
    );
};

export default ConvertModal;
