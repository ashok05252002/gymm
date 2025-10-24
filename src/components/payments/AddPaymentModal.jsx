import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const AddPaymentModal = ({ isOpen, onClose, onSave, members, plans }) => {
    const initialFormState = {
        memberId: '',
        planId: '',
        baseAmount: 0,
        discount: 0,
        finalAmount: 0,
        paymentMethod: 'Cash',
        transactionId: '',
        notes: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            const initialMemberId = members.length > 0 ? members[0].id : '';
            setFormData({ ...initialFormState, memberId: initialMemberId });
        }
    }, [isOpen, members]);

    useEffect(() => {
        const selectedPlan = plans.find(p => p.id === formData.planId);
        const baseAmount = selectedPlan ? selectedPlan.price : 0;
        const finalAmount = baseAmount - formData.discount;
        setFormData(prev => ({
            ...prev,
            baseAmount,
            finalAmount: finalAmount > 0 ? finalAmount : 0,
        }));
    }, [formData.planId, formData.discount, plans]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.memberId || !formData.planId) {
            toast.error('Please select a member and a plan.');
            return;
        }
        const member = members.find(m => m.id === formData.memberId);
        const plan = plans.find(p => p.id === formData.planId);

        onSave({
            memberId: formData.memberId,
            memberName: member.name,
            planName: plan.name,
            amount: formData.finalAmount,
            method: formData.paymentMethod,
            transactionId: formData.transactionId,
            notes: formData.notes,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Payment">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Member</label>
                    <select name="memberId" value={formData.memberId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        <option value="" disabled>Select a member</option>
                        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Plan</label>
                    <select name="planId" value={formData.planId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        <option value="" disabled>Select a plan</option>
                        {plans.filter(p => p.status === 'Active').map(p => <option key={p.id} value={p.id}>{p.name} - {p.price.toFixed(3)} OMR</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Base Amount</label>
                        <input type="text" value={`${formData.baseAmount.toFixed(3)} OMR`} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount (OMR)</label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleChange} min="0" step="0.001" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Final Amount</label>
                        <input type="text" value={`${formData.finalAmount.toFixed(3)} OMR`} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" readOnly />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                        <option>Online</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
                    <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Record Payment</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPaymentModal;
